"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast("Success!", {
      description: "You've been subscribed to our newsletter.",
      // action: {
      //   label: "Undo",
      //   onClick: () => console.log("Undo"),
      // },
    });
  };

  return (
    <section
      className="py-16 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80')",
      }}
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold md:text-4xl">
            Get Inspired for Your Next Trip
          </h2>
          <p className="mt-4 mb-8">
            Subscribe to our newsletter for exclusive deals, travel tips, and
            inspiration directly to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 text-black bg-white sm:flex-1"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors duration-300 cursor-pointer"
            >
              Subscribe
            </Button>
          </form>

          <p className="mt-4 text-sm text-white/80">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
