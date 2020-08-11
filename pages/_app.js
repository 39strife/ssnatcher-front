import "../styles/index.scss";
import { ModalProvider } from "../lib/globals/ModalContext";
import CookieAlert from "../components/CookiePolicy";

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
