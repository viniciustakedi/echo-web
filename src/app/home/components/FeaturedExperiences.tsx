import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    id: 1,
    title: "Guided Tour of the Louvre Museum",
    location: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1560425946-7d5830202765?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 59,
    duration: "3 hours",
    rating: 4.8,
    reviews: 1245,
    category: "Arts & Culture",
  },
  {
    id: 2,
    title: "Sunset Sailing Cruise",
    location: "Santorini, Greece",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 89,
    duration: "4 hours",
    rating: 4.9,
    reviews: 876,
    category: "Ocean & Boating",
  },
  {
    id: 3,
    title: "Cooking Class & Market Tour",
    location: "Florence, Italy",
    image:
      "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 75,
    duration: "5 hours",
    rating: 4.7,
    reviews: 932,
    category: "Food & Drinks",
  },
  {
    id: 4,
    title: "Helicopter Tour of Grand Canyon",
    location: "Las Vegas, USA",
    image:
      "https://images.unsplash.com/photo-1495554698253-681539e9ea84?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 299,
    duration: "1.5 hours",
    rating: 4.9,
    reviews: 654,
    category: "Adventure",
  },
];

const FeaturedExperiences = () => {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-start justify-between gap-4 mb-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Unforgettable Experiences</h2>
            <p className="mt-2 text-gray-600">
              Book top-rated tours, activities and experiences for your next
              adventure
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white">
              All
            </Button>
            <Button variant="outline" className="bg-white">
              Tours
            </Button>
            <Button variant="outline" className="bg-white">
              Activities
            </Button>
            <Button
              variant="outline"
              className="hidden bg-white md:inline-flex"
            >
              Day Trips
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((experience) => (
            <Card
              key={experience.id}
              className="overflow-hidden transition-all duration-200 hover:shadow-lg py-0 pb-6"
            >
              <div className="relative h-48">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  className="object-cover w-full h-full"
                  width={1500}
                  height={1000}
                />
                <div className="absolute top-0 left-0 p-3">
                  <Badge variant="secondary">{experience.category}</Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-[#323232]">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 font-medium">
                      {experience.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({experience.reviews} reviews)
                  </span>
                </div>

                <h3 className="font-bold leading-tight">{experience.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {experience.location}
                </p>

                <div className="flex items-center gap-2 mt-3 text-sm">
                  <span>Duration: {experience.duration}</span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="font-bold">
                    From ${experience.price}
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      / person
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#323232] hover:bg-black cursor-pointer"
                  >
                    See more
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button className="bg-[#323232] hover:bg-black cursor-pointer">
            View All Experiences
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperiences;
