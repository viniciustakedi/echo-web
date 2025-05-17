import Menu from "@/components/menu";
import SignInForm from "./components/SignInForm";
import Image from "next/image";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="base__div">
      <div className="base__div__page">
        <Menu />
        <main className="h-full flex flex-col md:flex-row">
          {/* Left Side - Form */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-travel-gradient md:w-1/2">
            <div className="w-full max-w-md mx-auto">
              <div className="mb-8 flex justify-center">
                {/* TripAdvisor-inspired Logo */}
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-black font-black text-tripadvisor-green">
                    ECHO
                  </span>
                </div>
              </div>
              <SignInForm />
            </div>
          </div>

          {/* Right Side - Image (visible on md screens and above) */}
          <div
            className="hidden md:block md:w-1/2 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb')",
            }}
          >
            <div className="h-full w-full bg-black/30 p-12 flex items-center justify-center">
              <div className="max-w-md text-white">
                <h2 className="text-3xl font-bold mb-6">
                  Discover Your Next Adventure
                </h2>
                <p className="text-lg mb-8">
                  Sign in to plan your perfect getaway, find the best deals, and
                  share your travel experiences with millions of travelers
                  around the world.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
                    <Image
                      src="https://randomuser.me/api/portraits/women/32.jpg"
                      alt="User"
                      className="w-full h-full object-cover"
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Sarah J.</div>
                    <div className="text-xs opacity-80">
                      &ldquo;ECHO helped me find hidden gems in
                      Barcelona!&ldquo;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignInPage;
