import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { Header } from "@/components/header";
import { LoggedOutFooter } from "@/components/logged-out-footer";
import { DefaultFooter } from "@/components/default-footer";
import { Toaster } from "@/components/ui/sonner";
import { TabsHeader } from "@/components/tabs-header";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Recc",
  description: "Let's make some Reccs",
};

const tabsList = [
  {
    label: "Requests",
    url: "/requests",
  },
  {
    label: "Reccs",
    url: "/reccs",
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const renderLoggedOutFooter = !user?.id;
  const renderDefaultFooter = !renderLoggedOutFooter;

  return (
    <ClerkProvider>
      <html lang="en">
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/recc-app-icon.png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        <body
          className={`relative min-h-screen flex h-svh max-h-[calc(100svh-47px)] flex-row justify-center ${nunitoSans.variable} ${nunitoSans.className} overflow-scroll bg-stone-100`}
        >
          <div className="relative flex flex-col w-full h-full border-x">
            <Header />

            <div className="flex w-full pb-4">
              <TabsHeader tabsList={tabsList} />
            </div>

            {children}

            {renderLoggedOutFooter && <LoggedOutFooter />}

            {renderDefaultFooter && <DefaultFooter userId={user?.id} />}

            <Toaster
              toastOptions={{
                classNames: {
                  toast: "bg-stone-800",
                  title: "text-white text-semibold",
                  icon: "fill-white",
                },
              }}
            />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
