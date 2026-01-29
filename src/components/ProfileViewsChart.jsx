import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const viewsData = [
  { day: "M", value: 120 },
  { day: "T", value: 180 },
  { day: "W", value: 480 },
  { day: "T", value: 260 },
  { day: "F", value: 380 },
  { day: "S", value: 520 },
  { day: "S", value: 120 },
];

export default function ProfileViewsChart() {
  return (
    <div style={{ width: "100%", height: 180, minHeight: 180, minWidth: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={viewsData} barCategoryGap="20%">
          <XAxis dataKey="day" tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
          <YAxis tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#f9fafb",
            }}
            itemStyle={{ color: "#163D5C", fontWeight: "bold" }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="url(#viewsGradient)" barSize={12} />
          <defs>
            <linearGradient id="viewsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#163D5C" />
              <stop offset="100%" stopColor="#CA5ECA" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
