import { DollarSign } from "lucide-react";

interface PriceRatingProps {
  rating: number; // e.g. 3
  maxSymbols?: number; // e.g. 3
}

export function PriceRating({ rating, maxSymbols = 5 }: PriceRatingProps) {
  return (
    <div className="flex items-center">
      {Array.from({ length: maxSymbols }, (_, i) => (
        <DollarSign
          key={i}
          className={`w-4 h-4 relative right-${i} ${
            i < rating ? "text-[#323232]" : "text-gray-300"
          }`}
          strokeWidth={1.5}
          width={16}
          height={16}
          style={{ margin: 0, padding: 0 }}
        />
      ))}
    </div>
  );
}
