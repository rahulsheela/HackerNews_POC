import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const NewsChart = ({ news }) => {
  return (
    <div className="chart-container">
      <LineChart
        width={1000}
        height={300}
        data={news}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <Line
          type="monotone"
          dataKey="points"
          stroke="#ff6347"
          dot={{ stroke: "#ff6347", strokeWidth: 2 }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis />
      </LineChart>
    </div>
  );
};

export default NewsChart;
