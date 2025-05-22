/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Edit, Star, MapPin, ArrowRight } from "lucide-react";

// Demo data
import { toast } from "sonner";
import Link from "next/link";
import { ReviewCard } from "./components/review/ReviewCard";
import { getReviews } from "@/requests/get";
import { ScreenContentDefault } from "./components/ScreenContentDefault";
import { GetReviews } from "@/requests/get/reviews/types";
import { deleteReview } from "@/requests/delete";
import { useReviews } from "@/hooks/use-reviews";

const Dashboard = () => {
  const { data: session, status } = useSession({ required: true });
  const { reviews, setReviews } = useReviews();

  if (status === "loading") return <p>Loading…</p>;

  const handleDeleteReview = async (id: string) => {
    setReviews(reviews ? reviews.filter((review) => review._id !== id) : null);

    try {
      const apiToken = (session as any).apiToken as string;
      const response = await deleteReview(id, apiToken);

      if (response.status === 401) {
        signOut({ redirect: false });
      }

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Review deleted", {
        description: "The review has been successfully deleted.",
      });
    } catch (error) {
      toast.error("Error in delete review!", {
        description:
          error instanceof Error
            ? error.message
            : "There was an error creating your review.",
      });
    }
  };

  // Calculate stats
  const totalReviews = reviews?.length;
  const averageRating =
    reviews &&
    totalReviews &&
    reviews.reduce(
      (acc: any, review: { rating: any }) => acc + review.rating,
      0
    ) / totalReviews;

  return (
    <ScreenContentDefault>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button asChild>
            <Link href="/dashboard/new-review">
              <Edit className="mr-2 h-4 w-4" />
              New Review
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reviews
              </CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReviews}</div>
              <p className="text-xs text-muted-foreground">
                +{Math.floor(Math.random() * 5) + 1} from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Rating
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-1">
                <div className="text-2xl font-bold">
                  {averageRating?.toFixed(1) || 0}
                </div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(averageRating || 0)
                          ? "text-amber-500 fill-amber-500"
                          : i < (averageRating || 0)
                          ? "text-amber-500 fill-amber-500/50"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Based on all reviews
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Most Reviewed
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">New York</div>
              <p className="text-xs text-muted-foreground">
                {Math.floor(Math.random() * 20) + 10} restaurants reviewed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Cuisine</CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Italian</div>
              <p className="text-xs text-muted-foreground">
                Featured in {Math.floor(Math.random() * 8) + 3} reviews
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Reviews</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/reviews" className="gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(reviews) &&
              reviews.length > 0 &&
              reviews
                .slice(0, 3)
                .map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    onDelete={handleDeleteReview}
                  />
                ))}
          </div>
        </div>
      </div>
    </ScreenContentDefault>
  );
};

export default Dashboard;
