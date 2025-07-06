import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import COLORS from './colors';

const VisPieChart = ({ roleData }: { roleData: { name: string; value: number }[] }) => {
  return (
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
  );
};
export default VisPieChart;
