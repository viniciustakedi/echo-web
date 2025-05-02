"use client";
import Menu from "@/components/menu";
import Map, { Marker } from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { Text } from "@/components/ui/text";

export default function Home() {
  // https://cloud.maptiler.com/maps/

  return (
    <div className="base__div">
      <div className="base__div__page">
        <Menu />
        <main className="w-full h-full relative">
          <Map
            initialViewState={{
              longitude: -46.6333,
              latitude: -23.5505,
              zoom: 12,
            }}
            maxZoom={17}
            style={{ width: "100%", height: "100%" }}
            mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key="
          >
            <Marker
              longitude={-46.5123595}
              latitude={-23.5702548}
              className="cursor-pointer"
              onClick={() => {
                alert("Testing marker click!");
              }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-white w-20 h-20 p-1 rounded-md">
                  <Image
                    src="https://takedi-portfolio.s3.sa-east-1.amazonaws.com/jobs/ideamaker.webp"
                    alt="Apple Store"
                    width={1200}
                    height={1200}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-white border-r-[10px] border-r-transparent" />
              </div>
            </Marker>
          </Map>
        </main>
      </div>
    </div>
  );
}
