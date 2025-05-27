"use client";

import { Loader2 } from "lucide-react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useLoading } from "@/hooks/use-loading";

import { AppSidebar } from "./Sidebar";
import { useSideBar } from "@/hooks/use-side-bar";

export function ScreenContentDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useLoading();
  const { isSideBarOpen } = useSideBar();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        {/* 16rem */}
        <div className="flex flex-1 flex-col overflow-hidden relative">
          <header
            className="fixed h-14 border-b flex items-center px-6 justify-between w-full bg-white"
            style={{ width: isSideBarOpen ? "calc(100% - 16rem)" : "100%" }}
          >
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h2 className="font-medium text-lg">
                <strong>ECHO</strong> Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {isLoading && (
                <Loader2 className="w-6 h-6 ml-2 animate-spin text-green-600" />
              )}
              <span className="text-sm text-muted-foreground">
                Vinicius Takedi
              </span>
              <div className="h-8 w-8 rounded-full bg-[#000] flex items-center justify-center text-white text-sm">
                VT
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6 mt-12">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
