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
