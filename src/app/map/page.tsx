"use client";
import Menu from "@/components/menu";
import Map, { Marker } from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

const ZOOM_DEFAULT = 17;

export default function Home() {
  // https://cloud.maptiler.com/maps/

  const [viewState, setViewState] = React.useState({
    longitude: -46.6333,
    latitude: -23.5505,
    zoom: ZOOM_DEFAULT,
  });

  const [userLocation, setUserLocation] = React.useState({
    longitude: -46.6333,
    latitude: -23.5505,
  });

  const onMove = React.useCallback(
    (evt: {
      viewState: React.SetStateAction<{
        longitude: number;
        latitude: number;
        zoom: number;
      }>;
    }) => {
      setViewState(evt.viewState);
    },
    []
  );

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setViewState({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            zoom: ZOOM_DEFAULT,
          });

          setUserLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  return (
    <div className="base__div">
      <div className="base__div__page">
        <Menu />
        <main className="w-full h-full relative">
          <Map
            {...viewState}
            onMove={onMove}
            maxZoom={ZOOM_DEFAULT}
            style={{ width: "100%", height: "100%" }}
            mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=4ttUoblZYMikFGCT9M0y"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Marker
                  longitude={userLocation.longitude}
                  latitude={userLocation.latitude}
                >
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md" />
                </Marker>
              </TooltipTrigger>
              <TooltipContent>
                <Text>You</Text>
              </TooltipContent>
            </Tooltip>
            <Marker
              longitude={-46.51417213842298}
              latitude={-23.668085675992876}
              className="cursor-pointer"
              onClick={() => {
                alert("Testing marker click!");
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent>
                  <Text>Home Sweet Home</Text>
                </TooltipContent>
              </Tooltip>
            </Marker>
          </Map>
        </main>
      </div>
    </div>
  );
}
