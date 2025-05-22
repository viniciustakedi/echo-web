import { useState } from "react";
import { ReviewCard } from "./ReviewCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { GetReviews } from "@/requests/get/reviews/types";

interface ReviewListProps {
  reviews: GetReviews.ReviewListItem[];
  onDeleteReview: (id: string) => void;
}

export function ReviewList({ reviews, onDeleteReview }: ReviewListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter((review) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        review.headline.toLowerCase().includes(searchLower) ||
        review.country.toLowerCase().includes(searchLower) ||
        review.city.toLowerCase().includes(searchLower) ||
        review.tags.some((tag: { name: string }) =>
          tag.name.toLowerCase().includes(searchLower)
        )
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="highest">Highest Rated</SelectItem>
            <SelectItem value="lowest">Lowest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg font-medium">No reviews found</p>
          <p className="text-muted-foreground">
            Try adjusting your search or add a new review
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onDelete={onDeleteReview}
            />
          ))}
        </div>
      )}
    </div>
  );
}
