import { LazyMotion, domAnimation, m } from "framer-motion";
import { AuthProvider } from "../context/auth-context";
import { CurrencyProvider } from "../context/currency-context";
import { StoreProvider } from "../context/store-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <CurrencyProvider>
        <AuthProvider>
          <LazyMotion features={domAnimation}>
            <Component {...pageProps} />
          </LazyMotion>
        </AuthProvider>
      </CurrencyProvider>
    </StoreProvider>
  );
}

export default MyApp;
