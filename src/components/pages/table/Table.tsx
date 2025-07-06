import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { User } from '../home/User';

import './table.css';

const Table = () => {
  const { t } = useTranslation();

  const [users, setUsers] = useState<User[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const loaderRef = useRef(null);
  const PAGE_LIMIT = 20;

  const fetchUserData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/users?limit=${PAGE_LIMIT}&skip=${skip}`);
      const data = await res.json();
      setUsers((prev) => [...prev, ...data.users]);
      setSkip((prev) => prev + PAGE_LIMIT);
      setHasMore(skip + PAGE_LIMIT < data.total);
    } catch (err) {
      console.error('Failed to load users: ', err);
    } finally {
      setLoading(false);
    }
  }, [skip, loading, hasMore]);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchUserData();
        }
      },
      {
        rootMargin: '300px',
      },
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchUserData]);

  return (
    <div className="table-content">
      <span className="header">{t('table.title')}</span>
      <table>
        <thead className="columns-head">
          <tr>
            <th className="column-box">Name</th>
            <th className="column-box">Email</th>
            <th className="column-box">Phone Number</th>
            <th className="column-box">Address</th>
            <th className="column-box">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, firstName, lastName, email, phone, address, role }) => (
            <tr key={id} className="row">
              <td className="cell">
                {firstName} {lastName}
              </td>
              <td className="cell">{email}</td>
              <td className="cell">{phone}</td>
              <td className="cell">
                {address.city}, {address.state}
              </td>
              <td className="cell">{role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={loaderRef} className="loader-box">
        {loading && (
          <div className="loader-spin">
            <Loader2 size={20} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Table;
