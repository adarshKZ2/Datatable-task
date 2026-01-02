import type { Customer, Order } from "../types";

export function generateMockCustomers(count = 1000): Customer[] {
  const customers: Customer[] = [];

  for (let i = 1; i <= count; i++) {
    const orderCount = Math.floor(Math.random() * 5);
    const orders: Order[] = [];

    for (let j = 1; j <= orderCount; j++) {
      orders.push({
        id: `order-${i}-${j}`,
        orderNumber: 1000 + j,
        amount: Math.floor(Math.random() * 500) + 50,
      });
    }

    customers.push({
      id: `cust-${i}`,
      email: `customer${i}@example.com`,
      status: i % 3 === 0 ? "Inactive" : "Active",
      lastUpdated:
        Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24),
      orders,
    });
  }

  return customers;
}
