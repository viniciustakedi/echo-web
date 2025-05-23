import React from "react";
import { Loader2 } from "lucide-react";
import { Text } from "../ui/text";

const Loading: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-muted">
    <Loader2 className="w-12 h-12 text-primary animate-spin" />
    <Text className="mt-2">Loading...</Text>
  </div>
);

export default Loading;
