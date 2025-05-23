"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";

import { PostMapMarker } from "@/requests/post/map-markers/types";
import { GetMaps } from "@/requests/get/map-markers/types";
import { GetReviews } from "@/requests/get/reviews/types";

import { useReviews } from "@/hooks/use-reviews";
import Link from "next/link";

interface MapMarkerEditorProps {
  initialData?: Partial<GetMaps.MapMarkerDetailed>;
  onSave: (data: PostMapMarker.Create) => void;
  isLoading?: boolean;
}

export function MapMarkerEditor({
  initialData,
  onSave,
  isLoading = false,
}: MapMarkerEditorProps) {
  const { reviews } = useReviews();

  const [reviewId, setReviewId] = useState(initialData?.review?._id || "");
  const [review, setReview] = useState<GetReviews.ReviewListItem | undefined>(
    undefined
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GetMaps.MapMarker>({
    defaultValues: {
      latitude: initialData?.latitude || -23.5505,
      longitude: initialData?.longitude || -46.6333,
      review: {
        _id: initialData?.review?._id || "",
        thumbnail: initialData?.review?.thumbnail || "",
        headline: initialData?.review?.headline || "",
      },
    },
  });

  const onSubmit = (data: GetMaps.MapMarker) => {
    if (!reviewId) {
      toast.error("Hey bro! You need to chose some review");
      return;
    }

    const dataToCreate: PostMapMarker.Create = {
      latitude: String(data.latitude),
      longitude: String(data.longitude),
      reviewId,
    };

    onSave(dataToCreate);
  };

  useEffect(() => {
    const key = reviewId || initialData?.review?._id;
    const reviewData = reviews.find((e) => e._id === key);

    if (reviewData) {
      setReview(reviewData);
    }
  }, [reviewId, initialData, reviews]);

  // const [mapMarkers, setMapMarkers] = useState<GetMaps.MapMarker[] | null>(
  //   null
  // );

  // const [currentMarkerData, setCurrentMarkerData] =
  //   useState<GetMaps.MapMarkerDetailed | null>(null);

  // const [isTipCardOpen, setIsTipCardOpen] = useState(true);

  // const handleClickOnMarker = async (id: string) => {
  //   const markerDetails = await getMapMarkerById(id);
  //   setCurrentMarkerData(markerDetails);
  //   setIsTipCardOpen(true);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="latitude" className="mb-2">
            Latitude
          </Label>
          <Input
            id="latitude"
            {...register("latitude", { required: "Latitude is required" })}
            className={errors.latitude ? "border-destructive" : ""}
          />
          {errors.latitude && (
            <p className="text-destructive text-sm mt-1">
              {errors.latitude.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="longitude" className="mb-2">
            Longitude
          </Label>
          <Input
            id="longitude"
            {...register("longitude", {
              required: "Longitude name is required",
            })}
            className={errors.longitude ? "border-destructive" : ""}
          />
          {errors.longitude && (
            <p className="text-destructive text-sm mt-1">
              {errors.longitude.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="review" className="mb-2">
          Review
        </Label>
        <div className="flex gap-2 items-center">
          <Select
            value={reviewId}
            onValueChange={(value) => setReviewId(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a review" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Reviews</SelectLabel>
                {reviews?.map((review: { headline: string; _id: string }) => (
                  <SelectItem key={review._id} value={review._id}>
                    {review.headline}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full h-96 rounded-md">
        {/* https://cloud.maptiler.com/maps/ */}

        <Map
          latitude={Number(watch("latitude"))}
          longitude={Number(watch("longitude"))}
          zoom={17}
          style={{ width: "100%", height: "100%", borderRadius: 12 }}
          mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
        >
          {review && (
            <Marker
              key={watch("review._id")}
              latitude={Number(watch("latitude"))}
              longitude={Number(watch("longitude"))}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center">
                    <div className="bg-white w-20 h-20 p-1 rounded-md">
                      <Image
                        src={review.thumbnail}
                        alt={review.headline}
                        width={1200}
                        height={1200}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-white border-r-[10px] border-r-transparent" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <Text className="text-white">{review.headline}</Text>
                </TooltipContent>
              </Tooltip>
            </Marker>
          )}
        </Map>
      </div>

      <Separator />

      <div className="flex justify-between">
        <div>
          <Link href="https://www.itilog.com" target="_blank">
            <Button type="button" variant="link">
              Find coords
            </Button>
          </Link>
        </div>
        <div>
          <Button variant="outline" className="mr-2">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Map Marker"}
          </Button>
        </div>
      </div>
    </form>
  );
}
