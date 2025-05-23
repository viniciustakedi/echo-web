"use client";
import { useEffect, useState } from "react";

import { getReviews } from "@/requests/get";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Text } from "@/components/ui/text";
import { Title } from "@/components/ui/title";
import { GetReviews } from "@/requests/get/reviews/types";
import { toast } from "sonner";
import Loading from "@/components/loading";
import { Badge } from "@/components/ui/badge";

export default function ReviewsContent() {
  const router = useRouter();

  const [page] = useState(1);
  const [limit] = useState(10);
  const [reviews, setReviews] = useState<GetReviews.ReviewListItem[] | null>(
    null
  );

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await getReviews(page, limit);

      if (response === 404) {
        toast.error("You don't have any reviews", {
          description:
            "Don't worrie! Start to rating to build your reviews portfolio.",
        });
      }

      setReviews(Array.isArray(response) ? response : null);
    };

    fetchReviews();
  }, [page, limit]);

  if (!reviews || reviews.length === 0) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center mt-32 w-full h-full p-4">
      <div className="flex flex-col items-start w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Last Reviews</h1>
        <hr className="border-gray-300 w-full" />
      </div>
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
              <div>
                <Image
                  src={review.thumbnail}
                  alt={review.headline}
                  width={1200}
                  height={1200}
                  className="md:w-56 md:h-36 w-auto h-24 rounded-lg mb-4 object-cover"
                />
              </div>
            </div>
            <hr className="border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
