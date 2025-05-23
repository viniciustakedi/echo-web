"use client";

import { Book, LayoutDashboard, LogOut, MapPin } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

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

export function AppSidebar() {
  const currentPath = location.pathname;

  const navItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Reviews", url: "/dashboard/reviews", icon: Book },
    { title: "Map Markers", url: "/dashboard/map-markers", icon: MapPin },
    { title: "Log Out", url: "logout", icon: LogOut },
  ];

  const isActive = (path: string): boolean => currentPath === path;

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
              {navItems.map((item) => {
                const href = item.url === "logout" ? "/sign-in" : item.url;

                const handleClick = () => {
                  if (item.url === "logout") {
                    signOut({ redirect: true });
                  }
                };

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={href}
                        className={getNavClass({
                          isActive: isActive(item.url),
                        })}
                        onClick={handleClick}
                      >
                        <item.icon className={`h-5 w-5 mr-2`} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
