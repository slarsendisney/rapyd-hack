import { LazyMotion, domAnimation, m } from "framer-motion";
import { AuthProvider } from "../context/auth-context";
import { CurrencyProvider } from "../context/currency-context";
import { StoreProvider } from "../context/store-context";
import { ToastProvider } from "../context/toast-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <StoreProvider>
        <CurrencyProvider>
          <AuthProvider>
            <LazyMotion features={domAnimation}>
              <Component {...pageProps} />
            </LazyMotion>
          </AuthProvider>
        </CurrencyProvider>
      </StoreProvider>
    </ToastProvider>
  );
}

export default MyApp;
