import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: {
    default: "TaskFlow | Modern Task Management",
    template: "%s | TaskFlow"
  },
  description: "Collaborative task management made simple. Organize, prioritize, and conquer your team's workflow with AI-powered insights.",
  keywords: ["task management", "productivity", "team collaboration", "project management", "kanban board"],
  authors: [{ name: "Your Name", url: "https://yourdomain.com" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/appLogo.png",
    shortcut: "/appLogo.png",
    apple: "/appLogo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
