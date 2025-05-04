import Menu from "@/components/menu";

import React from "react";
import MapViewer from "./components/map";

export default function Home() {
  return (
    <div className="base__div">
      <div className="base__div__page">
        <Menu />
        <main className="w-full h-full relative">
          <MapViewer/>
        </main>
      </div>
    </div>
  );
}
