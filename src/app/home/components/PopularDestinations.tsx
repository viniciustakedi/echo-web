import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MapPin } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 12453,
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1554481923-a6918bd997bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 9876,
  },
  {
    id: 3,
    name: "New York",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviews: 15678,
  },
  {
    id: 4,
    name: "Tokyo",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 8765,
  },
  {
    id: 5,
    name: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
    reviews: 7654,
  },
  {
    id: 6,
    name: "Cape Town",
    country: "South Africa",
    image:
      "https://unsplash.com/photos/an-aerial-view-of-the-city-of-cape-town-and-lions-head-mountain-in-south-africa-byUDvQhsh4U",
    rating: 4.7,
    reviews: 6543,
  },
];

const PopularDestinations = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">I will definitely be back!</h2>
            <p className="mt-2 text-gray-600">
              Explore top-rated cities and regions loved worldwide.
            </p>
          </div>
          <Button className="hidden md:inline-flex bg-travel-blue hover:bg-travel-blue/90">
            View All
          </Button>
        </div>

        <Carousel className="w-full">
          <CarouselContent>
            {destinations.map((destination) => (
              <CarouselItem
                key={destination.id}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg py-0 pb-6">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-0 right-0 p-2 m-2 text-xs font-bold text-white bg-green-600 rounded-full">
                      {destination.rating} ★
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-1 text-sm text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{destination.country}</span>
                    </div>
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {destination.reviews.toLocaleString()} reviews
                    </p>
                    <Button
                      variant="link"
                      className="px-0 mt-2 text-[#323232] cursor-pointer"
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="flex justify-center mt-8">
          <Button className="md:hidden bg-travel-blue hover:bg-travel-blue/90">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
