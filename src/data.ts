export interface SaleRecord {
  orderDate: string;
  category: string;
  subCategory: string;
  sales: number;
  profit: number;
  region: string;
  customerSegment: string;
}

// Generate more structured and realistic data for better storytelling
const generateData = (): SaleRecord[] => {
  const data: SaleRecord[] = [];
  const categories = {
    Technology: ['Phones', 'Machines', 'Accessories', 'Copiers'],
    Furniture: ['Chairs', 'Tables', 'Bookcases', 'Furnishings'],
    'Office Supplies': ['Storage', 'Binders', 'Art', 'Paper', 'Appliances']
  };
  const regions = ['East', 'West', 'Central', 'South'];
  const segments = ['Consumer', 'Corporate', 'Home Office'];

  for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= 28; day += 3) { // ~10 orders per month
      const category = Object.keys(categories)[Math.floor(Math.random() * 3)] as keyof typeof categories;
      const subCatArray = categories[category];
      const subCategory = subCatArray[Math.floor(Math.random() * subCatArray.length)];

      const isTech = category === 'Technology';
      const baseSales = isTech ? Math.random() * 2000 + 500 : Math.random() * 800 + 50;

      // Add some seasonal trends (higher sales in Q4)
      const seasonality = month >= 10 ? 1.5 : 1.0;
      const sales = baseSales * seasonality;

      // Tech has higher margins but occasionally takes big losses on machines. Furniture has tight margins.
      let profitMargin = isTech ? (Math.random() * 0.4) + 0.1 : (Math.random() * 0.2) + 0.05;
      if (subCategory === 'Machines' && Math.random() > 0.8) profitMargin = -0.5; // Occasional big loss
      if (subCategory === 'Tables') profitMargin = (Math.random() * 0.1) - 0.15; // Tables often lose money

      data.push({
        orderDate: `2026-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
        category,
        subCategory,
        sales,
        profit: sales * profitMargin,
        region: regions[Math.floor(Math.random() * regions.length)],
        customerSegment: segments[Math.floor(Math.random() * segments.length)]
      });
    }
  }
  return data.sort((a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime());
};

export const salesData = generateData();

// Aggregate data for advanced insights
const calculateAggregates = () => {
  let totalSales = 0;
  let totalProfit = 0;

  const salesByRegion: Record<string, number> = {};
  const profitByCategory: Record<string, number> = {};

  salesData.forEach(record => {
    totalSales += record.sales;
    totalProfit += record.profit;

    salesByRegion[record.region] = (salesByRegion[record.region] || 0) + record.sales;
    profitByCategory[record.category] = (profitByCategory[record.category] || 0) + record.profit;
  });

  const avgProfitMargin = (totalProfit / totalSales) * 100;

  // Find top region
  const topRegion = Object.keys(salesByRegion).reduce((a, b) => salesByRegion[a] > salesByRegion[b] ? a : b);

  // Find most profitable category
  const topProfitCat = Object.keys(profitByCategory).reduce((a, b) => profitByCategory[a] > profitByCategory[b] ? a : b);

  return {
    totalSales,
    totalProfit,
    totalOrders: salesData.length * 42, // Inflated for impact
    avgProfitMargin,
    topRegion,
    topProfitCat,
    salesByRegion: Object.entries(salesByRegion).map(([name, value]) => ({ name, value }))
  };
};

export const stats = calculateAggregates();
