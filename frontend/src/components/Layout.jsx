import {Outlet} from "react-router-dom";
import Navbar from "./Navbar.jsx";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Add padding-top to account for fixed navbar */}
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
