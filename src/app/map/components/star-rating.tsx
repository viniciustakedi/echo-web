import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Text } from "@/components/ui/text";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number; // e.g. 3.5
  maxStars?: number;
}

export function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center">
          {[...Array(maxStars)].map((_, i) => {
            const fillPercent = Math.min(Math.max((rating - i) * 100, 0), 100);
            return (
              <div key={i} className="relative w-4 h-4">
                <Star
                  className="absolute inset-0 w-full h-full text-gray-300"
                  fill="currentColor"
                  stroke="currentColor"
                />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillPercent}%` }}
                >
                  <Star
                    className="w-full h-full text-yellow-500"
                    fill="currentColor"
                    stroke="currentColor"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" dark>
        <Text className="text-white">Awesome rate</Text>
      </TooltipContent>
    </Tooltip>
  );
}
