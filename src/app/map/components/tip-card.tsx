import React from "react";
import Image from "next/image";

import { Text } from "@/components/ui/text";

import { X } from "lucide-react";
import { StarRating } from "./star-rating";
import { PriceRating } from "./price-rating";
import Link from "next/link";
import { GetMaps } from "@/requests/get/map-markers/types";
import { Badge } from "@/components/ui/badge";

interface CardTipProps {
  isOpen: boolean;
  data: GetMaps.MapMarkerDetailed;
  onClose: () => void;
}

export default function CardTip({ data, isOpen, onClose }: CardTipProps) {
  return (
    <>
      {isOpen && (
        <div className="w-full flex items-center justify-center">
          <div className="md:w-96 w-10/12 md:mxq-0 bg-white rounded-lg shadow-md flex flex-col p-4 justify-between absolute md:top-1/2 md:left-10 top-1/2 md:-translate-y-1/2 z-20">
            <X
              className="text-[#323232] bg-white rounded-sm absolute left-11/12 top-3 cursor-pointer w-4 h-4"
              onClick={onClose}
            />
            <div className="flex flex-row items-start">
              <Image
                src={data.review.thumbnail}
                alt={data.review.headline}
                width={1200}
                height={1200}
                className="w-28 h-28 object-cover rounded-md"
              />
              <div className="flex flex-col justify-between ml-2">
                <Text className="text-lg font-black">
                  {data.review.headline}
                </Text>
                <div className="flex flex-row items-center">
                  <Text className="text-sm text-[#323232]">
                    {data.review.city}, {data.review.country}
                  </Text>
                </div>
                <div className="flex  items-center mt-1">
                  <Text className="text-sm text-gray-600 mr-1">
                    {Number.isInteger(data.review.rating)
                      ? `${data.review.rating}.0`
                      : data.review.rating}
                  </Text>
                  <StarRating rating={data.review.rating} />
                  <Text className="text-gray-300 pl-[4px] pr-[3px]">•</Text>
                  <PriceRating rating={data.review.priceRating} />
                </div>
                <div className="flex w-full flex-wrap items-center mt-3 gap-1">
                  {data.review.tags.map((tag) => (
                    <Badge key={tag.name} variant="default">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href={`/reviews/${data.review.friendlyUrl}`}
              className="bg-black text-white py-2 text-center px-4 rounded-full mt-4 cursor-pointer hover:bg-[#323232] transition duration-300"
            >
              See more
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
