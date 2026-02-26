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
import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#334e68] to-[#2563eb] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-white/80">Manage your account and preferences</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="profile">
                    <User className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Profile</span>
                  </TabsTrigger>
                  <TabsTrigger value="job">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Job Preferences</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications">
                    <Bell className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger value="security">
                    <Lock className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Security</span>
                  </TabsTrigger>
                  <TabsTrigger value="billing">
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Billing</span>
                  </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Alex" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Johnson" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="alex@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="San Francisco, CA" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        defaultValue="Passionate frontend developer with 5+ years of experience building modern web applications..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn URL</Label>
                      <Input
                        id="linkedin"
                        defaultValue="https://linkedin.com/in/alexjohnson"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub URL</Label>
                      <Input
                        id="github"
                        defaultValue="https://github.com/alexjohnson"
                      />
                    </div>

                    <Button className="bg-gradient-to-r from-[#334e68] to-[#2563eb]">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </TabsContent>

                {/* Job Preferences Tab */}
                <TabsContent value="job" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Desired Job Title</Label>
                      <Input
                        id="jobTitle"
                        defaultValue="Senior Frontend Engineer"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="minSalary">Minimum Salary</Label>
                        <Input
                          id="minSalary"
                          type="number"
                          defaultValue="120000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxSalary">Maximum Salary</Label>
                        <Input
                          id="maxSalary"
                          type="number"
                          defaultValue="180000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobType">Job Type</Label>
                      <Select defaultValue="fulltime">
                        <SelectTrigger id="jobType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fulltime">Full-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="parttime">Part-time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workType">Work Type</Label>
                      <Select defaultValue="remote">
                        <SelectTrigger id="workType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="onsite">On-site</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="locations">Preferred Locations</Label>
                      <Input
                        id="locations"
                        defaultValue="San Francisco, New York, Remote"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Key Skills</Label>
                      <Textarea
                        id="skills"
                        rows={3}
                        defaultValue="React, TypeScript, Next.js, Tailwind CSS, Node.js"
                      />
                    </div>

                    <Button className="bg-gradient-to-r from-[#334e68] to-[#2563eb]">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
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
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-gray-900">
                                {item.label}
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.description}
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
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
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-gray-900">
                                {item.label}
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.description}
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="bg-gradient-to-r from-[#334e68] to-[#2563eb]">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input id="confirmPassword" type="password" />
                    </div>

                    <Button className="bg-gradient-to-r from-[#334e68] to-[#2563eb]">
                      Update Password
                    </Button>

                    <hr className="my-6" />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Two-Factor Authentication
                      </h3>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">
                            Enable 2FA
                          </p>
                          <p className="text-sm text-gray-600">
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
                      <h3 className="text-lg font-semibold mb-4">
                        Current Plan
                      </h3>
                      <Card className="bg-gradient-to-r from-[#334e68] to-[#2563eb] text-white border-0">
                        <CardHeader>
                          <CardTitle>Pro Plan</CardTitle>
                          <CardDescription className="text-white/80">
                            $29/month, billed monthly
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm mb-4">
                            Next billing date: February 15, 2024
                          </p>
                          <Button className="bg-white text-[#334e68] hover:bg-white/90">
                            Manage Plan
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Payment Method
                      </h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-8 bg-gradient-to-r from-[#334e68] to-[#2563eb] rounded flex items-center justify-center text-white text-xs font-bold">
                                VISA
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  •••• •••• •••• 4242
                                </p>
                                <p className="text-sm text-gray-600">
                                  Expires 12/25
                                </p>
                              </div>
                            </div>
                            <Button variant="outline">Update</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
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
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-gray-900">
                                {invoice.date}
                              </p>
                              <p className="text-sm text-gray-600">
                                {invoice.amount}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-green-600">
                                {invoice.status}
                              </span>
                              <Button variant="ghost" size="sm">
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
        </motion.div>
      </div>
    </div>
  );
}
