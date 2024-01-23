import { Actions, Router, Scene, Stack } from "react-native-router-flux";
import Products from "./screens/Products";
import ProductInfo from "./screens/ProductInfo";
import Cart from "./screens/Cart";
import Checkout from "./screens/Checkout";
import { CartProvider } from "./components/CartContext";
import { Provider as PaperProvider } from "react-native-paper";
import { useEffect, useRef, useState, useLayoutEffect } from "react"; // Import useState
import axios from "axios";
import baseURL from "./constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignIn from "./screens/SignIn";
import PlaceOrder from "./screens/PlaceOrder";
import Orders from "./components/Orders/Orders";
import Search from "./components/Search/Search";
import Address from "./screens/Address";
import AddEditAddress from "./components/Address/AddEditAddress";
import Payments from "./screens/Payments";
import Wallet from "./components/Wallet/Wallet";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import WelcomeScreen from "./screens/Welcome";
import SubscriptionCalendarScreen from "./screens/Calendar";
import SelectLocation from "./screens/Region";
import DeliveryPreferences from "./screens/DeliveryPreferences";
import CompleteYourProfile from "./screens/CompleteYourProfile";
import OTPVerification from "./components/SignIn/OTPVerification";
import MyAddresses from "./components/Address/MyAddresses";
import EditAddress from "./components/Address/EditAddress";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { me } from "./redux/actions/authActions";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function StackedScreen() {
  const auth = useSelector((state) => state?.auth);
  const currentUser = auth?.currentUser ?? null;
  const [expoPushToken, setExpoPushToken] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();
  const isLoggedIn = auth?.isLoggedIn;
  const access_token = auth?.access_token;
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const dispatch = useDispatch();
  async function checkPushNotificationToken() {
    const pushToken = await AsyncStorage.getItem("pushToken");
    setExpoPushToken(pushToken);
  }
  async function registerForPushNotificationsAsync() {
    let response;
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert(
          "Permission required",
          "To get notification need appropriate permission!"
        );
        return;
      }
      response = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return response.data;
  }

  const createCart = async () => {
    try {
      await axios
        .post(
          `${baseURL}/store/carts`,
          { email: auth?.credentials?.email },
          { headers }
        )
        .then((res) => {
          AsyncStorage.setItem("cart_id", res.data.cart.id);
        });
    } catch (error) {
      console.log("error-create");
      console.log(error);
    }
  };

  const checkCartId = async () => {
    const cartId = await AsyncStorage.getItem("cart_id");
    if (cartId) {
      await axios
        .get(`${baseURL}/store/carts/${cartId}`, { headers })
        .then((res) => {
          if (res.data.cart.completed_at) {
            AsyncStorage.removeItem("cart_id");
            createCart();
          }
          // else {
          //   AsyncStorage.setItem("cart_id", res.data.cart.id);
          // }
        })
        .catch((error) => {
          const status = error.response.status;
          if (status == 500 || status == 404) {
            AsyncStorage.removeItem("cart_id");
            createCart();
          }
        });
    } else {
      createCart();
    }
  };

  function checkExpoTokenAndUpdateMe() {
    axios
      .get(`${baseURL}/store/auth`, { headers })
      .then(({ data }) => {
        if (data.customer) {
          const { customer } = data;
          const { metadata } = customer;
          if (!metadata?.pushNotificationToken && expoPushToken) {
            axios
              .post(
                `${baseURL}/store/customers/me`,
                {
                  metadata: {
                    ...metadata,
                    pushNotificationToken: expoPushToken,
                  },
                },
                { headers }
              )
              .then((res) => dispatch(me(res.data.customer)))
              .catch((error) => {
                console.log(error);
              });
          } else {
            dispatch(me(customer));
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function checkLogin() {
    checkCartId();
    if (isLoggedIn && access_token) {
      if (!currentUser?.metadata?.pushNotificationToken) {
        console.log("updateMe");
        checkExpoTokenAndUpdateMe();
      }
      Actions.products();
    } else {
      Actions.SignIn();
    }
  }

  useEffect(() => {
    checkPushNotificationToken();
    if (!expoPushToken) {
      registerForPushNotificationsAsync().then((token) => {
        setExpoPushToken(token);
        AsyncStorage.setItem("pushToken", token);
      });

      notificationListener.current =
        Notifications.addNotificationReceivedListener(({ notification }) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const { data, title, body } = response.notification.request.content;
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
    checkLogin();
  }, [isLoggedIn, currentUser]);

  return (
    <PaperProvider>
      <CartProvider>
        <Router>
          <Stack key="root">
            <Scene key="Welcome" component={WelcomeScreen} hideNavBar />
            <Scene key="SignIn" component={SignIn} hideNavBar />
            <Scene
              key="OTPVerification"
              component={OTPVerification}
              hideNavBar
            />
            <Scene
              key="CompleteYourProfile"
              component={CompleteYourProfile}
              hideNavBar
            />
            <Scene key="Region" component={SelectLocation} hideNavBar />
            <Scene key="products" component={Products} hideNavBar />
            <Scene key="ProductInfo" component={ProductInfo} hideNavBar />
            <Scene key="cart" component={Cart} hideNavBar />
            <Scene key="address" component={Address} hideNavBar />
            <Scene key="payments" component={Payments} hideNavBar />
            <Scene key="PlaceOrder" component={PlaceOrder} hideNavBar />
            <Scene key="orders" component={Orders} hideNavBar />
            <Scene key="search" component={Search} hideNavBar />
            <Scene key="profile" component={Profile} hideNavBar />
            <Scene
              key="DeliveryPreference"
              component={DeliveryPreferences}
              hideNavBar
            />
            <Scene key="EditProfile" component={EditProfile} hideNavBar />
            <Scene key="Wallet" component={Wallet} hideNavBar />
            <Scene
              key="Calendar"
              component={SubscriptionCalendarScreen}
              hideNavBar
            />
            <Scene key="MyAddresses" component={MyAddresses} hideNavBar />
            <Scene key="AddEditAddress" component={AddEditAddress} hideNavBar />
            <Scene key="EditAddress" component={EditAddress} hideNavBar />
            {/* <Scene key="checkout" component={Checkout} hideNavBar /> */}
          </Stack>
        </Router>
      </CartProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackedScreen />
      </PersistGate>
    </Provider>
  );
}
