"use client";
import { useEffect, useState } from "react";

import { GetReviews } from "@/requests/get/reviews/types";
import { getReviewByKey } from "@/requests/get";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Calendar, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface Props {
  id: string;
}

export default function ReviewContent({ id }: Props) {
  const [review, setReview] = useState<GetReviews.ReviewByKey | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      const response = await getReviewByKey(id);
      setReview(response);
    };

    fetchReview();
  }, [id]);

  if (!review) {
    return <Loading />;
  }

  return (
    <article>
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
          <div className="flex flex-wrap items-center gap-1 mt-2">
            {review.tags.map((tag) => (
              <Badge key={tag.name} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <Separator className="my-4" />

          <MarkdownRenderer content={review.content} />

          {review.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-6">
              {review.tags.map((tag: { name: string }) => (
                <Badge key={tag.name} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-4 bg-muted/20">
          <Button variant="outline" asChild>
            <Link href="/reviews">Back to Reviews</Link>
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}
