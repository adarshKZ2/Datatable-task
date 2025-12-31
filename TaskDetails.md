# Customer Management Table – Frontend Assignment

## Objective

Build a **functional, production-quality data table** using **React, TypeScript, and TanStack Table** that demonstrates:

- Component architecture
- State modeling
- Nested rows (Customers → Orders)
- Filtering, searching, and sorting
- Clean, readable, maintainable code
- Must match the design as clos as possible.
- 
Correct behavior and clarity of design **are** important.

---

## Time Limit

⏱ **48 hours**

---

## Tech Stack (Required)

- React
- TypeScript
- TanStack Table (v8+)

### Allowed
- Any bundler (Vite / Next.js / CRA)
- Any styling approach

### Not Allowed
- Full table UI libraries (MUI Table, AntD Table, AG Grid)
- Copy-pasting full TanStack examples without adaptation

---

## Problem Statement

You are building a **Customer List Page** for an enterprise application.

Each **Customer** may have multiple **Orders**, rendered as expandable nested rows inside a table.

---

## Table Requirements

### Columns

| Column | Description |
|------|------------|
| Select | Checkbox (customers only) |
| ID | Customer ID |
| Email | Customer email |
| Status | Active / Inactive |
| Last Updated | Human-readable time |

---

## Row Hierarchy

- **Customer rows**
  - Parent rows
  - Expandable
  - Selectable
- **Order rows**
  - Child rows
  - Not selectable
  - Visually indented / marked as children

Example:
<img width="1536" height="1024" alt="data-table" src="https://github.com/user-attachments/assets/3703f5ae-b47b-4622-9f4f-e187b825e16d" />


---

## Expand / Collapse

- Use chevrons:
  - `►` collapsed
  - `▼` expanded
- Clicking toggles child visibility
- Orders must not show checkboxes

---

## Selection Rules

- Only customer rows are selectable
- Order rows must never be selectable
- Header checkbox:
  - Selects/deselects all **customers**
- Display selected count:


---

## Filtering, Searching & Sorting (Mandatory)

### Search
- Global search across:
  - Customer ID
  - Email

### Filter
- By Status (Active / Inactive)

### Sort
- By Last Updated
- (Optional bonus: ID)

📌 Must be implemented using **TanStack Table APIs**.

---

## Pagination

- Display pagination UI:

- Client-side pagination is acceptable
- Correct state modeling is more important than UX polish

---

## Mock Data

You must generate mock data programmatically.

### Requirements:
- 500 - 1000 customers
- Each customer has 0–5 orders
- Stable IDs
- Realistic timestamps
- Mixed statuses

Hardcoded static arrays are discouraged.
Use the below function if you want, or create your own. 
```ts
//types.ts
export type Order = {
  id: string;
  orderNumber: number;
  amount: number;
};

export type Customer = {
  id: string;
  email: string;
  status: "Active" | "Inactive";
  lastUpdated: number;
  orders: Order[];
};

```
```ts
//generateMockData.ts
import { Customer, Order } from "./types";

export function generateMockCustomers(count = 2000): Customer[] {
  const customers: Customer[] = [];

  for (let i = 1; i <= count; i++) {
    const orderCount = Math.floor(Math.random() * 5);
    const orders: Order[] = [];

    for (let j = 1; j <= orderCount; j++) {
      orders.push({
        id: `order-${i}-${j}`,
        orderNumber: 100 + j,
        amount: Math.floor(Math.random() * 500) + 50,
      });
    }

    customers.push({
      id: `cust-${i}`,
      email: `customer${i}@example.com`,
      status: i % 3 === 0 ? "Inactive" : "Active",
      lastUpdated: Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24),
      orders,
    });
  }

  return customers;
}

```

---
## Please add a README (Mandatory), with below answers to questions.

Please explain:

1. How you structured components
2. How customer–order relationships are modeled
3. How filtering, sorting, and searching are implemented
4. Where you avoided over-engineering
5. What would break first at 50k rows

---

## Minimum Acceptance Criteria

Your solution must:

- Render customers with expandable orders
- Support selection (customers only)
- Support filtering, searching, and sorting
- Use TanStack Table correctly
- Be readable, typed, and runnable

---

## Bonus (Optional)

- Clean column abstraction
- Memoization where appropriate
- Accessibility considerations

---

## Submission

- Share a GitHub repository
- Include setup instructions
- Ensure the project runs without additional configuration
