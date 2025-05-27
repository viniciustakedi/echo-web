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

/**
 * Round a rating into 0.5-steps with custom thresholds.
 *
 * - decimals < 0.3  → round down to the integer
 * - decimals ≥ 0.3 and < 0.7 → use .5
 * - decimals ≥ 0.7 → round up to next integer
 *
 * @param {number} rating  e.g. 1.2, 1.3, 1.7, 4.8...
 * @returns {number}       e.g. 1,   1.5,  2,    5
 */
const roundRating = (rating: number): RatingKey => {
  const base = Math.floor(rating);
  const dec = rating - base;

  if (dec < 0.3) return `${base}.0` as RatingKey;
  if (dec < 0.7) return `${base}.5` as RatingKey;

  return `${base + 1}.0` as RatingKey;
};

type RatingKey =
  | "1.0"
  | "1.5"
  | "2.0"
  | "2.5"
  | "3.0"
  | "3.5"
  | "4.0"
  | "4.5"
  | "5.0";

export function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
  const labelRating: Record<RatingKey, string> = {
    "1.0": "Terrible",
    "1.5": "Really bad",
    "2.0": "Bad",
    "2.5": "So-so",
    "3.0": "Okay",
    "3.5": "Nice",
    "4.0": "Great",
    "4.5": "Awesome rate",
    "5.0": "Just perfect!",
  };

  const roundedKey = roundRating(rating) as RatingKey;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center">
          {[...Array(maxStars)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(rating || 0)
                  ? "text-amber-500 fill-amber-500"
                  : i < (rating || 0)
                  ? "text-amber-500 fill-amber-500/50"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <Text className="text-white">{labelRating[roundedKey]}</Text>
      </TooltipContent>
    </Tooltip>
  );
}
