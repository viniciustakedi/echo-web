"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
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
import { GetMaps } from "@/requests/get/map-markers/types";

interface MapMarkerProps {
  mapMarker: GetMaps.MapMarker;
  onDelete: (id: string) => void;
}

export function MapMarkerCard({ mapMarker, onDelete }: MapMarkerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="overflow-hidden border hover:shadow-md transition-all animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{mapMarker.review.headline}</CardTitle>
        </div>
        <CardDescription>
          Latitude: {mapMarker.latitude} • Longitude: {mapMarker.longitude}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between pt-2 border-t bg-muted/30">
        <div className="flex gap-2 overflow-y-scroll">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/dashboard/edit-map-marker/${mapMarker._id}`}>
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
                  permanently delete this map marker from our servers?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => {
                    onDelete(mapMarker._id);
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
