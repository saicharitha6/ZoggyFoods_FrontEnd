// store.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export default rootPersistReducer = persistReducer(
  rootPersistConfig,
  rootReducer
);
