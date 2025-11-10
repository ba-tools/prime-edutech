import Link from "next/link";

const CURRENT_YEAR = new Date().getFullYear();

export default function PublicFooter() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Prime Edutech</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Your trusted partner in international education consulting.
            </p>
          </div>

          <div>
            <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Contact</h4>
            <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
              <li className="break-words">Email: info@educonsult.com</li>
              <li>Phone: +1 234 567 8900</li>
              <li>Address: 123 Education St, City</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-muted-foreground">
          <p>&copy; {CURRENT_YEAR} Prime Edutech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
