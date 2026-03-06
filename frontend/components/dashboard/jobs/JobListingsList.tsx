"use client";

import { useState } from "react";
import { JobsMapDialog } from "@/components/dashboard/jobs/JobsMapDialog";
import { JobsSidebar } from "@/components/dashboard/jobs/JobsSidebar";
import { JobsStatsCards } from "@/components/dashboard/jobs/JobsStatsCards";
import { JobDetailsDialog } from "@/components/dashboard/jobs/JobDetailsDialog";
import { JobsMatchesPanel } from "@/components/dashboard/jobs/JobsMatchesPanel";
import { useJobDetailsModal } from "@/components/dashboard/jobs/useJobDetailsModal";
import { usePaginatedJobs } from "@/components/dashboard/jobs/usePaginatedJobs";
import { useSavedJobs } from "@/components/dashboard/jobs/useSavedJobs";

export default function JobsPage() {
  const [mapLocationInput, setMapLocationInput] = useState("");
  const [isMapOpen, setIsMapOpen] = useState(false);

  const { savedJobIds, savedJobIdsSet, toggleSave } = useSavedJobs();
  const { jobDetailsModal, handleViewDetails, setDetailsOpen } =
    useJobDetailsModal();

  const {
    activeTab,
    setActiveTab,
    searchInput,
    setSearchInput,
    locationTerm,
    setLocationTerm,
    pageSize,
    setPageSize,
    currentPage,
    displayTotalPages,
    displayTotalJobs,
    currentPageJobs,
    stats,
    chartData,
    matchMetrics,
    error,
    isLoading,
    isLoadingMore,
    jobsMetadata,
    mapPoints,
    mapSummary,
    isMapDataLoading,
    loadMoreRef,
    handleNextPage,
    handlePreviousPage,
    resetFilters,
  } = usePaginatedJobs(savedJobIdsSet, savedJobIds.length, isMapOpen);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-linear-to-r from-primary/10 via-primary/5 to-background border-b"></div>

      <div className="container mx-auto px-4 py-6">
        <JobsStatsCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <JobsMatchesPanel
              activeTab={activeTab}
              onActiveTabChange={setActiveTab}
              searchInput={searchInput}
              onSearchInputChange={setSearchInput}
              onOpenLocationMap={() => {
                setMapLocationInput(locationTerm);
                setIsMapOpen(true);
              }}
              onResetFilters={() => {
                resetFilters();
                setMapLocationInput("");
              }}
              locationTerm={locationTerm}
              jobsMetadata={jobsMetadata}
              mapSummary={mapSummary}
              error={error}
              isLoading={isLoading}
              currentPageJobs={currentPageJobs}
              onViewDetails={handleViewDetails}
              savedJobIds={savedJobIdsSet}
              onToggleSave={toggleSave}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              currentPage={currentPage}
              displayTotalPages={displayTotalPages}
              displayTotalJobs={displayTotalJobs}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
              isLoadingMore={isLoadingMore}
              loadMoreRef={loadMoreRef}
            />
          </div>

          <JobsSidebar chartData={chartData} matchMetrics={matchMetrics} />
        </div>
      </div>

      <JobsMapDialog
        open={isMapOpen}
        onOpenChange={setIsMapOpen}
        mapLocationInput={mapLocationInput}
        onMapLocationInputChange={setMapLocationInput}
        locationTerm={locationTerm}
        onApplyLocation={() => {
          setLocationTerm(mapLocationInput.trim());
          setIsMapOpen(false);
        }}
        onClearLocation={() => {
          setMapLocationInput("");
          setLocationTerm("");
        }}
        mapPoints={mapPoints}
        isMapDataLoading={isMapDataLoading}
        onSelectLocation={(selectedLocation) => {
          setMapLocationInput(selectedLocation);
          setLocationTerm(selectedLocation);
          setIsMapOpen(false);
        }}
      />

      <JobDetailsDialog state={jobDetailsModal} onOpenChange={setDetailsOpen} />
    </div>
  );
}
