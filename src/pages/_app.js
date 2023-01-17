import "../styles/globals.css";
import { wrapper } from "./../store";
import { useStore, Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CookiesProvider } from "react-cookie";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

function MyApp({ Component, pageProps }) {
  const store = useStore();
  return (
    <>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
