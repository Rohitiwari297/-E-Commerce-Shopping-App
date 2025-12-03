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
    <>
      <SeCarousel />
      <ProductCarousel img="/caur.png" />

      {/* category */}
      {/* <Link to="/category"> */}
        <SecCard />
      {/* </Link> */}

      <FourthCard />
      <FifCard img={chalImg} />
      <FourthCard />
      <SixCars />
      <FifCard img={chalImg} />
    </>
  );
}

export default MainRouter;
