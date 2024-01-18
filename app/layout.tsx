import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

// import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UKG Rapid Search",
  description: "UKG Rapid Search",
};

/// ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <nav>
          <ul className="flex justify-between items-center">
            <li>
              <Link href="/search">Search Page</Link>
            </li>
            <div className="app-name">
              <FontAwesomeIcon icon={faSearch} className="icon" />
              Rapid Search
            </div>
            <li>
              <Link href="/addvector">Add Vector Page</Link>
            </li>
          </ul>
        </nav> */}
        {children}
      </body>
    </html>
  );
}

// ...
