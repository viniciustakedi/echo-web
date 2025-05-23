"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Star } from "lucide-react";
import Link from "next/link";
import { GetReviews } from "@/requests/get/reviews/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface ReviewCardProps {
  review: GetReviews.ReviewListItem;
  onDelete: (id: string) => void;
}

export function ReviewCard({ review, onDelete }: ReviewCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="overflow-hidden border hover:shadow-md transition-all animate-fade-in">
      <CardHeader className="pb-2 h-auto">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{review.headline}</CardTitle>
          <div className="flex items-center text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 font-medium">{review.rating}</span>
          </div>
        </div>
        <CardDescription>
          Claps: {review.claps ?? 0} • Price Rating: {review.priceRating} •
          Rating: {review.rating}
        </CardDescription>
        <CardDescription>
          {review.address} • {review.city}, {review.country}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex flex-wrap gap-1 mt-3">
          {review.tags.map((tag: { name: string }) => (
            <Badge key={tag.name} variant="secondary" className="text-xs">
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2 border-t bg-muted/30">
        <div className="text-xs text-muted-foreground">
          {new Date(review.createdAt).toLocaleDateString()}
        </div>

        <div className="flex gap-2 overflow-y-scroll">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/dashboard/review/${review.friendlyUrl}`}>
              <Eye className="h-4 w-4 mr-1" /> View
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href={`/dashboard/edit-review/${review._id}`}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Link>
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. Are you sure you want to
                  permanently delete this review from our servers?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => {
                    onDelete(review._id);
                    setOpen(false);
                  }}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}
