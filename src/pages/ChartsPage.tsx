import React from "react";
import {
    PieChart,
    Pie,
    Tooltip as PieTooltip,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as BarTooltip,
} from "recharts";

// Örnek veri seti
const sampleData = [
    { name: "Team A", value: 400 },
    { name: "Team B", value: 300 },
    { name: "Team C", value: 300 },
    { name: "Team D", value: 200 },
];

// Pasta grafiği için renkler
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ChartsPage = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "20px",
            }}
        >
            <div style={{ flex: 1, textAlign: "left" }}>
                <h2>Pie Chart</h2>
                <PieChart width={400} height={300}>
                    <Pie
                        data={sampleData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                    >
                        {sampleData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <PieTooltip />
                </PieChart>
            </div>
            <div style={{ flex: 1, textAlign: "left" }}>
                <h2>Bar Chart</h2>
                <BarChart width={400} height={300} data={sampleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <BarTooltip />
                    <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
            </div>
        </div>
    );
};

export default ChartsPage;
