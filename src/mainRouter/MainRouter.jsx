import ProductCarousel from "../Components/crousalCard/ProductCarousel";
import SeCarousel from "../Components/secCarousel/SeCarousel";
import SecCard from "../Components/SecondCards/SecCard";
import FourthCard from "../Components/FouCard/FourthCard";


function MainRouter() {
  return (
    <div className="bg-[#fff6d9] w-full min-h-screen overflow-x-hidden">
      {/* ================= HERO / CAROUSEL ================= */}
      <section className="w-full">
        <SeCarousel />
      </section>

      {/* ================= PRODUCT CAROUSEL ================= */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 mt-6">
        <ProductCarousel img="/caur.png" />
      </section>

      {/* ================= CATEGORY SECTION ================= */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 ">
        <SecCard />
      </section>

      {/* ================= CARDS / BANNERS ================= */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 mt-6 space-y-8 pb-10">
        <FourthCard />
        {/* 
      <FifCard img={chalImg} />
      <SixCars />
      */}
      </section>
    </div>
  );
}

export default MainRouter;
