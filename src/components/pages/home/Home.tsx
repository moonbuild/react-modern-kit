import { useEffect, useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

import type { User } from './User';

import './home.css';

const Charts = () => {
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f'];
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  const bloodGroupFreq = useMemo(() => {
    const freq = users.reduce((acc: Record<string, number>, { bloodGroup }) => {
      acc[bloodGroup] = (acc[bloodGroup] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(freq).map(([name, value]) => ({ name, value }));
  }, [users]);

  const ageTrend = useMemo(() => {
    return users.map((user) => ({
      id: user.id,
      name: user.firstName,
      age: user.age,
    }));
  }, [users]);

  const roleData = useMemo(() => {
    return Object.entries(
      users.reduce((map: Record<string, number>, { role }) => {
        map[role] = (map[role] ?? 0) + 1;
        return map;
      }, {}),
    ).map(([name, value]) => ({ name, value }));
  }, [users]);

  return (
    <div className="home-content">
      <div className="vis-box">
        <span className="recharts-heading">Blood Group Frequency</span>
        <div className="bar-chart">
          <ResponsiveContainer>
            <BarChart data={bloodGroupFreq}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: '#222', color: '#fff' }}
                cursor={{ fill: 'rgba(var(--base-surface), 0.2)' }}
              />
              <Legend />
              <Bar dataKey="value" fill={COLORS[0]}>
                {bloodGroupFreq.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="vis-box">
        <span className="recharts-heading">User Age Trend</span>
        <div className="vis-pie-info-box">
          <div className="pie-chart">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={roleData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius="80%"
                  label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                >
                  {roleData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="pie-chart-info">
            {roleData.map((item, index) => (
              <div key={item.name} className="pie-chart-info-item">
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
                <span style={{ fontWeight: 500, color: 'var(--contrast)' }}>{item.name}</span>
                <span style={{ marginLeft: 'auto', fontWeight: 600, color: 'var(--contrast)' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="vis-box">
        <span className="recharts-heading">User Age Trend</span>
        <div className="line-chart">
          <ResponsiveContainer>
            <LineChart data={ageTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="age" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
