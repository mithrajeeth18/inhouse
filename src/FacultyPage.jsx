import React, { useState, useEffect } from "react";
import "./FacultyPage.css";
import UpdateAttendance from "./UpdateAttendance";
import AttendanceTable from "./AttendanceTable";
import DynamicDropdowns from "./DynamicDropdowns";
import { getAttendanceData } from "./api/attendanceData";
import getCriteria from "./api/crieteria";
import axios from "axios";
import fetchAttendanceData from "./api/fetchAttendanceData";
const FacultyPage = () => {
  const [attendance, setAttendance] = useState(null);
 
  const [criteria, setCriteria] = useState(null);
   const [selectedValues, setSelectedValues] = useState({});

  const handleSelectionChange = (values) => {
    console.log("Selected Values:", values);
    setSelectedValues(values);
  };
  // Fetch attendance data
  const fetchData = async () => {
      try {
        const semester = 5;
        const subjectId = "CS501";
        const branch = "CS";
        const division = "A";
        const batch = "01";

        // Replace `fetchAttendanceData` with the actual API call or function
        const response = await fetchAttendanceData(
          selectedValues.semester,
          "CS501",
          selectedValues.branch,
          selectedValues.division,
          selectedValues.batch
        );

        console.log("Attendance Data:", response);
        setAttendance(response);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

  // Fetch criteria data on component mount
  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const data = await getCriteria();
        setCriteria(data); // Set criteria data in state
        // console.log("Criteria Data:", data);
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
            <DynamicDropdowns data={criteria} onSelectionChange={handleSelectionChange} />
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
          {attendance?  (
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
