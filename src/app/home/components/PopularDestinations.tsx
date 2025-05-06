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
      "https://images.unsplash.com/photo-1547497044-a6b92ba88461?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 7654,
  },
  {
    id: 6,
    name: "Cape Town",
    country: "South Africa",
    image:
      "https://images.unsplash.com/photo-1562583489-bf23ac555bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
            <h2 className="text-3xl font-bold">Popular Destinations</h2>
            <p className="mt-2 text-gray-600">
              Explore top-rated cities and regions loved by travelers worldwide
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
                <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-0 right-0 p-2 m-2 text-xs font-bold text-white bg-travel-orange rounded-full">
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
                      className="px-0 mt-2 text-travel-blue"
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
