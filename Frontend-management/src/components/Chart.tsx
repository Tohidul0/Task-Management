import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartData } from "../assets/data";

// Define the type for the chart data
interface ChartData {
  name: string;
  total: number; // Replace with the correct type of 'total' if it's not a number
}

export const Chart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart width={150} height={40} data={chartData as ChartData[]}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
