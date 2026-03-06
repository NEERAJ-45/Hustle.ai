"use client";

import { create } from "zustand";

type DashboardJobsUiState = {
  activeTab: string;
  searchInput: string;
  searchTerm: string;
  locationTerm: string;
  pageSize: number;
  currentPage: number;
  setActiveTab: (value: string) => void;
  setSearchInput: (value: string) => void;
  setSearchTerm: (value: string) => void;
  setLocationTerm: (value: string) => void;
  setPageSize: (value: number) => void;
  setCurrentPage: (value: number) => void;
  resetFilters: () => void;
};

export const useDashboardJobsUiStore = create<DashboardJobsUiState>((set) => ({
  activeTab: "all",
  searchInput: "",
  searchTerm: "",
  locationTerm: "",
  pageSize: 10,
  currentPage: 1,
  setActiveTab: (value) => set({ activeTab: value, currentPage: 1 }),
  setSearchInput: (value) => set({ searchInput: value }),
  setSearchTerm: (value) => set({ searchTerm: value }),
  setLocationTerm: (value) => set({ locationTerm: value, currentPage: 1 }),
  setPageSize: (value) => set({ pageSize: value, currentPage: 1 }),
  setCurrentPage: (value) => set({ currentPage: value }),
  resetFilters: () => set({ searchInput: "", searchTerm: "", locationTerm: "", currentPage: 1 }),
}));
