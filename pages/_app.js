import "../styles/index.scss";
import { ModalProvider } from "../lib/globals/ModalContext";

const Providers = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;
