import React from "react";

import Menu from "@/components/menu";
import ReviewsContent from "./components/ReviewsContent";

export default function Home() {
  return (
    <div className="base__div">
      <div className="base__div__page">
        <Menu />
        <main className="w-full h-full relative">
          <ReviewsContent />
        </main>
      </div>
    </div>
  );
}
