import { LazyMotion, domAnimation, m } from "framer-motion";
import { AuthProvider } from "../context/auth-context";
import { CurrencyProvider } from "../context/currency-context";
import { StoreProvider } from "../context/store-context";
import { ToastProvider } from "../context/toast-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <LazyMotion features={domAnimation}>
      <ToastProvider>
        <StoreProvider>
          <CurrencyProvider>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </CurrencyProvider>
        </StoreProvider>
      </ToastProvider>
    </LazyMotion>
  );
}

export default MyApp;
