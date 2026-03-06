"use client";

import {
  useEffect,
  useMemo,
  lazy,
  Suspense
}

from "react";

import {
  useShallow
}

from "zustand/react/shallow";

import {
  useDashboardApplicationsStore
}

from "@/store/dashboard-applications-store";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
}

from "@/components/ui/card";

import {
  Badge
}

from "@/components/ui/badge";

import {
  Button
}

from "@/components/ui/button";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
}

from "@/components/ui/tabs";

import {
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  FileText,
  Send,
  Eye,
  BarChart3,
  MessageSquare,
}

from "lucide-react";

import {
  AnimatedNumber
}

from "@/components/ui/animated-number";

const LazyApplicationsChart=lazy(()=> import("./ApplicationsChart"));

const getStatusColor=(status: string)=> {
  const normalized=status.toLowerCase();
  if (normalized.includes("offer")) return "green";
  if (normalized.includes("interview")) return "blue";
  if (normalized.includes("reject")) return "red";
  return "amber";
}

;

export default function ApplicationsPage() {
  const {
    dashboardData,
    isLoading,
    error,
    loadDashboard
  }

  =useDashboardApplicationsStore(useShallow((state)=> ( {
          dashboardData: state.dashboardData,
          isLoading: state.isLoading,
          error: state.error,
          loadDashboard: state.loadDashboard,
        }

      )),
  );

  useEffect(()=> {
      void loadDashboard();
    }

    , [loadDashboard]);

  const applications=dashboardData?.applicationsList || [];

  const stats=useMemo(()=> {
      const total=dashboardData?.applications.total || 0;
      const interviews=dashboardData?.applications.interviews || 0;
      const offers=dashboardData?.applications.offers || 0;
      const rejected=applications.filter((app)=> app.status.toLowerCase().includes("reject"),
      ).length;

      return {
        total,
        active: Math.max(total - offers - rejected, 0),
        interviews,
        offers,
        rejected,
      }

      ;
    }

    , [applications, dashboardData]);

  const chartData=useMemo(()=> {
      const monthBuckets=Array.from( {
          length: 6
        }

        , (_, index)=> {
          const date=new Date();
          date.setMonth(date.getMonth() - (5 - index));

          const key=`$ {
            date.getFullYear()
          }

          -$ {
            date.getMonth()
          }

          `;

          return {

            key,
            month: date.toLocaleString("en-US", {
                month: "short"
              }

            ),
            applications: 0,
            interviews: 0,
            offers: 0,
          }

          ;
        }

      );

      const monthMap=new Map(monthBuckets.map((bucket)=> [bucket.key, bucket]),
      );

      for (const item of applications) {
        const date=new Date(item.date);
        if (Number.isNaN(date.getTime())) continue;

        const key=`$ {
          date.getFullYear()
        }

        -$ {
          date.getMonth()
        }

        `;
        const bucket=monthMap.get(key);
        if ( !bucket) continue;

        bucket.applications +=1;

        const status=item.status.toLowerCase();
        if (status.includes("interview")) bucket.interviews +=1;
        if (status.includes("offer")) bucket.offers +=1;
      }

      return monthBuckets;
    }

    , [applications]);

  const successMetrics=useMemo(()=> {
      const total=Math.max(stats.total, 1);
      const responseRate=Math.round(((dashboardData?.applications.submitted || 0) / total) * 100,
      );
      const interviewRate=Math.round((stats.interviews / total) * 100);
      const offerRate=Math.round((stats.offers / total) * 100);

      return [ {
        label: "Response Rate", value: responseRate, color: "bg-blue-500"
      }

      ,
        {
        label: "Interview Rate", value: interviewRate, color: "bg-green-500"
      }

      ,
        {
        label: "Offer Rate", value: offerRate, color: "bg-purple-500"
      }

      ,
      ];
    }

    , [dashboardData, stats]);

  return (<div className="min-h-screen bg-gray-50"> <div className="bg-linear-to-r from-[#334e68] to-[#2563eb] text-white"> <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"> <div> <h1 className="text-4xl font-bold mb-2">Applications</h1> <p className="text-white/80"> Track and manage all your job applications in one place </p> </div> </div> </div> <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"> {
      error ? (<div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"> {
          error
        }

        </div>) : null
    }

      {
      /* Stats Grid */
    }

    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"> {
      [ {
        label: "Total",
        value: stats.total,
        icon: Send,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      }

      ,
        {
        label: "Active",
        value: stats.active,
        icon: Clock,
        color: "text-amber-600",
        bgColor: "bg-amber-100",
      }

      ,
        {
        label: "Interviews",
        value: stats.interviews,
        icon: Calendar,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
      }

      ,
        {
        label: "Offers",
        value: stats.offers,
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-100",
      }

      ,
        {
        label: "Rejected",
        value: stats.rejected,
        icon: XCircle,
        color: "text-red-600",
        bgColor: "bg-red-100",
      }

      ,
      ].map((stat)=> (<div key= {
            stat.label
          }

          > <Card> <CardContent className="p-4"> <div className="text-center"> <div className= {
            `w-12 h-12 rounded-xl $ {
              stat.bgColor
            }

            flex items-center justify-center mx-auto mb-3`
          }

          > <stat.icon className= {
            `w-6 h-6 $ {
              stat.color
            }

            `
          }

          /> </div> <p className="text-3xl font-bold text-gray-900 mb-1"> <AnimatedNumber value= {
            stat.value
          }

          /> </p> <p className="text-sm text-gray-600"> {
            stat.label
          }

          </p> </div> </CardContent> </Card> </div>))
    }

    </div> <div className="grid lg:grid-cols-3 gap-6"> {
      /* Applications List */
    }

    <div className="lg:col-span-2 space-y-6"> <div> <Card> <CardHeader> <CardTitle>Your Applications</CardTitle> </CardHeader> <CardContent> <Tabs defaultValue="all"> <TabsList className="grid w-full grid-cols-4 mb-6"> <TabsTrigger value="all">All</TabsTrigger> <TabsTrigger value="active">Active</TabsTrigger> <TabsTrigger value="interviews">Interviews</TabsTrigger> <TabsTrigger value="offers">Offers</TabsTrigger> </TabsList> <TabsContent value="all"className="space-y-4"> {
      isLoading ? (<div className="text-sm text-gray-500"> Loading applications... </div>) : null
    }

      {
       !isLoading && applications.length===0 ? (<div className="text-sm text-gray-500"> No applications available. </div>) : null
    }

      {
      applications.map((app)=> (<div key= {
            app.id
          }

          className="border border-gray-200 rounded-lg p-4 hover:border-[#2563eb] transition-colors"

          > <div className="flex items-start justify-between mb-3"> <div className="flex-1"> <h3 className="font-semibold text-gray-900 mb-1"> {
            app.job
          }

          </h3> <div className="flex items-center gap-2 text-sm text-gray-500 mb-3"> <Calendar className="w-4 h-4"/> Applied {
            " "
          }

            {
            new Date(app.date).toLocaleDateString()
          }

          <span className="mx-2">•</span> Updated {
            " "
          }

            {
            new Date(app.date).toLocaleDateString()
          }

          </div> </div> <Badge className= {
            getStatusColor(app.status)==="green"
            ? "bg-green-100 text-green-700"
            : getStatusColor(app.status)==="blue"
            ? "bg-blue-100 text-blue-700"
            : getStatusColor(app.status)==="amber"
            ? "bg-amber-100 text-amber-700"
            : "bg-red-100 text-red-700"
          }

          > {
            app.status
          }

          </Badge> </div> <div className="bg-gray-50 rounded-lg p-3 mb-3"> <div className="flex items-center gap-2 text-sm"> <TrendingUp className="w-4 h-4 text-gray-600"/> <span className="font-medium text-gray-700"> Current Stage: </span> <span className="text-gray-600"> {
            app.stage
          }

          </span> </div> <div className="flex items-center gap-2 text-sm mt-2"> <Clock className="w-4 h-4 text-gray-600"/> <span className="font-medium text-gray-700"> Next Step: </span> <span className="text-gray-600"> {
            app.stage
          }

          </span> </div> </div> <div className="flex items-center gap-2"> <Button size="sm"
          variant="outline"
          className="flex-1 bg-transparent"
          > <FileText className="w-4 h-4 mr-2"/> View Details </Button> <Button size="sm"
          variant="outline"
          className="flex-1 bg-transparent"
          > <MessageSquare className="w-4 h-4 mr-2"/> Contact </Button> </div> </div>))
    }

    </TabsContent> </Tabs> </CardContent> </Card> </div> </div> {
      /* Chart & Stats Sidebar */
    }

    <div className="space-y-6"> {
      /* Progress Chart */
    }

    <Suspense fallback= {
      <Card className="h-80 animate-pulse bg-gray-100"/>
    }

    > <LazyApplicationsChart chartData= {
      chartData
    }

    successMetrics= {
      successMetrics
    }

    /> </Suspense> {
      /* Quick Actions */
    }

    <Card> <CardHeader> <CardTitle>Quick Actions</CardTitle> </CardHeader> <CardContent className="space-y-2"> <Button variant="outline"
    className="w-full justify-start bg-transparent"
    > <Eye className="w-4 h-4 mr-2"/> View All Applications </Button> <Button variant="outline"
    className="w-full justify-start bg-transparent"
    > <Calendar className="w-4 h-4 mr-2"/> Schedule Interview </Button> <Button variant="outline"
    className="w-full justify-start bg-transparent"
    > <FileText className="w-4 h-4 mr-2"/> Export Report </Button> </CardContent> </Card> </div> </div> </div> </div>);
}