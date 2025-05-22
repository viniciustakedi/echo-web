import Menu from "@/components/menu";

import React from "react";
import MapViewer from "./components/map";

export default function Home() {
  return (
    <div>
      <Menu />
      <main className="w-full h-screen relative">
        <MapViewer />
      </main>
    </div>
  );
}
