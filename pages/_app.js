import { AuthProvider } from "../context/auth-context";
import { CurrencyProvider } from "../context/currency-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CurrencyProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </CurrencyProvider>
  );
}

export default MyApp;
