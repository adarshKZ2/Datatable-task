Customer Management Table – Frontend Assignment

Overview

This project implements a Customer Management Table using React, TypeScript, and TanStack Table (v8).

The table supports:

Expandable customer → order hierarchy
Customer-only row selection
Global search
Status filtering
Sorting by last updated
Pagination with exactly 25 customers per page
Clean, readable, and maintainable code
The implementation closely follows the provided design reference and focuses on correctness, clarity, and scalability.

Tech Stack
React
TypeScript
TanStack Table (v8)

Vite

CSS (custom, no UI table libraries)

1. Component Structure

The application is structured with clear separation of concerns:
Key Components
DataTable
Responsible for:
Table state management (sorting, filtering, pagination, selection)
Integrating TanStack Table APIs
Rendering table headers, rows, and pagination
Acts as the main orchestration layer
columns.tsx
Contains column definitions only

Encapsulates:
Cell rendering logic
Expand / collapse behavior
Checkbox rendering rules
Formatting (e.g., status badge, last updated date)

Utility Files

formatTime.ts → handles timestamp formatting
Mock data generator → programmatic, scalable data creation

Why this structure?

Keeps table logic centralized
Avoids bloated components
Makes columns reusable and easier to reason about
Simplifies future changes (e.g., adding new columns)

2. Customer–Order Relationship Modeling

The data model follows a parent–child hierarchy:
Customers
Parent rows
Expandable
Selectable
Orders
Child rows
Rendered only when the parent customer is expanded

Never selectable

Implementation Details

Customers are normalized into a table-friendly structure using useMemo
Orders are assigned to the subRows property
TanStack Table’s getSubRows API is used to enable nested rows
Row depth (row.depth) is used to:
Disable selection for orders
Apply visual indentation
Control filtering and pagination logic
This approach aligns with TanStack Table’s recommended nested row patterns.

3. Filtering, Searching, and Sorting Global Search
Implemented using TanStack Table’s globalFilter
Searches across:
Customer ID
Customer Email
Order rows are excluded from global search results
Case-insensitive matching
Status Filtering
Implemented using column-level filtering
A dropdown filter updates the table’s columnFilters state
Uses an equality filter on the status column
Filtering applies only to customer rows
Sorting
Sorting is implemented via TanStack Table’s sorting state
Supported sorting:
Last Updated (primary)
(Optional extension: Customer ID)
Sorting is controlled externally via a toolbar button
Pagination
Pagination is configured to show exactly 25 customers per page
Child rows (orders):
Do not count toward the 25-row limit
Are displayed only when the parent is expanded
Pagination state is fully controlled and predictable

4. Where Over-Engineering Was Avoided

Several conscious decisions were made to keep the solution simple and readable:
No custom state management library (Redux/Zustand)
React state + TanStack Table state were sufficient
No virtualization
Not required for the given data size
No UI component libraries
All styles implemented with plain CSS
No custom checkbox or icon libraries
Native inputs and CSS-based chevrons were used
No excessive abstraction
Logic kept close to where it is used
The goal was to demonstrate good judgment, not unnecessary complexity.

5. What Would Break First at 50k Rows?

At significantly larger data sizes (e.g., 50,000+ customers), the following would be the first bottlenecks:

Performance Issues
Rendering all rows in the DOM would become expensive
Expanding many rows could cause noticeable reflows
Filtering and sorting would become slower since they run on the client
Required Improvements for Scale
To handle very large datasets, the following would be introduced:
Row virtualization (e.g., TanStack Virtual)
Server-side pagination, filtering, and sorting
Memoized selectors for derived data
Debounced search input
Possibly moving data fetching to a backend API
These optimizations were intentionally avoided because they were out of scope for this assignment.
Testing Strategy (Not Implemented)
Automat
However, in a production environment, the following approach would be used:

Unit tests for:
Data normalization logic
Utility functions (e.g., date formatting)
Component tests using React Testing Library for:
Row expansion and collapse
Customer-only selection rules
Filtering and searching behavior
Pagination logic
Accessibility tests for keyboard navigation and focus management
End-to-end tests for user workflows (search → filter → paginate)

Setup Instructions
npm install
npm run dev
The application will be available at http://localhost:5173.

Final Notes

This solution prioritizes:

Correct usage of TanStack Table APIs
Clean component architecture
Predictable state management
Readable and maintainable code
UI behavior matching enterprise expectations
The implementation is intentionally pragmatic and designed to scale with future requirements.
