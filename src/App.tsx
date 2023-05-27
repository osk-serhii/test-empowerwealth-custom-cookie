import { useEffect } from "react";

import CookieManager from "./utils/CookieManager";
import CookieGetter from "./components/CookieGetter";
import CookieSetter from "./components/CookieSetter";
import "./App.css";

const App = () => {
  useEffect(() => {
    const initCookieManager = async () => {
      // initialize cookie manager
      const cookieManager = new CookieManager();
      await cookieManager.init();
    };

    initCookieManager();
  });
  return (
    <div>
      <CookieSetter />

      <hr />

      <CookieGetter />
    </div>
  );
};

export default App;
