import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.join(__dirname, 'data.csv');
const outPath = path.join(__dirname, 'insights.ts');

const processData = () => {
    const csvContent = fs.readFileSync(csvPath, 'utf8');

    const parsed = Papa.parse(csvContent, { header: true, dynamicTyping: true, skipEmptyLines: true });
    const records = parsed.data;

    // Real insights calculation
    let totalSales = 0;
    let totalProfit = 0;
    let totalOrders = records.length;

    const monthlySales = {};
    const categorySales = {};
    const subCategorySales = {};

    records.forEach(row => {
        // Standardize to required fields
        const sales = Number(row.Sales) || 0;
        const profit = Number(row.Profit) || 0;
        const dateStr = row['Order Date'] || row.OrderDate;

        // Parse MM/DD/YYYY or similar depending on the exact CSV format
        // For simplicity we try to extract year/month
        let dateObj = new Date(dateStr);
        if (isNaN(dateObj.getTime())) {
            dateObj = new Date(); // fallback
        }

        const monthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
        const category = row.Category || 'Unknown';
        const subCat = row['Sub-Category'] || row.SubCategory || 'Unknown';

        totalSales += sales;
        totalProfit += profit;

        // Monthly aggregation
        if (!monthlySales[monthKey]) monthlySales[monthKey] = { sales: 0, profit: 0, date: monthKey };
        monthlySales[monthKey].sales += sales;
        monthlySales[monthKey].profit += profit;

        // Category aggregation
        if (!categorySales[category]) categorySales[category] = 0;
        categorySales[category] += sales;

        // Subcategory aggregation
        if (!subCategorySales[subCat]) subCategorySales[subCat] = { sales: 0, profit: 0 };
        subCategorySales[subCat].sales += sales;
        subCategorySales[subCat].profit += profit;
    });

    const avgProfitMargin = (totalProfit / totalSales) * 100;

    // Sorting for top/bottom
    const sortedSubCats = Object.entries(subCategorySales)
        .map(([name, data]) => ({ name, sales: data.sales, profit: data.profit }))
        .sort((a, b) => b.profit - a.profit);

    const topProduct = sortedSubCats[0];
    const worstProduct = sortedSubCats[sortedSubCats.length - 1];

    const sortedMonths = Object.values(monthlySales).sort((a, b) => a.date.localeCompare(b.date));

    // Category array for pie chart
    const categoriesArray = Object.entries(categorySales).map(([name, value]) => ({ name, value }));

    const tsContent = `export const rawDataStats = {
  totalSales: ${totalSales},
  totalProfit: ${totalProfit},
  totalOrders: ${totalOrders},
  avgProfitMargin: ${avgProfitMargin},
  topProduct: ${JSON.stringify(topProduct)},
  worstProduct: ${JSON.stringify(worstProduct)},
};

export const monthlyTrend = ${JSON.stringify(sortedMonths, null, 2)};
export const categoryDistribution = ${JSON.stringify(categoriesArray, null, 2)};
`;

    fs.writeFileSync(outPath, tsContent);
    console.log("Real insights written to src/insights.ts");
};

processData();
