import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = [
    '#10B981', '#EF4444', '#F59E0B', '#8B5CF6', 
    '#06B6D4', '#F97316', '#84CC16', '#EC4899'
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 sm:p-3 border border-gray-200 rounded-lg shadow-lg">
                <p className="text-xs sm:text-sm font-medium text-gray-900">
                    {payload[0].payload.category}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                    Amount: <span className="font-semibold">${payload[0].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

const CustomLegend = ({ payload }) => {
    return (
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-2 sm:mt-4">
            {payload.map((entry, index) => (
                <div key={index} className="flex items-center gap-1 px-1 sm:px-2">
                    <div 
                        className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-xs sm:text-sm text-gray-600 truncate max-w-20 sm:max-w-none">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

export const ExpensesPieChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-full min-h-32 sm:min-h-48">
                <p className="text-sm sm:text-base text-gray-500 text-center">
                    No data available to display the chart
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 min-h-48 sm:min-h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius="70%"
                            innerRadius="30%"
                            fill="#8884d8"
                            dataKey="total"
                            stroke="#ffffff"
                            strokeWidth={2}
                        >
                            {data.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                            content={<CustomLegend />}
                            wrapperStyle={{ paddingTop: '10px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};