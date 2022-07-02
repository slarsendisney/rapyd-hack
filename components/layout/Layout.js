import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className=" max-w-6xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
