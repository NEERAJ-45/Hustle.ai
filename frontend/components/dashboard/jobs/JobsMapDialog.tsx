"use client";

import dynamic from "next/dynamic";
import type { JobsMapPoint } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const JobsLocationMap = dynamic(
  () => import("@/components/dashboard/jobs/JobsLocationMap"),
  {
    ssr: false,
  },
);

interface JobsMapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mapLocationInput: string;
  onMapLocationInputChange: (value: string) => void;
  locationTerm: string;
  onApplyLocation: () => void;
  onClearLocation: () => void;
  mapPoints: JobsMapPoint[];
  isMapDataLoading: boolean;
  onSelectLocation: (selectedLocation: string) => void;
}

export function JobsMapDialog({
  open,
  onOpenChange,
  mapLocationInput,
  onMapLocationInputChange,
  locationTerm,
  onApplyLocation,
  onClearLocation,
  mapPoints,
  isMapDataLoading,
  onSelectLocation,
}: JobsMapDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[96vw]">
        <DialogHeader>
          <DialogTitle>Location Map</DialogTitle>
          <DialogDescription>
            Explore the map and apply a location filter to your job search.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={mapLocationInput}
            onChange={(event) => onMapLocationInputChange(event.target.value)}
            placeholder="Type a city, state, or country"
          />
          <Button type="button" onClick={onApplyLocation}>
            Apply Location
          </Button>
          {locationTerm ? (
            <Button type="button" variant="outline" onClick={onClearLocation}>
              Clear
            </Button>
          ) : null}
        </div>

        <div className="mt-2 h-[65vh] w-full overflow-hidden rounded-md">
          <JobsLocationMap
            points={mapPoints}
            isLoading={isMapDataLoading}
            onSelectLocation={onSelectLocation}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
