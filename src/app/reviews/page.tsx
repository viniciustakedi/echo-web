import React from "react";

import Menu from "@/components/menu";
import ReviewsContent from "./components/ReviewsContent";

export default function Home() {
  return (
    <div className="base__div">
      <div className="base__div__page">
        <Menu />
        <main className="w-full h-full relative">
          <div className="max-w-3xl mx-auto px-6 pb-6 pt-32">
            <ReviewsContent />
          </div>
        </main>
      </div>
    </div>
  );
}
