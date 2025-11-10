import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import type { EmployeeData } from '../../models/types';
import './styles.css';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const [res1, res2] = await Promise.all([
        fetch(`http://localhost:4001/basicInfo?_page=${page}&_limit=5`),
        fetch(`http://localhost:4002/details?_page=${page}&_limit=5`),
      ]);
      const [basic, details] = await Promise.all([res1.json(), res2.json()]);
      const merged = basic.map((b: EmployeeData) => ({
        ...b,
        ...(details.find((d: EmployeeData) => d.employeeId === b.employeeId) ||
          {}),
      }));
      setEmployees(merged);
    };
    fetchData();
  }, [page]);

  return (
    <div className="page employee-list">
      <h1>Employee List</h1>
      <Link to="/wizard?role=admin" className="button">
        + Add Employee
      </Link>

      <table className="employee-table" width="100%" border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Location</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.employeeId}>
              <td>{e.name}</td>
              <td>{e.department}</td>
              <td>{e.role || '—'}</td>
              <td>{e.location || '—'}</td>
              <td>{e.photo ? <img src={e.photo} width={50} /> : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default EmployeesPage;
