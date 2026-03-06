"use client";

import type { RefObject } from "react";
import { ChevronLeft, ChevronRight, MapPin, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PAGE_SIZE_OPTIONS } from "@/components/dashboard/jobs/constants";
import { JobListingsCards } from "@/components/dashboard/jobs/JobListingsCards";
import type { JobsQueryMetadata } from "@/lib/api-client";
import type { JobListing, MapSummary } from "@/components/dashboard/jobs/types";

interface JobsMatchesPanelProps {
  activeTab: string;
  onActiveTabChange: (value: string) => void;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onOpenLocationMap: () => void;
  onResetFilters: () => void;
  locationTerm: string;
  jobsMetadata: JobsQueryMetadata | null;
  mapSummary: MapSummary | null;
  error: string | null;
  isLoading: boolean;
  currentPageJobs: JobListing[];
  onViewDetails: (jobId: string) => void;
  savedJobIds: Set<string>;
  onToggleSave: (jobId: string) => void;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
  currentPage: number;
  displayTotalPages: number;
  displayTotalJobs: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  isLoadingMore: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
}

export function JobsMatchesPanel({
  activeTab,
  onActiveTabChange,
  searchInput,
  onSearchInputChange,
  onOpenLocationMap,
  onResetFilters,
  locationTerm,
  jobsMetadata,
  mapSummary,
  error,
  isLoading,
  currentPageJobs,
  onViewDetails,
  savedJobIds,
  onToggleSave,
  pageSize,
  onPageSizeChange,
  currentPage,
  displayTotalPages,
  displayTotalJobs,
  onPreviousPage,
  onNextPage,
  isLoadingMore,
  loadMoreRef,
}: JobsMatchesPanelProps) {
  const renderTabContent = () => {
    if (error) {
      return <div className="py-6 text-sm text-destructive">{error}</div>;
    }

    if (isLoading) {
      return (
        <div className="py-6 text-sm text-muted-foreground">
          Loading jobs...
        </div>
      );
    }

    return (
      <JobListingsCards
        data={currentPageJobs}
        onViewDetails={onViewDetails}
        savedJobIds={savedJobIds}
        onToggleSave={onToggleSave}
      />
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-xl">Your Job Matches</CardTitle>
        </CardHeader>
        <div className="mb-4 space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative sm:w-72">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchInput}
                onChange={(event) => onSearchInputChange(event.target.value)}
                placeholder="Search jobs, companies, or skills"
                className="h-8 pl-8 text-sm"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onOpenLocationMap}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Location
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
            >
              Reset
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {locationTerm ? (
              <Badge variant="outline" className="gap-1 text-xs">
                <MapPin className="h-3 w-3" />
                {locationTerm}
              </Badge>
            ) : (
              <span>No location filter</span>
            )}
            {jobsMetadata?.topLocations?.[0] ? (
              <span>Top location: {jobsMetadata.topLocations[0].name}</span>
            ) : null}
            {mapSummary ? (
              <span>
                Map points: {mapSummary.totalMarkers} • Jobs mapped:{" "}
                {mapSummary.totalJobs}
              </span>
            ) : null}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={onActiveTabChange}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="best">Best Match</TabsTrigger>
            <TabsTrigger value="remote">Remote</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          <TabsContent value="all">{renderTabContent()}</TabsContent>
          <TabsContent value="best">{renderTabContent()}</TabsContent>
          <TabsContent value="remote">{renderTabContent()}</TabsContent>
          <TabsContent value="saved">{renderTabContent()}</TabsContent>
        </Tabs>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Jobs per page</span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger size="sm" className="w-22">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Page {currentPage} of {displayTotalPages} • {displayTotalJobs}{" "}
              jobs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPreviousPage}
              disabled={currentPage <= 1 || isLoading}
            >
              <ChevronLeft className="h-3.5 w-3.5 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onNextPage}
              disabled={
                currentPage >= displayTotalPages ||
                isLoading ||
                (activeTab !== "saved" && isLoadingMore)
              }
            >
              Next
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>

        <div ref={loadMoreRef} className="h-1" />
        {isLoadingMore ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Lazy loading more jobs...
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
