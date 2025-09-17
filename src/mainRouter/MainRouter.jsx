

import ProductCarousel from "../Components/crousalCard/ProductCarousel";
import SeCarousel from "../Components/secCarousel/SeCarousel"; 
import SecCard from '../Components/SecondCards/SecCard' 
import FourthCard from '../Components/FouCard/FourthCard'
import ThirCard from '../Components/thirdCard/ThirdCard'
import SecCrousal from '../Components/secCarousel/SeCarousel'
import FifCard from '../Components/fifCard/FifCard'
import SixCars from '../Components/SixCard/SixCard'

import chalImg from '../../public/chal.png'
import { Link } from "react-router-dom";




function MainRouter() {
  return (
    <>

      <Link to='/category'>
      
      <SeCarousel/>
      <ProductCarousel/>
      <SecCard/>
      <FourthCard img={chalImg}/>
      <ThirCard img={chalImg}/>
      <SecCrousal img={chalImg}/>
      <FifCard img={chalImg} />
      <SixCars/>
      <ProductCarousel/>
      <SecCard/>
      <FourthCard img={chalImg}/>
      <ThirCard img={chalImg}/>
      <SecCrousal img={chalImg}/>
      <FifCard img={chalImg} />
      <SixCars/>
      <ProductCarousel/>
      <SecCard/>
      <FourthCard img={chalImg}/>
      <ThirCard img={chalImg}/>
      <SecCrousal img={chalImg}/>
      <FifCard img={chalImg} />
      <SixCars/>

      </Link>
      
      
    </>
  );
}

export default MainRouter;
