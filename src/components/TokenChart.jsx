import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// Optional: Define some custom colors
const COLORS = [
  "#00C49F", "#FF8042", "#0088FE", "#FFBB28", "#FF4D4F", "#36A2EB", "#FF6384"
];

const TokenChart = ({ tokens }) => {
  // Limit to top 6 tokens by USD value
  const topTokens = tokens
    .sort((a, b) => b.quote - a.quote)
    .slice(0, 6)
    .map((token, index) => ({
      name: token.symbol,
      value: parseFloat(token.quote.toFixed(2)), // USD value
      color: COLORS[index % COLORS.length],
    }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={topTokens}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {topTokens.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TokenChart;
