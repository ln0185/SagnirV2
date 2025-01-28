import NavBar from "../components/Navbar";
import Link from "next/link";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Your description here" />
        <title>My App</title>
      </head>
      <body>
        <div className="h-full relative">
          <NavBar />
          <div>
            <Link href="/">Home</Link>
            <Link href="/stories">Stories</Link>
            <Link href="/map">Map</Link>
            <Link href="/quiz">Quiz</Link>
          </div>
          <main>{children}</main> {/* This renders your page content */}
        </div>
      </body>
    </html>
  );
};

export default Layout;
