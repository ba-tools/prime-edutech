import Link from "next/link";

export default function DashboardFooter() {
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div>
            <h4 className="text-sm md:text-base font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard/help" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/dashboard/support" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm md:text-base font-semibold mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard/guides" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  Application Guides
                </Link>
              </li>
              <li>
                <Link href="/dashboard/webinars" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  Webinars
                </Link>
              </li>
              <li>
                <Link href="/dashboard/resources" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                  Study Resources
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-sm md:text-base font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
              <li className="break-words">Email: support@educonsult.com</li>
              <li>Chat: Available 24/7</li>
              <li>
                <Link href="/dashboard/feedback" className="text-muted-foreground hover:text-primary transition-colors">
                  Send Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-6 pt-6 text-center text-xs md:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EduConsult. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
