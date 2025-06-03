"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Edit } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";

import { ScreenContentDefault } from "../components/ScreenContentDefault";

import { useTags } from "@/hooks/use-tags";
import { TagList } from "../components/tag/TagList";
import { GetTags } from "@/requests/get/tags/types";
import { updateTag } from "@/requests/patch/tags";
import { createTag } from "@/requests/post/tags";
import { TagModalEditor } from "../components/tag/TagModalEditor";

const Reviews = () => {
  const { data: session, status } = useSession({ required: true });

  const { tags, setTags } = useTags();
  const [open, setOpen] = useState<boolean>(false);

  const handleOnSave = async (e: GetTags.Tag) => {
    let action: "updated" | "created" = "created";

    try {
      const apiToken = (session as any).apiToken as string;

      let response: Response;
      if (e._id) {
        action = "updated";
        response = await updateTag(e._id, { name: e.name }, apiToken);

        if (!response.ok) {
          throw new Error((await response.json()).message);
        }

        const oldTags = tags.filter((tag) => tag._id !== e._id);
        const tagChanged = tags.find((tag) => tag._id === e._id);

        setTags([
          ...oldTags,
          {
            _id: e._id,
            name: e.name,
            createdAt: tagChanged?.createdAt || new Date().toISOString(),
          },
        ]);
      } else {
        response = await createTag({ name: e.name }, apiToken);

        if (!response.ok) {
          throw new Error((await response.json()).message);
        }

        const responseJson = (await response.json()).data;

        setTags([
          ...tags,
          {
            _id: responseJson._id,
            name: e.name,
            createdAt: new Date().toISOString(),
          },
        ]);
      }

      toast.success(`Tag ${action}`, {
        description: `The tag has been successfully ${action}.`,
      });
    } catch (error) {
      toast.error(`Error in ${action} tag!`, {
        description:
          error instanceof Error
            ? error.message
            : `There was an error when server was ${action} your tag.`,
      });
    }
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <ScreenContentDefault>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>

          <Button onClick={() => setOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            New Tag
          </Button>
        </div>

        <TagList tags={tags} onUpdateTag={handleOnSave} />
      </div>

      <TagModalEditor open={open} setOpen={setOpen} onSave={handleOnSave} />
    </ScreenContentDefault>
  );
};

export default Reviews;
