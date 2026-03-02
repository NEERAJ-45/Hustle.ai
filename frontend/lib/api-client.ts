import { getSession } from "next-auth/react";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export interface DashboardData {
  stats: {
    jobMatches: number;
    applicationsSent: number;
    interviews: number;
    offers: number;
  };
  matches: {
    total: number;
    applied: number;
    saved: number;
  };
  applications: {
    total: number;
    submitted: number;
    interviews: number;
    offers: number;
  };
  profile: {
    completionScore: number;
  };
  interviews: Array<{
    id: string;
    title: string;
    company: string;
    scheduledAt: string;
    type: string;
    status: string;
    location: string;
  }>;
  jobMatchesList: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    match: number;
    posted: string;
    status: string;
  }>;
  applicationsList: Array<{
    id: string;
    job: string;
    status: string;
    date: string;
    stage: string;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CurrentUser {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  profile?: {
    phone?: string;
    bio?: string;
    location?: {
      city?: string;
      state?: string;
      country?: string;
    };
    skills?: Array<{
      name: string;
      proficiency?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
      yearsOfExperience?: number;
    }>;
  };
  preferences?: {
    jobTypes?: string[];
    workArrangements?: string[];
    salaryRange?: {
      min?: number;
      max?: number;
      currency?: string;
    };
  };
  settings?: {
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    autoApplyEnabled?: boolean;
    profileVisibility?: "Public" | "Private";
  };
}

export interface JobListItem {
  _id: string;
  title: string;
  company?: {
    name?: string;
  };
  location?: {
    city?: string;
    state?: string;
    country?: string;
    isRemote?: boolean;
  };
  jobType?: string;
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
    period?: string;
  };
  postedDate?: string;
  requiredSkills?: Array<{
    name?: string;
  }>;
}

export interface JobDetailedJD {
  companyName: string;
  companyLogo: string;
  companyWebsite: string;
  backToOpeningsLabel: string;
  title: string;
  subtitle: string;
  roleTitle: string;
  experienceRange: string;
  experienceDetails: string[];
  locationText: string;
  responsibilities: string[];
  specifications: string[];
  aboutCompany: string;
  aboutHighlights: string[];
  shareText: string;
  poweredBy: string;
}

export interface JobDetailsItem extends JobListItem {
  detailedJD: JobDetailedJD;
}

export interface JobsPageResponse {
  data: JobListItem[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export interface ResumeListItem {
  _id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  isDefault?: boolean;
  extractedData?: {
    keywords?: string[];
  };
  stats?: {
    timesUsed?: number;
    successRate?: number;
  };
}

interface PaginatedApiResponse<T> extends ApiResponse<T> {
  meta?: {
    total?: number;
    page?: number;
    totalPages?: number;
  };
}

async function getAuthToken(): Promise<string | null> {
  const session = await getSession();
  return (session?.user as any)?.token || null;
}

async function authenticatedFetch(path: string, init?: RequestInit) {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("No backend auth token found. Please sign out and sign in again.");
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });

  return response;
}

export async function fetchDashboard(): Promise<DashboardData> {
  const response = await authenticatedFetch("/api/v1/dashboard", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard: ${response.statusText}`);
  }

  const result: ApiResponse<DashboardData> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to load dashboard");
  }

  return result.data;
}

export async function fetchCurrentUser(): Promise<CurrentUser> {
  const response = await authenticatedFetch("/api/v1/users/me", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user profile: ${response.statusText}`);
  }

  const result: ApiResponse<CurrentUser> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to load user profile");
  }

  return result.data;
}

export async function updateCurrentUser(
  payload: Partial<CurrentUser>,
): Promise<CurrentUser> {
  const response = await authenticatedFetch("/api/v1/users/me", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to update user profile: ${response.statusText}`);
  }

  const result: ApiResponse<CurrentUser> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to update user profile");
  }

  return result.data;
}

export async function fetchJobs(params?: {
  search?: string;
  location?: string;
  page?: number;
  limit?: number;
}): Promise<JobListItem[]> {
  const result = await fetchJobsPaginated(params);
  return result.data;
}

export async function fetchJobById(id: string): Promise<JobDetailsItem> {
  const response = await fetch(`${BASE_URL}/api/v1/jobs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch job details: ${response.statusText}`);
  }

  const result: ApiResponse<JobDetailsItem> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to load job details");
  }

  return result.data;
}

export async function fetchJobsPaginated(params?: {
  search?: string;
  location?: string;
  page?: number;
  limit?: number;
  isRemote?: boolean;
}): Promise<JobsPageResponse> {
  const query = new URLSearchParams();

  if (params?.search) query.set("search", params.search);
  if (params?.location) query.set("location", params.location);
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (typeof params?.isRemote === "boolean") {
    query.set("isRemote", String(params.isRemote));
  }

  const path = query.toString()
    ? `/api/v1/jobs?${query.toString()}`
    : "/api/v1/jobs";

  const response = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.statusText}`);
  }

  const result: PaginatedApiResponse<JobListItem[]> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to load jobs");
  }

  return {
    data: result.data || [],
    meta: {
      total: result.meta?.total ?? 0,
      page: result.meta?.page ?? params?.page ?? 1,
      totalPages: result.meta?.totalPages ?? 1,
    },
  };
}

export async function fetchResumes(): Promise<ResumeListItem[]> {
  const response = await authenticatedFetch("/api/v1/resumes", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch resumes: ${response.statusText}`);
  }

  const result: PaginatedApiResponse<ResumeListItem[]> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to load resumes");
  }

  return result.data || [];
}
