import "react-toastify/scss/main.scss";
import "../styles/index.scss";
import { ModalProvider } from "../lib/globals/ModalContext";
import CookieAlert from "../components/CookiePolicy";
import { useRouter, Router } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import { AuthProvider, loginRest } from "../lib/globals/AuthContext";
import { ToastContainer } from "react-toastify";

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

const Providers = ({ children, auth }) => {
  return (
    <AuthProvider INITIAL_STATE={auth}>
      <ModalProvider>
        <ToastContainer newestOnTop />
        {children}
      </ModalProvider>
    </AuthProvider>
  );
};

function MyApp({ Component, pageProps, auth }) {
  return (
    <Providers {...{ auth }}>
      <CookieAlert />
      <Component {...pageProps} />
    </Providers>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps =
    typeof Component.getInitialProps === "function"
      ? await Component.getInitialProps(ctx)
      : {};
  const auth = await loginRest(ctx);

  return { pageProps, auth };
};
export default MyApp;
