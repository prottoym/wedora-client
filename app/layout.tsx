import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: { default: "WedPlan", template: "%s | WedPlan" },
  description:
    "WedPlan is a wedding planning platform where customers discover vendors and request bookings.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider defaultTheme="dark">
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}


// page.tsx

// import { Button } from "@/components/ui/button"

// export default function Page() {
//   return (
//     <div className="flex min-h-svh p-6">
//       <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
//         <div>
//           <h1 className="font-medium">Project ready!</h1>
//           <p>You may now add components and start building.</p>
//           <p>We&apos;ve already added the button component for you.</p>
//           <Button className="mt-2">Button</Button>
//         </div>
//         <div className="font-mono text-xs text-muted-foreground">
//           (Press <kbd>d</kbd> to toggle dark mode)
//         </div>
//       </div>
//     </div>
//   )
// }
