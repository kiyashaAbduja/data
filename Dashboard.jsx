import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const employees = [
  { id: 1, name: "John Doe", code: "E001", performance: "Excellent" },
  { id: 2, name: "Jane Smith", code: "E002", performance: "Good" },
  // Add more employee data as needed
];

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state;
  const [filters, setFilters] = useState({ date: "", year: "", month: "" });

  const handleCardClick = (employeeId) => {
    navigate(`/evaluation/${employeeId}`, {
      state: { filters, employees },
    });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Welcome, {username}</h1>
      <div className="mb-6 flex space-x-4">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={filters.year}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <select
          name="month"
          value={filters.month}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          {/* Add other months */}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="p-4 bg-white rounded shadow-md cursor-pointer"
            onClick={() => handleCardClick(employee.id)}
          >
            <h2 className="text-xl">{employee.name}</h2>
            <p>Code: {employee.code}</p>
            <p>Performance: {employee.performance}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
