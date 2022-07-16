import wrapper from "../storeConfig";
import { useSelector, useStore, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import CssBaseline from "@mui/material/CssBaseline";

const App = ({ Component, pageProps }) => {
  const store = useStore((state) => state);

  return (
    <>
      <PersistGate persistor={store.__persistor}>
        <CssBaseline />
        <Component {...pageProps} />
      </PersistGate>
    </>
  );
};

export default wrapper.withRedux(App);
