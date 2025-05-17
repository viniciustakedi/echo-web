"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ReviewEditor } from "../components/ReviewEditor";
import { ScreenContentDefault } from "../components/ScreenContentDefault";

const NewReview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSaveReview = async (data: any) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("New review:", data);

      toast.success("Review created", {
        description: "Your review has been successfully created.",
      });

      router.push("/dashboard/reviews");
    } catch (error) {
      console.error("Error creating review:", error);

      toast.error("Error!", {
        description: "There was an error creating your review.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContentDefault>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Review</h1>
          <p className="text-muted-foreground">
            Create a new restaurant review with Markdown support.
          </p>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <ReviewEditor onSave={handleSaveReview} isLoading={isLoading} />
        </div>
      </div>
    </ScreenContentDefault>
  );
};

export default NewReview;
