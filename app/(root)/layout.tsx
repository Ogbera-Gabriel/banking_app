import MobileNavbar from "@/components/MobileNavbar";
import Sidebar from "@/components/Sidebar";
import Loading from "@/components/loading";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";


;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    redirect("/sign-in");
  }

  return (
    <main className="flex h-screen w-full font-inter">
        <Sidebar user={loggedIn}/>
        <Suspense fallback={<Loading />}>
        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image 
             src="/icons/logo.svg"
             width={30}
             height={30}
             alt="menu-logo"
            />
            <div>
              <MobileNavbar user={loggedIn}/>
            </div>
          </div>
          {children}
        </div>
        </Suspense>
    </main>
  );
}
