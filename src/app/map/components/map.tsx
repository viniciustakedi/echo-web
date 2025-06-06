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
import { getMapMarkerById } from "@/requests/get/map-markers";
import { GetMaps } from "@/requests/get/map-markers/types";
import { useMapMarkers } from "@/hooks/use-map-markers";

const ZOOM_DEFAULT = 17;

export default function MapViewer() {
  // https://cloud.maptiler.com/maps/

  const { mapMarkers } = useMapMarkers();

  const [currentMarkerData, setCurrentMarkerData] =
    React.useState<GetMaps.MapMarkerDetailed | null>(null);

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
    // TO-DO: Implement pagination by map location
    // const fetchReview = async () => {
    //   const response = await getMapMarkers({});
    //   setMapMarkers(response);
    // };

    // fetchReview();

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

  const handleClickOnMarker = async (id: string) => {
    const markerDetails = await getMapMarkerById(id);
    setCurrentMarkerData(markerDetails);
    setIsTipCardOpen(true);
  };

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
        {mapMarkers &&
          mapMarkers.length > 0 &&
          mapMarkers.map((marker) => (
            <Marker
              key={marker._id}
              longitude={Number(marker.longitude)}
              latitude={Number(marker.latitude)}
              className="cursor-pointer"
              onClick={() => handleClickOnMarker(marker._id)}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center">
                    <div className="bg-white w-20 h-20 p-1 rounded-md">
                      <Image
                        src={marker.review.thumbnail}
                        alt={marker.review.headline}
                        width={1200}
                        height={1200}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-white border-r-[10px] border-r-transparent" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <Text className="text-white">{marker.review.headline}</Text>
                </TooltipContent>
              </Tooltip>
            </Marker>
          ))}
      </Map>
      {currentMarkerData && (
        <CardTip
          isOpen={isTipCardOpen}
          onClose={() => setIsTipCardOpen(false)}
          data={currentMarkerData}
        />
      )}
    </>
  );
}
