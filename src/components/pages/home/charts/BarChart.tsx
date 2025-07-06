import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import COLORS from './colors';

const VisBarChart = ({ bloodGroupFreq }: { bloodGroupFreq: { name: string; value: number }[] }) => {
  return (
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
  );
};
export default VisBarChart;
