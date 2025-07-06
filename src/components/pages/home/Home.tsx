import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { User } from './User';
import VisBarChart from './charts/BarChart';
import VisPieChart from './charts/PieChart';
import VisLineChart from './charts/LineChart';

import './home.css';

const Charts = () => {
  const { t, i18n } = useTranslation();

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
    ).map(([name, value]) => ({ name: t(`charts.rolePie.infoBox.${name}`), value }));
  }, [users, i18n.language]);

  return (
    <div className="home-content">
      <div className="vis-box">
        <span className="recharts-heading">{t('charts.bloodGroupBar.title')}</span>
        <VisBarChart bloodGroupFreq={bloodGroupFreq} />
      </div>
      <div className="vis-box">
        <span className="recharts-heading">{t('charts.rolePie.pieChartTitle')}</span>
        <VisPieChart roleData={roleData} />
      </div>
      <div className="vis-box">
        <span className="recharts-heading">{t('charts.ageLine.title')}</span>
        <VisLineChart ageTrend={ageTrend} />
      </div>
    </div>
  );
};

export default Charts;
