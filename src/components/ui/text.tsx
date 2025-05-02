import React from "react";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export function Text({ children, className = "" }: TitleProps) {
  return (
    <p className={`text-base font-normal text-[#323232] ${className}`}>
      {children}
    </p>
  );
}
