import NavBar from "../components/Navbar";
import Link from "next/link";
import "./globals.css";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="An app about Icelandic Folklore" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="./public/resources/Logo.svg"
        />
        <title>Sagnir</title>
      </head>
      <body>
        <div className="h-auto relative">
          <NavBar />
          <div>
            <Link href="/"></Link>
            <Link href="/map"></Link>
            <Link href="/quiz"></Link>
          </div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
