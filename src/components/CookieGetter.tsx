import React, { useState } from "react";
import CookieManager from "../utils/CookieManager";

const CookieGetter = () => {
  const [cookieManager] = useState(() => new CookieManager());
  const [cookieKey, setCookieKey] = useState<string>("");
  const [cookieValue, setCookieValue] = useState<string | null>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCookieKey(e.target.value);
  };

  const handleGetCookie = () => {
    setCookieValue(cookieManager.getItem(cookieKey));
  };

  return (
    <div>
      <input
        type="text"
        className="mr"
        value={cookieKey}
        onChange={handleChange}
        placeholder="Cookie key here..."
      />

      <button onClick={handleGetCookie}>GET</button>

      <p>
        Key: <strong>{cookieKey}</strong> <br />
        Value: <strong>{cookieValue}</strong>
      </p>
    </div>
  );
};

export default CookieGetter;
