import React, { useState, useEffect } from "react";
import "./FacultyPage.css";
import UpdateAttendance from "./UpdateAttendance";
import AttendanceTable from "./AttendanceTable";
import DynamicDropdowns from "./DynamicDropdowns";
import { getAttendanceData } from "./api/attendanceData";
import getCriteria from "./api/crieteria";

const FacultyPage = () => {
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [criteria, setCriteria] = useState(null);

  // Fetch attendance data
  const fetchData = async () => {
    try {
      const data = await getAttendanceData("5", "CS01", "CS", "A", "01");
      setAttendance(data); // Save the attendance data
      console.log("Attendance Data:", data);
    } catch (err) {
      setError("Failed to fetch attendance data.");
      console.error(err);
    }
  };

  // Fetch criteria data on component mount
  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const data = await getCriteria();
        setCriteria(data); // Set criteria data in state
        console.log("Criteria Data:", data);
      } catch (err) {
        setError("Failed to fetch criteria data.");
        console.error(err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCriteria();
  }, []);

  // Handle rendering based on loading/error state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="faculty-page">
      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li><a href="#principal">Principal</a></li>
          <li><a href="#hod">HOD</a></li>
          <li className="active"><a href="#faculty">Faculty</a></li>
        </ul>
      </nav>

      {/* Page Content */}
      <div className="content">
        <div className="component-container">
          {/* Render dropdowns only if criteria data exists */}
          {criteria ? (
            <DynamicDropdowns data={criteria} />
          ) : (
            <div>No criteria data available</div>
          )}

          {/* Button to fetch attendance data */}
          <button
            className="bg-green-200 p-2 rounded-la"
            onClick={fetchData}
          >
            Fetch Attendance
          </button>

          {/* Render attendance table only if attendance data exists */}
          {attendance.length > 0 ? (
            <AttendanceTable data={attendance} />
          ) : (
            <div>No attendance data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyPage;
