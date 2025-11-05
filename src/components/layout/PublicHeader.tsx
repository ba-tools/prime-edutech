"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const destinations = [
    { label: "Australia", href: "/destinations/australia" },
    { label: "Canada", href: "/destinations/canada" },
    { label: "USA", href: "/destinations/usa" },
    { label: "UK", href: "/destinations/uk" },
    { label: "Germany", href: "/destinations/germany" },
  ];

  const partners = [
    { label: "Universities", href: "/partners/universities" },
    { label: "Agents", href: "/partners/agents" },
    { label: "Organizations", href: "/partners/organizations" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white transition-all duration-300",
        isScrolled && "border-b shadow-md"
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="hidden sm:inline text-lg md:text-xl font-bold text-primary">
              EduConsult
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link href="/students" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-primary focus:bg-gray-50 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    )}
                  >
                    Students
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-primary">
                  Study Destinations
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-max md:grid-cols-2 lg:w-[500px]">
                    {destinations.map((dest) => (
                      <li key={dest.href}>
                        <Link href={dest.href} legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-primary focus:bg-gray-50 focus:text-primary">
                            <div className="text-sm font-medium leading-none">
                              {dest.label}
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-primary">
                  Partners
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {partners.map((partner) => (
                      <li key={partner.href}>
                        <Link href={partner.href} legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-primary focus:bg-gray-50 focus:text-primary">
                            <div className="text-sm font-medium leading-none">
                              {partner.label}
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Get Started Button */}
          <Link href="/register" className="hidden md:block">
            <ShimmerButton className="h-12 md:h-14 px-8 text-base md:text-lg">
              <span className="whitespace-nowrap">Get Started</span>
            </ShimmerButton>
          </Link>

          {/* Mobile: Get Started Button + Hamburger Menu */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <Link href="/register">
              <ShimmerButton className="h-12 px-6 text-base">
                <span>Get Started</span>
              </ShimmerButton>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/students"
                    className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    Students
                  </Link>

                  <div>
                    <h3 className="text-base font-medium text-foreground mb-2">
                      Study Destinations
                    </h3>
                    <div className="pl-4 flex flex-col gap-2">
                      {destinations.map((dest) => (
                        <Link
                          key={dest.href}
                          href={dest.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                        >
                          {dest.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-foreground mb-2">
                      Partners
                    </h3>
                    <div className="pl-4 flex flex-col gap-2">
                      {partners.map((partner) => (
                        <Link
                          key={partner.href}
                          href={partner.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                        >
                          {partner.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
