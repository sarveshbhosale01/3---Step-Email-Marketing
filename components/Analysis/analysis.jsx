import { useState } from 'react';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const Analysis = () => {
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalSent: 1250,
      delivered: 1187,
      opened: 856,
      clicked: 423,
      bounceRate: 5.0
    },
    engagement: [
      { hour: '9 AM', opens: 45, clicks: 23 },
      { hour: '12 PM', opens: 78, clicks: 45 },
      { hour: '3 PM', opens: 62, clicks: 32 },
      { hour: '6 PM', opens: 34, clicks: 18 }
    ],
    platformStats: [
      { platform: 'Gmail', count: 456, percentage: 53.3 },
      { platform: 'Outlook', count: 187, percentage: 21.8 },
      { platform: 'Apple Mail', count: 123, percentage: 14.4 },
      { platform: 'Yahoo', count: 56, percentage: 6.5 },
      { platform: 'Other', count: 34, percentage: 4.0 }
    ]
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="analytics-container">
      <h1>Email Campaign Analytics</h1>
      
      {/* Overview Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Sent</h3>
          <div className="stat-number">{analyticsData.overview.totalSent}</div>
        </div>
        <div className="stat-card">
          <h3>Delivered</h3>
          <div className="stat-number">{analyticsData.overview.delivered}</div>
          <div className="stat-percentage">95%</div>
        </div>
        <div className="stat-card">
          <h3>Opened</h3>
          <div className="stat-number">{analyticsData.overview.opened}</div>
          <div className="stat-percentage">72%</div>
        </div>
        <div className="stat-card">
          <h3>Clicked</h3>
          <div className="stat-number">{analyticsData.overview.clicked}</div>
          <div className="stat-percentage">49%</div>
        </div>
      </div>

      {/* Engagement Chart */}
      <div className="chart-section">
        <h3>Engagement Over Time</h3>
        <BarChart width={600} height={300} data={analyticsData.engagement}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="opens" fill="#8884d8" />
          <Bar dataKey="clicks" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* Email Clients Distribution */}
      <div className="chart-section">
        <h3>Email Clients</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={analyticsData.platformStats}
            cx={200}
            cy={150}
            labelLine={false}
            label={({ platform, percentage }) => `${platform}: ${percentage}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
          >
            {analyticsData.platformStats.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Spam Detection Indicators */}
      <div className="spam-indicators">
        <h3>Deliverability Indicators</h3>
        <div className="indicator positive">
          ✅ Good sender reputation
        </div>
        <div className="indicator positive">
          ✅ Low bounce rate ({analyticsData.overview.bounceRate}%)
        </div>
        <div className="indicator warning">
          ⚠️ Moderate engagement rate
        </div>
      </div>
    </div>
  );
};
export default Analysis;