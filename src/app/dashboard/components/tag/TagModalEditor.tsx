import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GetTags } from "@/requests/get/tags/types";

interface TagModalEditorProps {
  initialData?: Partial<GetTags.Tag>;
  isLoading?: boolean;
  open: boolean;
  setOpen: (e: boolean) => void;
  onSave: (data: GetTags.Tag) => void;
}

export function TagModalEditor({
  initialData,
  onSave,
  isLoading = false,
  open,
  setOpen,
}: TagModalEditorProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GetTags.Tag>({
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  useEffect(() => {
    reset({ name: initialData?.name || "" });
  }, [initialData, reset]);

  const onSubmit = (data: GetTags.Tag) => {
    const dataToSave: GetTags.Tag = { ...data };

    if (initialData?._id) {
      dataToSave._id = initialData._id;
    }

    reset({ name: "" });

    onSave(dataToSave);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tag</DialogTitle>
          <DialogDescription>
            Make changes to your tag here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            className="col-span-3"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-1 w-full">
              {errors.name.message}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Tag"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
