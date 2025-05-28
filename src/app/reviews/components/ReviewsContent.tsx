"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Text } from "@/components/ui/text";
import { Title } from "@/components/ui/title";
import Loading from "@/components/loading";
import { Badge } from "@/components/ui/badge";

import { useReviews } from "@/hooks/use-reviews";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ReviewsContent() {
  const { reviews } = useReviews();
  const router = useRouter();

  const [page] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    // TO-DO: Implement pagination
    // const fetchReviews = async () => {
    //   const response = await getReviews(page, limit);
    //   if (response === 404) {
    //     toast.error("You don't have any reviews", {
    //       description:
    //         "Don't worrie! Start to rating to build your reviews portfolio.",
    //     });
    //   }
    //   setReviews(Array.isArray(response) ? response : null);
    // };
    // fetchReviews();
  }, [page, limit]);

  if (!reviews || reviews.length === 0) {
    return <Loading />;
  }

  return (
    <Card className="max-w-3xl mx-auto border shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">Last Reviews</h1>
        </div>

        <Separator className="mt-2" />
      </CardHeader>

      <CardContent>
        <div className="w-full max-w-3xl">
          {reviews.map((review) => (
            <div key={review._id}>
              <div
                className="flex flex-row justify-between items-center my-5 cursor-pointer gap-4"
                onClick={() => router.push(`/reviews/${review.friendlyUrl}`)}
              >
                <div>
                  <Title className="text-xl text-[#323232] font-black">
                    {review.headline}
                  </Title>
                  <Text className="text-lg text-gray-500">
                    {review.city}, {review.country}
                  </Text>
                  <div className="flex flex-wrap items-center gap-1 mt-2 mb-4">
                    {review.tags.map((tag) => (
                      <Badge key={tag.name} variant="secondary">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-gray-500">
                    Published on{" "}
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="md:w-48 w-36 md:h-36 h-24">
                  <Image
                    src={review.thumbnail}
                    alt={review.headline}
                    width={1200}
                    height={1200}
                    className="w-full h-full rounded-lg mb-4 object-cover"
                  />
                </div>
              </div>
              <hr className="border-gray-300" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
