import React from "react";
import { Loader2 } from "lucide-react";
import { Text } from "../ui/text";

const Loading: React.FC = () => (
  <div className="flex inset-0 z-50 flex-col items-center justify-center w-full h-screen bg-muted fixed top-0 left-0">
    <Loader2 className="w-12 h-12 animate-spin text-green-600" />
    <Text className="mt-2">Loading...</Text>
  </div>
);

export default Loading;
