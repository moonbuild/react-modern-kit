import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const VisLineChart = ({ ageTrend }: { ageTrend: { id: number; name: string; age: number }[] }) => {
  return (
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
  );
};
export default VisLineChart;
