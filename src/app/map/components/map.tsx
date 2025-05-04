"use client";
import React from "react";
import Map, { Marker } from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";

import Image from "next/image";

import { Text } from "@/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CardTip from "./tip-card";

const ZOOM_DEFAULT = 17;

export default function MapViewer() {
  // https://cloud.maptiler.com/maps/

  const [isTipCardOpen, setIsTipCardOpen] = React.useState(true);

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
      navigator.geolocation.getCurrentPosition((position) => {
        setViewState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          zoom: ZOOM_DEFAULT,
        });

        setUserLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      });
    }
  }, []);

  return (
    <>
      <Map
        {...viewState}
        onMove={onMove}
        maxZoom={ZOOM_DEFAULT}
        style={{ width: "100%", height: "100%" }}
        mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
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
          longitude={-46.565164}
          latitude={-23.546421}
          className="cursor-pointer"
          onClick={() => setIsTipCardOpen(true)}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center">
                <div className="bg-white w-20 h-20 p-1 rounded-md">
                  <Image
                    src="https://www.lospaghetto.com.br/img/banner1.png"
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
              <Text>Lo Spaghetto</Text>
            </TooltipContent>
          </Tooltip>
        </Marker>
      </Map>
      <CardTip isOpen={isTipCardOpen} onClose={() => setIsTipCardOpen(false)} />
    </>
  );
}
