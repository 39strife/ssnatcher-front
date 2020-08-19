import "react-mde/lib/styles/scss/react-mde-all.scss";
import "react-toastify/scss/main.scss";
import "../styles/index.scss";
import { ModalProvider } from "../lib/globals/ModalContext";
import CookieAlert from "../components/CookiePolicy";
import { Router } from "next/router";
import NProgress from "nprogress";
import {
  AuthProvider,
  loginRest,
  AuthModals,
} from "../lib/globals/AuthContext";
import { ToastContainer } from "react-toastify";
import AlertProvider from "../lib/Alerts/AlertProvider";

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
    <ModalProvider>
      <AuthProvider INITIAL_STATE={auth}>
        <AlertProvider />
        <AuthModals />
        <ToastContainer newestOnTop />
        {children}
      </AuthProvider>
    </ModalProvider>
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
  const auth = process.browser ? {} : await loginRest(ctx);

  return { pageProps, auth };
};
export default MyApp;
