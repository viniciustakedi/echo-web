import React from "react";

import Menu from "@/components/menu";
import Footer from "@/components/footer";

import FeaturedExperiences from "./home/components/FeaturedExperiences";
import PopularDestinations from "./home/components/PopularDestinations";
import Testimonials from "./home/components/Testimonials";
import HeroSection from "./home/components/HeroSection";
import Newsletter from "./home/components/Newsletter";

const HomePage = () => {
  return (
    <>
      <Menu />
      <main>
        <HeroSection />
        <PopularDestinations />
        <FeaturedExperiences />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
