import { LazyMotion, domAnimation, m } from "framer-motion";
import { AuthProvider } from "../context/auth-context";
import { CurrencyProvider } from "../context/currency-context";
import { ModalProvider } from "../context/modal-context";
import { StoreProvider } from "../context/store-context";
import { ToastProvider } from "../context/toast-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <LazyMotion features={domAnimation}>
      <StoreProvider>
        <CurrencyProvider>
          <AuthProvider>
            <ModalProvider>
              <ToastProvider>
                <Component {...pageProps} />
              </ToastProvider>
            </ModalProvider>
          </AuthProvider>
        </CurrencyProvider>
      </StoreProvider>
    </LazyMotion>
  );
}

export default MyApp;
