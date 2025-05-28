import { useState } from "react";
import { Search } from "lucide-react";

import { GetTags } from "@/requests/get/tags/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagModalEditor } from "./TagModalEditor";

interface TagListProps {
  tags: GetTags.Tags[];
  onUpdateTag: (e: GetTags.Tag) => void;
}

export function TagList({ tags, onUpdateTag }: TagListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tagId, setTagId] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState("newest");

  // Filter and sort tags
  const filteredTags = tags
    .filter((tags) => {
      const searchLower = searchTerm.toLowerCase();
      return tags.name.toLowerCase().includes(searchLower);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

  const handleUpdateTag = (id: string) => {
    setTagId(id);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredTags.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg font-medium">No tags found</p>
          <p className="text-muted-foreground">
            Try adjusting your search or add a new tag
          </p>
        </div>
      ) : (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTags.map((tag) => (
              <TableRow key={tag._id}>
                <TableCell className="font-medium">{tag.name}</TableCell>
                <TableCell className="font-medium">
                  {new Date(tag.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  <Button onClick={() => handleUpdateTag(tag._id)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <TagModalEditor
        initialData={tags.find((e) => e._id === tagId)}
        open={open}
        setOpen={setOpen}
        onSave={onUpdateTag}
      />
    </div>
  );
}
