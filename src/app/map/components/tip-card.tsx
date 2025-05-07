import React from "react";
import Image from "next/image";

import { Text } from "@/components/ui/text";

import { X } from "lucide-react";
import { StarRating } from "./star-rating";
import { PriceRating } from "./price-rating";
import Link from "next/link";

interface CardTipProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CardTip({
  title,
  description,
  isOpen,
  onClose,
}: CardTipProps) {
  return (
    <>
      {isOpen && (
        <div className="w-96 bg-white rounded-lg shadow-md flex flex-col p-4 justify-between absolute top-1/2 left-10 -translate-y-1/2 z-20">
          <X
            className="text-[#323232] bg-white rounded-sm absolute left-11/12 top-3 cursor-pointer w-4 h-4"
            onClick={onClose}
          />
          <div className="flex flex-row items-start">
            <Image
              src="https://www.lospaghetto.com.br/img/banner1.png"
              alt="Apple Store"
              width={1200}
              height={1200}
              className="w-28 h-28 object-cover rounded-md"
            />
            <div className="flex flex-col justify-between ml-2">
              <Text className="text-lg font-black">Lo Spaghetto</Text>
              <div className="flex flex-row items-center">
                <Text className="text-sm text-[#323232]">São Paulo, SP</Text>
              </div>
              <div className="flex  items-center mt-1">
                <Text className="text-sm text-gray-600 mr-1">4.5</Text>
                <StarRating rating={4.5} />
                <Text className="text-gray-300 pl-[4px] pr-[3px]">•</Text>
                <PriceRating rating={3} />
              </div>
              <div className="flex flex-wrap items-center mt-2 gap-1">
                <div className="flex bg-[#323232] rounded-full w-auto items-center justify-center px-2 py-1">
                  <Text className="text-sm text-white">Italian Restaurant</Text>
                </div>
                <div className="flex bg-[#323232] rounded-full w-auto items-center justify-center px-2 py-1">
                  <Text className="text-sm text-white">Food</Text>
                </div>
              </div>
            </div>
          </div>
          <Link
            href={`/review/teste`}
            className="bg-[#323232] text-white py-2 text-center px-4 rounded-full mt-4 cursor-pointer hover:bg-black transition duration-300"
          >
            See more
          </Link>
        </div>
      )}
    </>
  );
}
