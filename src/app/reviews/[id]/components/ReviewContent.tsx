"use client";
import { useCallback, useEffect, useState } from "react";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getReviewByKey } from "@/requests/get";
import { GetRequests } from "@/requests/get/types";

interface Props {
  id: string;
}

export default function ReviewContent({ id }: Props) {
  const [review, setReview] = useState<GetRequests.Review.ReviewByKey | null>(
    null
  );

  useEffect(() => {
    const fetchReview = async () => {
      const response = await getReviewByKey(id);
      setReview(response);
    };

    fetchReview();
  }, [id]);

  if (!review) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{review?.headline}</h1>
        <p className="text-gray-500">
          Published on{" "}
          {new Date(review?.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <div className="markdown-body max-w-3xl mx-auto">
        <MarkdownRenderer content={review?.content} />
      </div>
    </article>
  );
}
