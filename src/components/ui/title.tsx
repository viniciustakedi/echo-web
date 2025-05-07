import React from "react";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export function Title({ children, className = "" }: TitleProps) {
  return (
    <h1 className={`text-4xl font-bold text-[#323232]  ${className}`}>
      {children}
    </h1>
  );
}
