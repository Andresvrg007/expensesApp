import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
    "#EF4444", // Red (Expense)
    "#F59E0B", // Amber (Expense)
    "#10B981", // Green (Income)
    "#3B82F6", // Blue (Income)
    "#8B5CF6", // Purple (Expense)
    "#EC4899", // Pink (Expense)
    "#06B6D4", // Cyan (Income)
    "#84CC16", // Lime (Income)
];

export const ExpensesPieChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="text-center text-gray-500">
                <p>No data available to display the chart.</p>
            </div>
        );
    }return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>                            <Pie
                            data={data}
                            dataKey="total"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            innerRadius="40%"
                            paddingAngle={2}
                            label={({ name, percent }) =>
                                `${name} (${(percent * 100).toFixed(0)}%)`
                            }                        >
                            {data.map((entry, idx) => (
                                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                            ))}
                        </Pie>                            <Tooltip 
                            formatter={(value, name) => [`$${value}`, name]}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};