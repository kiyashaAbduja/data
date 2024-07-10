import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const EvaluationPage = () => {
  const { employeeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState([]);
  const [evaluatedEmployees, setEvaluatedEmployees] = useState([]);

  const employees = location.state?.employees || [];

  const formik = useFormik({
    initialValues: {
      code: "",
      performance: "",
      communication: "",
      date: "",
      year: "",
      month: "",
    },
    validationSchema: Yup.object({
      code: Yup.number()
        .required("Code rating is required")
        .min(1, "Minimum rating is 1")
        .max(5, "Maximum rating is 5"),
      performance: Yup.number()
        .required("Performance rating is required")
        .min(1, "Minimum rating is 1")
        .max(5, "Maximum rating is 5"),
      communication: Yup.number()
        .required("Communication rating is required")
        .min(1, "Minimum rating is 1")
        .max(5, "Maximum rating is 5"),
    }),
    onSubmit: (values) => {
      console.log("Feedback submitted:", values);
      setEvaluatedEmployees((prev) => [...new Set([...prev, employeeId])]);
      setEvaluations((prev) => [...prev, { employeeId, ...values }]);
    },
  });

  useEffect(() => {
    if (location.state && location.state.filters.date !== "") {
      const { date, year, month } = location.state.filters;
      formik.setFieldValue("date", date || "");
      formik.setFieldValue("year", year || "");
      formik.setFieldValue("month", month || "");
    } else {
      const today = new Date().toISOString().split("T")[0];
      formik.setFieldValue("date", today);
      formik.setFieldValue("year", new Date().getFullYear());
      formik.setFieldValue("month", new Date().getMonth() + 1);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  const allEvaluationsComplete = employees.length == evaluatedEmployees;

  const handleGenerateReport = () => {
    navigate("/report", { state: { evaluations } });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Evaluation for Employee {employeeId}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="code" className="block mb-2">
              Code
            </label>
            <select
              id="code"
              {...formik.getFieldProps("code")}
              className="p-2 border rounded w-full"
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            {formik.touched.code && formik.errors.code && (
              <p className="text-red-500">{formik.errors.code}</p>
            )}
          </div>
          <div>
            <label htmlFor="performance" className="block mb-2">
              Performance
            </label>
            <select
              id="performance"
              {...formik.getFieldProps("performance")}
              className="p-2 border rounded w-full"
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            {formik.touched.performance && formik.errors.performance && (
              <p className="text-red-500">{formik.errors.performance}</p>
            )}
          </div>
          <div>
            <label htmlFor="communication" className="block mb-2">
              Communication
            </label>
            <select
              id="communication"
              {...formik.getFieldProps("communication")}
              className="p-2 border rounded w-full"
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            {formik.touched.communication && formik.errors.communication && (
              <p className="text-red-500">{formik.errors.communication}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="date" className="block mb-2">
              Date
            </label>
            <input
              id="date"
              type="date"
              {...formik.getFieldProps("date")}
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="year" className="block mb-2">
              Year
            </label>
            <input
              id="year"
              type="number"
              {...formik.getFieldProps("year")}
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="month" className="block mb-2">
              Month
            </label>
            <select
              id="month"
              {...formik.getFieldProps("month")}
              className="p-2 border rounded w-full"
            >
              <option value="">Select</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Submit
        </button>
        {allEvaluationsComplete && (
          <button
            type="button"
            className="mt-4 w-full bg-green-500 text-white py-2 rounded"
            onClick={handleGenerateReport}
          >
            Generate Report
          </button>
        )}
      </form>
    </div>
  );
};

export default EvaluationPage;
