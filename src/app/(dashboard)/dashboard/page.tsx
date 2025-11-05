import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Search } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Active Applications", value: "3" },
    { label: "Documents Uploaded", value: "12" },
    { label: "Days to Deadline", value: "45" },
  ];

  const applications = [
    {
      university: "University of Toronto",
      program: "Computer Science",
      status: "In Progress",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      university: "University of Melbourne",
      program: "Data Science",
      status: "Under Review",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      university: "UCL",
      program: "AI & ML",
      status: "Accepted",
      statusColor: "bg-green-100 text-green-800"
    },
  ];

  const quickActions = [
    {
      icon: Search,
      title: "Find Courses",
      description: "Discover programs that match your profile",
      href: "/dashboard/course-finder"
    },
    {
      icon: MessageSquare,
      title: "Ask AI Counsellor",
      description: "Get instant answers to your questions",
      href: "/dashboard/counsellor"
    },
    {
      icon: FileText,
      title: "Upload Documents",
      description: "Manage your application documents",
      href: "/dashboard/documents"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Here&apos;s an overview of your study abroad journey
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-2">
                {stat.label}
              </h3>
              <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {applications.map((app) => (
              <div key={app.university} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-3 md:p-4 bg-gray-50 rounded">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm md:text-base">{app.university}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{app.program}</p>
                </div>
                <Badge className={app.statusColor} variant="secondary">
                  {app.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                className="w-full justify-start h-auto p-4 hover:bg-gray-50"
                asChild
              >
                <Link href={action.href}>
                  <div className="flex items-start gap-3 w-full text-left">
                    <action.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm md:text-base mb-1">{action.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
