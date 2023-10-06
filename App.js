import { Provider } from "react-redux";
import MainNavigator from "./src/navigations/MainNavigator.js";
import Store from "./src/redux/store.js";

export default function App() {
  return (
    <Provider store={Store}>
      <MainNavigator />
    </Provider>
  );
}
