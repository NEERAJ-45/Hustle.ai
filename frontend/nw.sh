#!/usr/bin/env bash

# ===== AUTH GROUP =====
mkdir -p "app/(auth)/login"
mkdir -p "app/(auth)/signup"
touch "app/(auth)/login/page.tsx"
touch "app/(auth)/signup/page.tsx"

# ===== DASHBOARD GROUP =====
mkdir -p "app/(dashboard)/job-matches"
mkdir -p "app/(dashboard)/job-search"
mkdir -p "app/(dashboard)/applications"
mkdir -p "app/(dashboard)/resumes-cover-letters"
mkdir -p "app/(dashboard)/settings"

touch "app/(dashboard)/layout.tsx"
touch "app/(dashboard)/page.tsx"
touch "app/(dashboard)/job-matches/page.tsx"
touch "app/(dashboard)/job-search/page.tsx"
touch "app/(dashboard)/applications/page.tsx"
touch "app/(dashboard)/resumes-cover-letters/page.tsx"
touch "app/(dashboard)/settings/page.tsx"

# ===== MARKETING GROUP =====
mkdir -p "app/(marketing)"
touch "app/(marketing)/layout.tsx"
touch "app/(marketing)/page.tsx"
