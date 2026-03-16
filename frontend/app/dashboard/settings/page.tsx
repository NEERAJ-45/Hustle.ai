"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User, Bell, Lock, CreditCard, Briefcase, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 dark:bg-grid-white/[0.02] bg-grid-black/[0.03]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div>
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
              <span className="bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Settings
              </span>
            </h1>
            <p className="text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-5 mb-6 bg-muted border border-border">
                  <TabsTrigger
                    value="profile"
                    className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground"
                  >
                    <User className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Profile</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="job"
                    className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Job Preferences</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Security</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="billing"
                    className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Billing</span>
                  </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-muted-foreground"
                        >
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          defaultValue="Alex"
                          className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-muted-foreground"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          defaultValue="Johnson"
                          className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-muted-foreground">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="alex@example.com"
                        className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-muted-foreground">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="location"
                        className="text-muted-foreground"
                      >
                        Location
                      </Label>
                      <Input
                        id="location"
                        defaultValue="San Francisco, CA"
                        className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-muted-foreground">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        defaultValue="Passionate frontend developer with 5+ years of experience building modern web applications..."
                        className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="linkedin"
                        className="text-muted-foreground"
                      >
                        LinkedIn URL
                      </Label>
                      <Input
                        id="linkedin"
                        defaultValue="https://linkedin.com/in/alexjohnson"
                        className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="github" className="text-muted-foreground">
                        GitHub URL
                      </Label>
                      <Input
                        id="github"
                        defaultValue="https://github.com/alexjohnson"
                        className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    <Button className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="job" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="jobTitle"
                        className="text-muted-foreground"
                      >
                        Desired Job Title
                      </Label>
                      <Input
                        id="jobTitle"
                        defaultValue="Senior Frontend Engineer"
                        className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="minSalary"
                          className="text-muted-foreground"
                        >
                          Minimum Salary
                        </Label>
                        <Input
                          id="minSalary"
                          type="number"
                          defaultValue="120000"
                          className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="maxSalary"
                          className="text-muted-foreground"
                        >
                          Maximum Salary
                        </Label>
                        <Input
                          id="maxSalary"
                          type="number"
                          defaultValue="180000"
                          className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="jobType"
                        className="text-muted-foreground"
                      >
                        Job Type
                      </Label>
                      <Select defaultValue="fulltime">
                        <SelectTrigger
                          id="jobType"
                          className="bg-muted border-border text-foreground"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          <SelectItem value="fulltime">Full-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="parttime">Part-time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="workType"
                        className="text-muted-foreground"
                      >
                        Work Type
                      </Label>
                      <Select defaultValue="remote">
                        <SelectTrigger
                          id="workType"
                          className="bg-muted border-border text-foreground"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="onsite">On-site</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="locations"
                        className="text-muted-foreground"
                      >
                        Preferred Locations
                      </Label>
                      <Input
                        id="locations"
                        defaultValue="San Francisco, New York, Remote"
                        className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills" className="text-muted-foreground">
                        Key Skills
                      </Label>
                      <Textarea
                        id="skills"
                        rows={3}
                        defaultValue="React, TypeScript, Next.js, Tailwind CSS, Node.js"
                        className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    <Button className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-foreground">
                        Email Notifications
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            id: "newMatches",
                            label: "New job matches",
                            description:
                              "Get notified when new jobs match your profile",
                          },
                          {
                            id: "applications",
                            label: "Application updates",
                            description: "Updates on your job applications",
                          },
                          {
                            id: "interviews",
                            label: "Interview reminders",
                            description: "Reminders 24 hours before interviews",
                          },
                          {
                            id: "messages",
                            label: "New messages",
                            description:
                              "Messages from recruiters and hiring managers",
                          },
                        ].map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/50"
                          >
                            <div>
                              <p className="font-medium text-foreground">
                                {item.label}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-foreground">
                        Push Notifications
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            id: "pushMatches",
                            label: "Job matches",
                            description:
                              "Instant notifications for new matches",
                          },
                          {
                            id: "pushMessages",
                            label: "Messages",
                            description: "New messages and responses",
                          },
                        ].map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/50"
                          >
                            <div>
                              <p className="font-medium text-foreground">
                                {item.label}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="currentPassword"
                        className="text-muted-foreground"
                      >
                        Current Password
                      </Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        className="bg-muted border-border text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="newPassword"
                        className="text-muted-foreground"
                      >
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        className="bg-muted border-border text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-muted-foreground"
                      >
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        className="bg-muted border-border text-foreground"
                      />
                    </div>

                    <Button className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0">
                      Update Password
                    </Button>

                    <hr className="my-6 border-border" />

                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-foreground">
                        Two-Factor Authentication
                      </h3>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium text-foreground">
                            Enable 2FA
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Billing Tab */}
                <TabsContent value="billing" className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-foreground">
                        Current Plan
                      </h3>
                      <Card className="bg-linear-to-br from-cyan-500/20 via-blue-500/20 to-violet-500/20 border-border backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-foreground">
                            Pro Plan
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">
                            $29/month, billed monthly
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm mb-4 text-foreground">
                            Next billing date: February 15, 2024
                          </p>
                          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white border-0">
                            Manage Plan
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-foreground">
                        Payment Method
                      </h3>
                      <Card className="bg-muted/50 border-border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-8 bg-linear-to-r from-cyan-500 to-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                VISA
                              </div>
                              <div>
                                <p className="font-medium text-foreground">
                                  •••• •••• •••• 4242
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Expires 12/25
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                              Update
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-foreground">
                        Billing History
                      </h3>
                      <div className="space-y-2">
                        {[
                          {
                            date: "Jan 15, 2024",
                            amount: "$29.00",
                            status: "Paid",
                          },
                          {
                            date: "Dec 15, 2023",
                            amount: "$29.00",
                            status: "Paid",
                          },
                          {
                            date: "Nov 15, 2023",
                            amount: "$29.00",
                            status: "Paid",
                          },
                        ].map((invoice, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/50"
                          >
                            <div>
                              <p className="font-medium text-foreground">
                                {invoice.date}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {invoice.amount}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-emerald-400">
                                {invoice.status}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground hover:bg-accent"
                              >
                                Download
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
