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
          backgroundImage: "url('https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
          Check my point of view on restaurants, hotels, local spots, and attractions.
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
                placeholder="What kind of experience?"
                className="h-12 text-lg"
              />
            </div>
            <Button size="lg" className="h-12 gap-2 text-lg bg-green-600 hover:bg-green-700 cursor-pointer">
              <Search className="w-5 h-5" />
              Search
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Button variant="link" className="text-white hover:text-green-500 cursor-pointer">
            Hotels
          </Button>
          <Button variant="link" className="text-white hover:text-green-500 cursor-pointer">
            Flights
          </Button>
          <Button variant="link" className="text-white hover:text-green-500 cursor-pointer">
            Things to Do
          </Button>
          <Button variant="link" className="text-white hover:text-green-500 cursor-pointer">
            Vacation Rentals
          </Button>
          <Button variant="link" className="text-white hover:text-green-500 cursor-pointer">
            Restaurants
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;