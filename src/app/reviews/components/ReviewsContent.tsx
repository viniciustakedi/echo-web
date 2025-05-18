"use client";
import { useEffect, useState } from "react";

import { getReviews } from "@/requests/get";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Text } from "@/components/ui/text";
import { Title } from "@/components/ui/title";
import { GetReviews } from "@/requests/get/reviews/types";

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
      setReviews(response);
    };

    fetchReviews();
  }, [page, limit]);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-32 w-full h-full p-4">
      <div className="flex flex-col items-start mb-8 w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Last Reviews</h1>
        <hr className="border-gray-300 w-full" />
      </div>
      <div className="w-full max-w-3xl">
        {reviews.map((review) => (
          <div key={review._id}>
            <div
              className="flex flex-row justify-between items-center mb-8 cursor-pointer gap-4"
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
                    <div
                      key={tag.name}
                      className="flex bg-[#323232] rounded-full w-auto items-center justify-center px-2 py-1"
                    >
                      <Text className="text-sm text-white">{tag.name}</Text>
                    </div>
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
                  className="w-56 h-auto rounded-lg mb-4 object-cover"
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
