import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sophie Anderson",
    location: "London, UK",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "My trip to Japan was absolutely incredible thanks to the recommendations I found here. The local guides were knowledgeable and friendly, and the experiences were authentic and unforgettable.",
    destination: "Tokyo, Japan",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Toronto, Canada",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 5,
    text: "The walking food tour in Barcelona was the highlight of our trip. We discovered hidden gems we would have never found on our own. Can&quot;t wait to book our next adventure!",
    destination: "Barcelona, Spain",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Sydney, Australia",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    text: "From booking to the actual experience, everything was seamless. The safari exceeded all our expectations - we saw the Big Five in just two days! Memories that will last a lifetime.",
    destination: "Serengeti, Tanzania",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Travelers Love Us</h2>
          <p className="mt-2 text-gray-600 md:text-lg">
            Read inspiring stories from travelers around the world
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="overflow-hidden transition-all duration-200 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3 text-green-600">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                <p className="mb-4 italic text-gray-700">
                  &ldquo{testimonial.text}&ldquo
                </p>

                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Trip to{" "}
                    <span className="font-medium text-gray-900">
                      {testimonial.destination}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
