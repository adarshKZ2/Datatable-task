import type { Customer, Order } from "./index";

/**
 * Unified row type for TanStack Table
 * TanStack requires a single row type for parent & child rows
 */
export type TableRow =
  | (Customer & { subRows?: TableRow[] })
  | (Order & { subRows?: TableRow[] });
