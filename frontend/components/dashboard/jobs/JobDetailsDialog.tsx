"use client";

import {
  Loader2,
  Link2,
  Linkedin,
  Mail,
  MessageCircle,
  Share2,
} from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { JobDetailsModalState } from "@/components/dashboard/jobs/types";

interface JobDetailsDialogProps {
  state: JobDetailsModalState;
  onOpenChange: (open: boolean) => void;
}

export function JobDetailsDialog({
  state,
  onOpenChange,
}: JobDetailsDialogProps) {
  const getShareData = () => {
    if (!state.details) return null;

    const baseUrl =
      typeof window !== "undefined"
        ? new URL(window.location.href)
        : new URL("http://localhost:3000/dashboard/jobs");

    if (state.jobId) {
      baseUrl.searchParams.set("jobId", state.jobId);
    }

    const url = baseUrl.toString();
    const text = `Check out this opening: ${state.details.title} at ${state.details.companyName}`;

    return { url, text };
  };

  const openShareUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleShareWhatsApp = () => {
    const share = getShareData();
    if (!share) return;
    openShareUrl(
      `https://wa.me/?text=${encodeURIComponent(`${share.text}\n${share.url}`)}`,
    );
  };

  const handleShareEmail = () => {
    const share = getShareData();
    if (!share) return;
    window.location.href = `mailto:?subject=${encodeURIComponent(share.text)}&body=${encodeURIComponent(`${share.text}\n\n${share.url}`)}`;
  };

  const handleShareLinkedIn = () => {
    const share = getShareData();
    if (!share) return;
    openShareUrl(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(share.url)}`,
    );
  };

  const handleShareX = () => {
    const share = getShareData();
    if (!share) return;
    openShareUrl(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(share.text)}&url=${encodeURIComponent(share.url)}`,
    );
  };

  const handleCopyShareLink = async () => {
    const share = getShareData();
    if (!share) return;

    if (!navigator?.clipboard) {
      toast.error("Clipboard is not available on this browser.");
      return;
    }

    try {
      await navigator.clipboard.writeText(share.url);
      toast.success("Link copied to clipboard.");
    } catch {
      toast.error("Failed to copy link. Please try again.");
    }
  };

  const handleShareOther = async () => {
    const share = getShareData();
    if (!share) return;

    if (navigator.share) {
      await navigator.share({
        title: state.details?.title,
        text: share.text,
        url: share.url,
      });
      return;
    }

    await handleCopyShareLink();
  };

  return (
    <Dialog open={state.isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[96vw] min-w-[50vw] min-h-[50vh] max-h-[95vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>Job Details</DialogTitle>
          <DialogDescription>
            Detailed job description and company information
          </DialogDescription>
        </DialogHeader>

        {state.isLoading ? (
          <div className="py-10 text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading job details...
          </div>
        ) : state.error ? (
          <div className="py-10 text-sm text-destructive">{state.error}</div>
        ) : state.details ? (
          <div className="space-y-6">
            <div className="space-y-1">
              {state.details.companyLogo ? (
                <img
                  src={state.details.companyLogo}
                  alt={`${state.details.companyName} logo`}
                  className="h-12 w-auto object-contain"
                />
              ) : null}
              <p className="font-semibold text-lg">
                {state.details.companyName}
              </p>
              <p className="text-sm text-muted-foreground">
                {state.details.companyWebsite}
              </p>
            </div>

            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => onOpenChange(false)}
            >
              {state.details.backToOpeningsLabel}
            </button>

            <div>
              <h2 className="text-2xl font-semibold">{state.details.title}</h2>
              <p className="text-muted-foreground mt-1">
                {state.details.subtitle}
              </p>
            </div>

            <div className="space-y-4 text-sm leading-6">
              <p>
                <span className="font-semibold">Role - </span>
                {state.details.roleTitle}
              </p>
              <p>
                <span className="font-semibold">Experience - </span>
                {state.details.experienceRange}
              </p>

              {state.details.experienceDetails?.length ? (
                <div>
                  <p className="font-semibold mb-2">Experience Details:</p>
                  <ul className="list-disc pl-5 space-y-1 max-h-40 overflow-y-auto pr-2">
                    {state.details.experienceDetails.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <p>
                <span className="font-semibold">Location - </span>
                {state.details.locationText}
              </p>

              <div>
                <p className="font-semibold mb-2">Job Description :</p>
                <ul className="list-disc pl-5 space-y-1">
                  {state.details.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Job Specifications:</p>
                <ul className="list-disc pl-5 space-y-1 max-h-56 overflow-y-auto pr-2">
                  {state.details.specifications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">
                  About {state.details.companyName}
                </p>
                <p>{state.details.aboutCompany}</p>
                {state.details.aboutHighlights?.length ? (
                  <ul className="list-disc pl-5 space-y-1 mt-3 max-h-40 overflow-y-auto pr-2">
                    {state.details.aboutHighlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-2">Website: {state.details.companyWebsite}</p>
              </div>
            </div>

            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => onOpenChange(false)}
            >
              {state.details.backToOpeningsLabel}
            </button>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {state.details.shareText}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleShareWhatsApp}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  WhatsApp
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleShareEmail}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleShareLinkedIn}
                >
                  <Linkedin className="h-4 w-4 mr-1" />
                  LinkedIn
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleShareX}
                >
                  X
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void handleCopyShareLink()}
                >
                  <Link2 className="h-4 w-4 mr-1" />
                  Copy Link
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void handleShareOther()}
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Other
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">powered by</p>
              <p className="text-sm font-medium">{state.details.poweredBy}</p>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
