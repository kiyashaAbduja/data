import React from "react";
import { useLocation } from "react-router-dom";

const ReportPage = () => {
  const location = useLocation();
  const { evaluations } = location.state || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Evaluation Report</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Employee ID</th>
            <th className="py-2 px-4 border-b">Code</th>
            <th className="py-2 px-4 border-b">Performance</th>
            <th className="py-2 px-4 border-b">Communication</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Year</th>
            <th className="py-2 px-4 border-b">Month</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((evaluation, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{evaluation.employeeId}</td>
              <td className="py-2 px-4 border-b">{evaluation.code}</td>
              <td className="py-2 px-4 border-b">{evaluation.performance}</td>
              <td className="py-2 px-4 border-b">{evaluation.communication}</td>
              <td className="py-2 px-4 border-b">{evaluation.date}</td>
              <td className="py-2 px-4 border-b">{evaluation.year}</td>
              <td className="py-2 px-4 border-b">{evaluation.month}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportPage;
