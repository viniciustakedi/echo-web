import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 px-4 mx-auto text-center">
        <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-6">
          Discover Your Next Adventure
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-xl text-white/90">
          Explore thousands of destinations, read authentic reviews, and book unforgettable experiences worldwide.
        </p>

        {/* Search Form */}
        <div className="max-w-3xl p-4 mx-auto bg-white rounded-lg shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Where to?"
                className="h-12 text-lg"
              />
            </div>
            <div className="flex-1">
              <Input
                type="text"
                placeholder="When? (dates)"
                className="h-12 text-lg"
              />
            </div>
            <Button size="lg" className="h-12 gap-2 text-lg bg-travel-orange hover:bg-travel-orange/90">
              <Search className="w-5 h-5" />
              Search
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Button variant="link" className="text-white hover:text-travel-light-blue">
            Hotels
          </Button>
          <Button variant="link" className="text-white hover:text-travel-light-blue">
            Flights
          </Button>
          <Button variant="link" className="text-white hover:text-travel-light-blue">
            Things to Do
          </Button>
          <Button variant="link" className="text-white hover:text-travel-light-blue">
            Vacation Rentals
          </Button>
          <Button variant="link" className="text-white hover:text-travel-light-blue">
            Restaurants
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;