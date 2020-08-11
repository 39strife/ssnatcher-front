import React, { useState, useEffect } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";

export default function CookieAlert() {
  const [cookiePolicy, setCookiePolicy] = useState(false);
  useEffect(() => {
    const $cookiePolicy = parseCookies().cookiePolicy;
    if (typeof $cookiePolicy !== "undefined" && $cookiePolicy === "true") {
      setCookiePolicy(true);
      // if (process.env.NODE_ENV === "development") {
      //   setTimeout(() => {
      //     destroyCookie(null, "cookiePolicy");
      //   }, 1000);
      // }
    }
  }, []);
  return !cookiePolicy ? (
    <div className="cookie-policy">
      <div className="wrapper">
        <div className="row align-center">
          <div className="col-md-10">
            <p>
              This website uses cookies in order to offer you the most relevant
              information. Please accept them for optimal performance.
            </p>
          </div>
          <div className="col-md-2">
            <button
              onClick={() => (
                setCookie(null, "cookiePolicy", true, {
                  path: "/",
                }),
                setCookiePolicy(true)
              )}
              className="btn"
            >
              I accept
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
