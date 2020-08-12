import "../styles/index.scss";
import { ModalProvider } from "../lib/globals/ModalContext";
import CookieAlert from "../components/CookiePolicy";
import { useRouter, Router } from "next/router";
import { useEffect } from "react";

import NProgress from "nprogress";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
  document.body.classList.add("loading");
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
  document.body.classList.remove("loading");
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
  document.body.classList.remove("loading");
});

const Providers = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <CookieAlert />
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;
