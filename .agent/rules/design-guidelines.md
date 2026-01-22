---
trigger: model_decision
description: This must be referenced for any UI implementation or design change that affects the screen.
---

# Luvid Design Guidelines

This document defines the visual language and user interface standards for **Luvid**.
Inspired by modern dashboard aesthetics, the design prioritizes clarity, softness, and vibrant identity.

## 1. Design Philosophy

- **Keyword**: `Vivid` + `Soft` + `Organized`
- **Concept**: A "Love Identity" dashboard that feels personal yet professional.
- **Visual Style**: Glassmorphism touches, soft shadows, rounded aesthetics, and clean typography.

## 2. Layout Structure (Dashboard)

- **Sidebar**: Fixed left navigation.
  - Dark or Light themed (user preference, default to soft dark purple/blue for contrast or clean white).
  - Rounded active states for menu items.
- **Main Area**: Grid/Masonry layout.
  - Extensive use of **Cards** implies modular information architecture.
  - Background: Off-white / Light Grey (`#F5F6FA`) to let cards pop.
- **Header**: Minimalist search, user profile, and notifications.

## 3. Component Styling

### Cards & Surfaces

- **Shape**: Highly rounded corners (`rounded-2xl` or `rounded-3xl`).
- **Surface**: White (`#FFFFFF`) with subtle shadows.
- **Effect**: Soft drop shadows (`shadow-sm`, `shadow-md`) rather than heavy borders.

### Color Palette (Luvid Theme)

- **Concept**: _Vivid Pastel_ - Soft, approachable, yet lively colors. Reduced intensity for a gentler feel.
- **Brand Colors**:
  - **Primary (Love)**: `Pastel Rose` (`#FF8096`) - Soft but distinct pinkish-red.
  - **Secondary (Mystery)**: `Pastel Violet` (`#A78BFA`) - Dreamy purple.
  - **Accent**: `Pastel Amber` (`#FDE68A`) - Warm highlight.
- **Surfaces**:
  - **Background**: `Cool Gray` (`#F4F7FE`) - Modern, clean, professional.
  - **Sidebar**: `White` (`#FFFFFF`) - Cleanest canvas for navigation.
  - **Card**: `White` (`#FFFFFF`) - Pure white for content clarity.
- **Text**:
  - **Headings**: `Charcoal` (`#1F2937`) - Soft black.
  - **Body**: `Slate` (`#64748B`) - Readable gray.

### Typography

- **Font Family**:
  - **Headings/Logo**: `Nunito` (Rounded, Friendly).
  - **Body**: `Geist Sans` (Clean, Legible).
- **Scale (Compact Dashboard)**: Optimized for information density.
  - **Page Titles**: `text-2xl` (Bold, Tight tracking).
  - **Section/Card Titles**: `text-sm` (Bold).
  - **Body Text**: `text-xs` (Regular/Medium).
  - **Metadata/Labels**: `text-[10px]` or `text-xs` (Subtle).
- **Hierarchy**:
  - **Primary**: `text-heading` (Charcoal).
  - **Secondary**: `text-foreground/80` (Soft Gray).
  - **Tertiary**: `text-muted-foreground` (Light Gray).

### Logo & Iconography

- **Logo**: Text-based `Luvid` using _Nunito ExtraBold_.
- **Icons**:
  - Style: Rounded, Stroke-based (e.g., standard Lucide/Feather).
  - Color: Inherit text color or Primary Violet active state.
- **Charts**: Curved lines (Spline), Gradient fills for areas.
- **Buttons**:
  - Pill-shaped (`rounded-full`) or Soft Rectangle (`rounded-xl`).
  - Primary: Gradient background or Solid Vibrant Color with colored shadow.

## 4. Implementation Rules (Tailwind CSS)

- **Border Radius**: Use `rounded-2xl` or `rounded-3xl` for main containers.
- **Spacing**: Generous padding (`p-6`, `p-8`) inside cards.
- **Shadows**: Custom soft shadows (e.g., `box-shadow: 0px 20px 40px rgba(112, 144, 176, 0.12)`).

## 5. UI Implementation Precautions

### 5.1 Responsiveness

- **Mobile First**: The Sidebar must collapse into a bottom navigation bar or a hamburger menu on small screens (`< 768px`).
- **Grid Adaptation**: The 3-column dashboard grid must gracefully degrade to 1 column on mobile.
- **Touch Targets**: All interactive elements (buttons, inputs) must be at least `44px` height for touch accessibility.

### 5.2 Accessibility & Usability

- **Contrast**: Soft colors are nice, but text contrast must pass WCAG AA standards. Use darker shades for text on pastel backgrounds.
- **Semantic HTML**: Use proper tags (`<nav>`, `<main>`, `<article>`, `<header>`) instead of generic `<div>` soup.
- **Focus States**: Never remove `outline-none` without providing an alternative focus style (e.g., `ring-2 ring-primary`).

### 5.3 Performance & UX

- **CLS (Cumulative Layout Shift)**: Define aspect ratios or fixed heights for charts/images to prevent layout jumping during loading.
- **Loading States**: Use **Skeletons** (shimmer effect) matching the rounded card shapes instead of generic spinners for better perceived performance.
- **Empty States**: Every dashboard list (tasks, notifications) must have a graphically pleasing "Empty State" placeholder.

---

**Reference**: Based on "Modern Dashboard" UI concepts (Chaart, Success, Medical Dashboard examples).
