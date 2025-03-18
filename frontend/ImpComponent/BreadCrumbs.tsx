"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BreadCrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-muted-foreground">
      <ul className="flex items-center space-x-2">
        {/* Home Link */}
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>

        {/* Dynamic Breadcrumbs */}
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const formattedText = segment.replace(/-/g, " ");

          // If it's a dynamic segment (e.g., product ID), don't make it a link
          const isDynamic = /^\d+$/.test(segment) || segment.includes("id");

          return (
            <li key={href} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              {!isLast && !isDynamic ? (
                <Link href={href} className="hover:underline capitalize">
                  {formattedText}
                </Link>
              ) : (
                <span className="capitalize text-gray-500">{formattedText}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BreadCrumbs;
