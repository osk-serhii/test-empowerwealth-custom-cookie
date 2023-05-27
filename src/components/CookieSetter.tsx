import React, { useState } from "react";
import CookieManager from "../utils/CookieManager";

const CookieSetter = () => {
  const [cookieManager] = useState(() => new CookieManager());
  const [cookieKey, setCookieKey] = useState<string>("");
  const [cookieValue, setCookieValue] = useState<string>("");

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCookieKey(e.target.value);
  };
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCookieValue(e.target.value);
  };

  const handleSetCookie = () => {
    cookieManager.setItem(cookieKey, cookieValue);
    alert(
      "Added key/value data to cookie. Please use below form to get data again."
    );
    setCookieKey("");
    setCookieValue("");
  };

  return (
    <div className="container">
      <input
        type="text"
        className="mr"
        value={cookieKey}
        onChange={handleKeyChange}
        placeholder="Cookie key here..."
        autoFocus
      />
      <input
        type="text"
        className="mr"
        value={cookieValue}
        onChange={handleValueChange}
        placeholder="Cookie value here..."
      />

      <button onClick={handleSetCookie}>SET</button>
    </div>
  );
};

export default CookieSetter;
