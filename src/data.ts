// Sample processed data from the Superstore CSV
export interface SaleRecord {
  orderDate: string;
  category: string;
  sales: number;
  profit: number;
  region: string;
}

export const salesData: SaleRecord[] = [
  { orderDate: "2016-01-01", category: "Furniture", sales: 261.96, profit: 41.91, region: "South" },
  { orderDate: "2016-01-05", category: "Office Supplies", sales: 731.94, profit: 219.58, region: "South" },
  { orderDate: "2016-01-10", category: "Technology", sales: 957.57, profit: -383.03, region: "Central" },
  { orderDate: "2016-02-15", category: "Furniture", sales: 48.86, profit: 14.17, region: "Central" },
  { orderDate: "2016-02-20", category: "Office Supplies", sales: 114.90, profit: 34.47, region: "Central" },
  { orderDate: "2016-03-01", category: "Technology", sales: 1706.18, profit: 85.31, region: "West" },
  { orderDate: "2016-03-10", category: "Furniture", sales: 911.42, profit: 68.36, region: "West" },
  { orderDate: "2016-04-05", category: "Technology", sales: 307.66, profit: -12.31, region: "East" },
  { orderDate: "2016-04-15", category: "Office Supplies", sales: 226.56, profit: 9.06, region: "East" },
  { orderDate: "2016-05-01", category: "Furniture", sales: 86.64, profit: 25.13, region: "South" },
  // ... representative truncated data for the demo
].concat(Array.from({ length: 50 }, (_, i) => ({
  orderDate: `2016-${(i % 12) + 1}-15`,
  category: ["Furniture", "Office Supplies", "Technology"][Math.floor(Math.random() * 3)],
  sales: Math.random() * 1000 + 100,
  profit: Math.random() * 500 - 50,
  region: ["East", "West", "Central", "South"][Math.floor(Math.random() * 4)]
})));

export const stats = {
  totalSales: 2297200,
  totalProfit: 286397,
  totalOrders: 9994,
  avgProfitMargin: 12.4
};
