import ProductCarousel from "../Components/crousalCard/ProductCarousel";
import SeCarousel from "../Components/secCarousel/SeCarousel";
import SecCard from "../Components/SecondCards/SecCard";
import FourthCard from "../Components/FouCard/FourthCard";
import FifCard from "../Components/fifCard/FifCard";
import SixCars from "../Components/SixCard/SixCard";

import chalImg from "../assets/chal.png";
import { Link } from "react-router-dom";

function MainRouter() {
  return (
    <div className="bg-[#fff6d9] w-full min-h-screen overflow-x-hidden">

      {/* Carousel Section */}
      <div className="w-full">
        <SeCarousel />
      </div>

      {/* Product Carousel */}
      <div className="w-full px-2 sm:px-4">
        <ProductCarousel img="/caur.png" />
      </div>

      {/* Category Cards */}
      <div className="w-full px-2 sm:px-4">
        <SecCard />
      </div>

      {/* Cards Section */}
      <div className="w-full px-2 sm:px-4 space-y-6">
        <FourthCard />
        <FifCard img={chalImg} />
        <FourthCard />
        <SixCars />
        <FifCard img={chalImg} />
      </div>

    </div>
  );
}


export default MainRouter;
