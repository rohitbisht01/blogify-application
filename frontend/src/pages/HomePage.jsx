import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto mt-10 px-5 sm:px-10  md:px-0">
        <Header />
      </div>

      <main className="flex-grow container mx-auto px-5 sm:px-10 md:px-0">
        <Outlet />
      </main>

      <div className="container mx-auto mb-10 px-5 sm:px-10 md:px-0">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
