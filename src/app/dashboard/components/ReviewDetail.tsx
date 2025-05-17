import { Star, Calendar, MapPin, Edit } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GetRequests } from "@/requests/get/types";
import { MarkdownRenderer } from "@/components/markdown-renderer";

interface ReviewDetailProps {
  review: GetRequests.Review.ReviewByKey;
}

export function ReviewDetail({ review }: ReviewDetailProps) {
  return (
    <Card className="max-w-3xl mx-auto border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{review.headline}</h1>

          <div className="flex items-center bg-amber-100 text-amber-700 px-2 py-1 rounded-md">
            <Star className="h-4 w-4 mr-1 fill-amber-500" />
            <span className="font-bold">{review.rating}</span>
            <span className="text-xs ml-1">/5</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-2">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(review.updatedAt).toLocaleDateString()}
          </div>

          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {review.city}, {review.country}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-1">{review.headline}</h2>

        <Separator className="my-4" />

        <MarkdownRenderer content={review.content} />

        {review.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-6">
            {review.tags.map((tag: { name: string }) => (
              <Badge key={tag.name} variant="outline">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4 bg-muted/20">
        <Button variant="outline" asChild>
          <Link href="/dashboard/reviews">Back to Reviews</Link>
        </Button>

        <Button variant="default" asChild>
          <Link href={`/dashboard/edit-review/${review._id}`}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Review
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
