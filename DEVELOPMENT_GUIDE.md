# Development Guide

This document outlines the development standards and architectural guidelines for the **Luvid** project.

## 1. Development Process

### 1.1 TDD (Test Driven Development)

We adopt a strict TDD approach for **Business Logic**.

- **Cycle**:
  1.  **Red**: Write a failing test for a specific requirement.
  2.  **Green**: Write the minimum code necessary to pass the test.
  3.  **Refactor**: Improve the code structure while keeping tests passing.
- **Target**: Service functions, utilities, hooks with complex logic, and Server Actions.
- **Tools**: Vitest or Jest (Unit Testing).

### 1.2 UI Development

- **No Tests**: UI components (React Server/Client Components) are **not** unit tested unless they contain significant isolated logic.
- **Reasoning**: UI changes frequently, and maintenance cost of UI tests often outweighs the benefit in early stages.
- **Focus**: Verify UI manually or via E2E (later) for critical flows.

## 2. Code Conventions

- **File Size**: Maximum **600 lines** per file. If a file exceeds this or approaches it, refactor by extracting sub-components or utility functions.
- **Complexity**: Keep functions small and focused. Avoid deep nesting (max 3 levels recommended).
- **Naming**:
  - Components: PascalCase (e.g., `UserProfile.tsx`)
  - Functions/Variables: camelCase (e.g., `getUserData`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)

## 3. Directory Structure

We use a **Feature-Sliced/Domain-Driven** structure to ensure high cohesion and low coupling.

### Root Directory

- `/app`: Next.js App Router (Routes & Layouts). **Keep logic minimal here**.
- `/src`: Application source code.
  - `/src/features`: Business logic and feature-specific UI.
  - `/src/shared`: Generic utilities and shared UI components.

### Feature Module Structure (`/src/features/[feature-name]`)

Each feature should be self-contained.

```
src/features/auth/
├── actions/       # Server Actions (Business Logic Entry Points)
├── components/    # Feature-specific UI Components
├── hooks/         # Custom Hooks (State Logic)
├── model/         # Types and pure domain logic functions
├── utils/         # Helper functions specific to this feature
└── __tests__/     # Tests for model, utils, and actions
```

### Shared Module Structure (`/src/shared`)

Code reused across multiple features.

```
src/shared/
├── components/    # Reusable UI primitives (Button, Input, etc.)
├── lib/           # 3rd party library wrappers (DB client, API clients)
├── utils/         # Generic helper functions (date formatting, etc.)
└── hooks/         # Generic hooks (useOnClickOutside, etc.)
```

### App Directory (`/app`)

Connects features to routes.

```
app/
├── (routes)/
│   ├── login/
│   │   └── page.tsx  # Imports <LoginForm /> from features/auth
│   └── dashboard/
│       └── page.tsx
├── layout.tsx
└── page.tsx
```

## 4. Implementation Guidelines

1.  **Business Logic First**: Start by defining the `model` or `actions` in the feature folder.
2.  **Write Tests**: Create a `__spec.ts` or `.test.ts` file in `__tests__` before implementing the logic.
3.  **Implement UI**: Once logic is solid, build the UI components in the feature's `components` folder using the tested logic.
4.  **Assemble**: Import the feature component into the `app` directory page.
5.  **Responsive UI Strategy**:
    - For complex UIs where Mobile and Desktop layouts differ significantly, **create separate component files**.
    - Naming convention: `FeatureName.mobile.tsx` and `FeatureName.desktop.tsx`.
    - Use a wrapper component or media queries to conditionally render them.
    - _Avoid excessive CSS media query overrides within a single large component._

---

**Goal**: Maintain stability through tested business logic while allowing rapid iteration on the UI.
