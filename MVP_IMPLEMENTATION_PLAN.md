# Luvid MVP Implementation Plan

This document outlines the step-by-step implementation plan for the Luvid MVP (Minimum Viable Product), based on the [Service Plan](SERVICE_PLAN.md), [Design Guidelines](.agent/rules/design-guidelines.md), and [Development Guide](.agent/rules/development-guide.md).

**Goal**: Successfully implement the "Personal User Manual" (Core Feature 1) and "Love ID Card" with a "Ready-to-Date" focus.

---

## Phase 1: Foundation & Architecture Setup

### 1.1 Project Initialization

- [ ] **Initialize Next.js Project**
  - Verify App Router is enabled.
  - Configure `src/` directory structure.
  - Setup `birome` or preferred linting/formatting tools.
- [ ] **Directory Structure Enforcement (Feature-Sliced)**
  - Create `/src/features`, `/src/shared`, `/src/app`.
  - Define strict module boundaries.
- [ ] **Test Environment Setup (TDD)**
  - Install `Vitest` and `React Testing Library`.
  - Configure test aliases to match `tsconfig.json`.
  - Create a sample `sum.test.ts` to verify the TDD workflow.

### 1.2 Design System Implementation

_Ref: [Design Guidelines](.agent/rules/design-guidelines.md)_

- [ ] **Tailwind Configuration**
  - Define Color Palette: `Pastel Rose` (Primary), `Pastel Violet` (Secondary), `Pastel Amber` (Accent).
  - Configure Fonts: `Nunito` (Headings), `Geist Sans` (Body).
  - Define Border Radius (`rounded-2xl`, `rounded-3xl`) and Shadows.
- [ ] **Shared UI Primitives (`src/shared/components`)**
  - **`Card`**: The fundamental building block (White, Soft Shadow, Rounded).
  - **`Button`**: Pill-shaped, Gradient/Solid variants.
  - **`Input/Textarea`**: Soft borders, accessible focus rings.
  - **`ProgressBar`**: For "User Manual" completion tracking.
  - **`Tag/Chip`**: For displaying values/keywords.
- [ ] **Layout Components**
  - **`AppLayout`**: Sidebar (Desktop) / Bottom Nav (Mobile) + Main Content Area.

---

## Phase 2: Feature - Personal User Manual (Core)

_Ref: [Service Plan - Section 3](SERVICE_PLAN.md#3-핵심-기능-i-나-사용-설명서-personal-user-manual)_
_Dev Strategy: TDD for Logic -> UI Implementation_

### 2.1 Domain Modeling & Logic (TDD)

- [ ] **Define Data Models (`src/features/user-manual/model`)**
  - Types for: `MaintenanceGuide`, `ConflictStyle`, `LoveMap`, `UserValues`.
  - Zod schemas for validation.
- [ ] **Implement Logic & Persistence (`src/features/user-manual/actions`)**
  - **Test**: Create `saveManualSection.spec.ts` (Red).
  - **Implement**: Server Actions to save/update manual sections (Green).
  - **Refactor**: Optimize validation and error handling.

### 2.2 UI Implementation

- [ ] **Manual Creation Flow (Wizard)**
  - **Step 1: Maintenance Guide**: Inputs for Baseline, Warning Signs, Recovery Protocol.
  - **Step 2: Communication**: Inputs for Conflict Style, Apology Language.
  - **Step 3: Love Map**: Inputs for Non-Negotiables, Joy Triggers.
- [ ] **Manual Viewer (Dashboard)**
  - Read-only view of the completed manual using `Card` components.
  - "Edit" mode toggle.

---

## Phase 3: Feature - Love ID Card & Compatibility

_Ref: [Service Plan - Section 7 / Appendix](SERVICE_PLAN.md#1-차-mvp-구현-계획)_

### 3.1 Love ID Card

- [ ] **Card Generation Logic**
  - Extract key traits (Keywords) from the User Manual.
  - **Test**: `generateCardData.spec.ts` - ensure correct keywords are picked.
- [ ] **Love ID UI Component**
  - Design a "Trading Card" style component.
  - Display: Nickname, Key Traits, "Ready-to-Date" Badge, Emotional Availability Level.

### 3.2 Compatibility Engine (TDD)

- [ ] **Scoring Algorithm (`src/features/matching/utils`)**
  - **Test**: `calculateCompatibility.spec.ts` (Red).
    - Scenario: Match high "Independence" need with "Clingy" attachment (Expect Low Score).
    - Scenario: Match aligned "Values" (Expect High Score).
  - **Implement**: Weighted scoring logic based on `UserValues` and `Non-Negotiables`.
- [ ] **Conversation Starters (`src/features/matching/utils`)**
  - Logic to suggest questions based on gaps/matches in two manuals.

### 3.3 Matching UI

- [ ] **Comparison View**
  - Side-by-side view of two Love ID Cards.
  - Compatibility Score visualization.
  - "Recommended Topics" section.

---

## Phase 4: Integration & Refinement

### 4.1 Onboarding & Flow

- [ ] **Landing Page**: Value proposition focused on "Ready-to-Date".
- [ ] **Auth Integration**: Simple storage or Auth (Clerk/Auth.js) depending on backend decision.
  - _MVP Assumption_: LocalStorage or minimal DB for initial prototype if strictly frontend.

### 4.2 Polish

- [ ] **Micro-animations**: Framer Motion for card transitions.
- [ ] **Empty States**: "Empty Dashboard" placeholders.
- [ ] **Mobile Responsiveness Check**: Verify Sidebar converts to Bottom Nav.

---

## Execution Checklist (Summary)

- [ ] **Setup**: Project & TDD Env
- [ ] **Design**: Theme & Primitives
- [ ] **Feat 1**: User Manual (Model -> Logic -> UI)
- [ ] **Feat 2**: Love ID (Logic -> UI)
- [ ] **Feat 3**: Compatibility (Algo -> UI)
