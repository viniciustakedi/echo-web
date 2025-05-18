"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Book, Edit, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
  const currentPath = location.pathname;

  const navItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Reviews", url: "/dashboard/reviews", icon: Book },
    { title: "New Review", url: "/dashboard/new-review", icon: Edit },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
  ];

  // Helper functions for active state and CSS classes
  const isActive = (path: string) =>
    currentPath === path || currentPath.startsWith(path + "/dashboard");

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-sidebar-accent text-sidebar-accent-foreground rounded-md px-3 py-2 w-full flex items-center font-medium"
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground rounded-md px-3 py-2 w-full flex items-center transition-colors";

  return (
    <Sidebar className={`border-r transition-all duration-300 ease-in-out`}>
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent className="pt-6">
        <div className="mb-6 px-3 flex items-center gap-2">
          <h1 className="font-black text-xl text-review">ECHO Dashboard</h1>
          <div className="w-8 h-8 rounded-md bg-review text-white flex items-center justify-center">
            R
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground">
            Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={getNavClass({ isActive: isActive(item.url) })}
                      onClick={(e) => e.preventDefault}
                    >
                      <item.icon className={`h-5 w-5 mr-2`} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
