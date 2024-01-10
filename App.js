import { Actions, Router, Scene, Stack } from "react-native-router-flux";
import Products from "./screens/Products";
import ProductInfo from "./screens/ProductInfo";
import Cart from "./screens/Cart";
import Checkout from "./screens/Checkout";
import { CartProvider } from "./components/CartContext";
import { Provider as PaperProvider } from "react-native-paper";
import { useEffect, useState } from "react"; // Import useState
import axios from "axios";
import baseURL from "./constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignIn from "./screens/SignIn";
import PlaceOrder from "./screens/PlaceOrder";
import Orders from "./components/Orders/Orders";
import Search from "./components/Search/Search";
import Address from "./screens/Address";
import Addr from "./components/Address/Addr";
import Payments from "./screens/Payments";
import Wallet from "./components/Wallet/Wallet";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import WelcomeScreen from "./screens/Welcome";
import SubscriptionCalendarScreen from "./screens/Calendar";
import SignUp from "./screens/SignUp";
import SelectLocation from "./screens/Region";
import DeliveryPreferences from "./screens/DeliveryPreferences";
import MyAddresses from "./components/Address/MyAddresses";
import EditAddress from "./components/Address/EditAddress";
import DetailsForm from "./screens/DetailsForm";

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null); // Track if it's the first launch

  const getCartId = async () => {
    await axios.post(`${baseURL}/store/carts`).then((res) => {
      AsyncStorage.setItem("cart_id", res.data.cart.id);
    });
  };

  const checkCartId = async () => {
    const cartId = await AsyncStorage.getItem("cart_id");

    if (cartId) {
      await axios
        .post(`${baseURL}/store/carts/${cartId}`)
        .then((res) => {
          if (res.data.cart.completed_at) {
            AsyncStorage.removeItem("cart_id");
            getCartId();
          } else {
            AsyncStorage.setItem("cart_id", res.data.cart.id);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          if (error.response.status == 500) {
            AsyncStorage.removeItem("cart_id");
            getCartId();
          }
        });
    }

    if (!cartId) {
      getCartId();
    }
  };

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem("firstLaunch");
        if (value === null) {
          setIsFirstLaunch(true);
          AsyncStorage.setItem("firstLaunch", "false");
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error("Error checking first launch:", error);
      }
    };

    checkFirstLaunch();
    checkCartId();
  }, []);

  useEffect(() => {
    // Use Actions to navigate directly to OTPVerification if isFirstLaunch
    if (!isFirstLaunch) {
      Actions.SignIn(); // Assuming the key for OTPVerification screen is "OTPVerification"
    }
  }, [isFirstLaunch]);

  return (
    <PaperProvider>
      <CartProvider>
        <Router>
          <Stack key="root">
            <Scene key="Welcome" component={WelcomeScreen} hideNavBar />
            <Scene key="SignIn" component={SignIn} hideNavBar />
            <Scene key="Details" component={DetailsForm} hideNavBar />
            {/* <Scene key="SignUp" component={SignUp} hideNavBar /> */}
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
            <Scene key="Addr" component={Addr} hideNavBar />
            <Scene key="EditAddress" component={EditAddress} hideNavBar />
            {/* <Scene key="checkout" component={Checkout} hideNavBar /> */}
          </Stack>
        </Router>
      </CartProvider>
    </PaperProvider>
  );
}
