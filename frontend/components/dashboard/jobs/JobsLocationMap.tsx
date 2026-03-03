"use client";

import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { divIcon, type LatLngBoundsExpression } from "leaflet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import type { JobsMapPoint } from "@/lib/api-client";

const INDIA_CENTER: [number, number] = [22.5937, 78.9629];
const INDIA_BOUNDS: LatLngBoundsExpression = [
  [6.0, 67.0],
  [37.8, 98.0],
];

interface JobsLocationMapProps {
  points: JobsMapPoint[];
  isLoading?: boolean;
  onSelectLocation?: (locationFilterValue: string) => void;
}

export default function JobsLocationMap({
  points,
  isLoading = false,
  onSelectLocation,
}: JobsLocationMapProps) {
  const sortedPoints = useMemo(
    () => [...points].sort((a, b) => b.totalJobs - a.totalJobs),
    [points],
  );

  const indiaPoints = useMemo(
    () =>
      sortedPoints.filter((point) =>
        point.location.country?.toLowerCase().includes("india"),
      ),
    [sortedPoints],
  );

  const visiblePoints = indiaPoints.length > 0 ? indiaPoints : sortedPoints;

  const markerIcon = useMemo(
    () =>
      divIcon({
        html: `<span style="display:flex;width:16px;height:16px;border-radius:9999px;background:#ef4444;border:2px solid #ffffff;box-shadow:0 2px 10px rgba(0,0,0,.35)"></span>`,
        className: "",
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      }),
    [],
  );

  if (isLoading) {
    return (
      <div className="h-full w-full rounded-md border bg-muted/20 p-4 text-sm text-muted-foreground">
        Loading location map...
      </div>
    );
  }

  if (visiblePoints.length === 0) {
    return (
      <div className="h-full w-full rounded-md border bg-muted/20 p-4 text-sm text-muted-foreground">
        No location points found for the current filters.
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-md border">
      <MapContainer
        center={INDIA_CENTER}
        zoom={5}
        minZoom={4}
        maxZoom={10}
        maxBounds={INDIA_BOUNDS}
        maxBoundsViscosity={0.9}
        scrollWheelZoom
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {visiblePoints.map((point, index) => {
          const { latitude, longitude } = point.location.coordinates;

          return (
            <Marker
              key={`${point.location.label}-${index}`}
              position={[latitude, longitude]}
              icon={markerIcon}
            >
              <Popup minWidth={260}>
                <div className="space-y-2">
                  <p className="text-sm font-semibold flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {point.location.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {point.totalJobs} jobs at this location
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() =>
                      onSelectLocation?.(
                        point.location.city ||
                          point.location.state ||
                          point.location.country ||
                          point.location.label,
                      )
                    }
                  >
                    Filter by this location
                  </Button>

                  <div className="space-y-2 max-h-48 overflow-auto pr-1">
                    {point.jobs.slice(0, 4).map((job) => {
                      const target =
                        job.applicationUrl?.startsWith("http") ||
                        job.applicationUrl?.startsWith("mailto:")
                          ? job.applicationUrl
                          : `${window.location.origin}${job.applicationUrl}`;

                      return (
                        <div key={job.id} className="rounded-md border p-2">
                          <p className="text-xs font-medium line-clamp-2">
                            {job.title}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {job.companyName || "Unknown Company"}
                          </p>
                          <div className="mt-1 flex items-center gap-1 flex-wrap">
                            <Badge variant="outline" className="text-[10px]">
                              {job.jobType || "N/A"}
                            </Badge>
                            <Badge variant="secondary" className="text-[10px]">
                              {job.isRemote
                                ? "Remote"
                                : job.workArrangement || "On-site"}
                            </Badge>
                          </div>
                          <a
                            href={target}
                            target={
                              target.startsWith("mailto:") ? "_self" : "_blank"
                            }
                            rel="noopener noreferrer"
                            className="mt-1 inline-block text-xs text-blue-600 hover:underline"
                          >
                            Open Application
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
