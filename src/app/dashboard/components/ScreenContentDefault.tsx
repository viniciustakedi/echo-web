import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";

export function ScreenContentDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="h-14 border-b flex items-center px-6 justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h2 className="font-medium text-lg">
                <strong>ECHO</strong> Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">John Doe</span>
              <div className="h-8 w-8 rounded-full bg-[#000] flex items-center justify-center text-white text-sm">
                JD
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
