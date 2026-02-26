import ProductCarousel from '../Components/crousalCard/ProductCarousel';
import SeCarousel from '../Components/secCarousel/SeCarousel';
import SecCard from '../Components/SecondCards/SecCard';
import FourthCard from '../Components/FouCard/FourthCard';

function MainRouter() {
  return (
    <>
      {/* ================= HERO / CAROUSEL ================= */}
      <section className="w-full">
        <SeCarousel />
      </section>

      {/* ================= PRODUCT CAROUSEL ================= */}
      <section className="mt-7">
        <ProductCarousel img="/caur.png" />
      </section>

      {/* ================= CATEGORY SECTION ================= */}
      <section>
        <SecCard />
      </section>

      {/* ================= CARDS / BANNERS ================= */}
      <section className="space-y-8 pb-10">
        <FourthCard />
        {/* 
      <FifCard img={chalImg} />
      <SixCars />
      */}
      </section>
    </>
  );
}

export default MainRouter;
