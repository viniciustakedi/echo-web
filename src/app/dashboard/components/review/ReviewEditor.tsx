import { useForm } from "react-hook-form";
import { useState } from "react";
import { X } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { useTags } from "@/hooks/use-tags";
import { GetReviews } from "@/requests/get/reviews/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReviewEditorProps {
  initialData?: Partial<GetReviews.ReviewByKey>;
  onSave: (data: GetReviews.ReviewByKey) => void;
  isLoading?: boolean;
}

export function ReviewEditor({
  initialData,
  onSave,
  isLoading = false,
}: ReviewEditorProps) {
  const { tags: tagsCtx } = useTags();
  const [activeTab, setActiveTab] = useState("edit");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<{ name: string; _id: string }[]>(
    initialData?.tags || []
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GetReviews.ReviewByKey>({
    defaultValues: {
      thumbnail: initialData?.thumbnail || "",
      headline: initialData?.headline || "",
      content: initialData?.content || "",
      rating: initialData?.rating || 4,
      priceRating: initialData?.priceRating || 4,
      address: initialData?.address || "",
      country: initialData?.country || "",
      city: initialData?.city || "",
      tags: initialData?.tags || [],
    },
  });

  const content = watch("content");

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag.name !== tagToRemove));
  };

  const onSubmit = (data: GetReviews.ReviewByKey) => {
    onSave({ ...data, tags });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="headline" className="mb-2">
            Headline
          </Label>
          <Input
            id="headline"
            {...register("headline", { required: "Headline is required" })}
            className={errors.headline ? "border-destructive" : ""}
          />
          {errors.headline && (
            <p className="text-destructive text-sm mt-1">
              {errors.headline.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="thumbnail" className="mb-2">
            Thumbnail
          </Label>
          <Input
            id="thumbnail"
            {...register("thumbnail", {
              required: "Thumbnail name is required",
            })}
            className={errors.thumbnail ? "border-destructive" : ""}
          />
          {errors.thumbnail && (
            <p className="text-destructive text-sm mt-1">
              {errors.thumbnail.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="priceRating" className="mb-2">
            Price Rating (1-5)
          </Label>
          <Input
            id="priceRating"
            type="number"
            min={1}
            max={5}
            step={0.1}
            {...register("priceRating", {
              required: "Price Rating is required",
              min: { value: 1, message: "Price rating must be at least 1" },
              max: { value: 5, message: "Price rating cannot exceed 5" },
            })}
            className={errors.priceRating ? "border-destructive" : ""}
          />
          {errors.priceRating && (
            <p className="text-destructive text-sm mt-1">
              {errors.priceRating.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="rating" className="mb-2">
            Rating (1-5)
          </Label>
          <Input
            id="rating"
            type="number"
            min={1}
            max={5}
            step={0.1}
            {...register("rating", {
              required: "Rating is required",
              min: { value: 1, message: "Rating must be at least 1" },
              max: { value: 5, message: "Rating cannot exceed 5" },
            })}
            className={errors.rating ? "border-destructive" : ""}
          />
          {errors.rating && (
            <p className="text-destructive text-sm mt-1">
              {errors.rating.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="city" className="mb-2">
            City
          </Label>
          <Input
            id="city"
            {...register("city", { required: "City is required" })}
            className={errors.city ? "border-destructive" : ""}
          />
          {errors.city && (
            <p className="text-destructive text-sm mt-1">
              {errors.city.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="country" className="mb-2">
            Country
          </Label>
          <Input
            id="country"
            {...register("country", { required: "Country is required" })}
            className={errors.country ? "border-destructive" : ""}
          />
          {errors.country && (
            <p className="text-destructive text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="address" className="mb-2">
          Address
        </Label>
        <div className="flex gap-2">
          <Input
            id="address"
            {...register("address", { required: "Address is required" })}
            className={errors.address ? "border-destructive" : ""}
          />
          {errors.address && (
            <p className="text-destructive text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="tags" className="mb-2">
          Tags
        </Label>
        <div className="flex gap-2 items-center">
          <Select
            value={tagInput}
            onValueChange={(value) => setTagInput(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tags</SelectLabel>
                {tagsCtx?.map((tag: { name: string; _id: string }) => (
                  <SelectItem key={tag._id} value={tag._id}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            type="button"
            onClick={() => {
              const selectedTag = tagsCtx?.find(
                (t: { _id: string }) => t._id === tagInput
              );
              if (selectedTag && !tags.some((t) => t._id === selectedTag._id)) {
                setTags([...tags, selectedTag]);
                setTagInput("");
              }
            }}
            disabled={!tagInput}
          >
            Add
          </Button>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag: { name: string }) => (
              <Badge key={tag.name} variant="secondary" className="py-1">
                {tag.name}
                <button
                  type="button"
                  onClick={() => removeTag(tag.name)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="content" className="mb-2">
          Review Content (Markdown)
        </Label>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-0">
            <Textarea
              id="content"
              {...register("content", { required: "Content is required" })}
              rows={12}
              className={`font-mono ${
                errors.content ? "border-destructive" : ""
              }`}
              placeholder="Write your review in Markdown..."
            />
            {errors.content && (
              <p className="text-destructive text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <Card>
              <CardContent className="p-4">
                <div className="prose max-w-none">
                  {content ? (
                    <MarkdownRenderer content={content} />
                  ) : (
                    <p className="text-muted-foreground">
                      No content to preview
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Separator />

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Review"}
        </Button>
      </div>
    </form>
  );
}
