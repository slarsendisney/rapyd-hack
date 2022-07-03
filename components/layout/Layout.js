import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, noLinks }) => {
  return (
    <div className="layout">
      <Header noLinks={noLinks}/>
      <main className=" max-w-6xl mx-auto px-2">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
