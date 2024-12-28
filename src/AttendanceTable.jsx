import React, { useEffect, useState } from "react";
import fetchAttendanceData from "./api/fetchAttendanceData";
const AttendanceTable = ({data}) => {
  // const [data, setData] = useState(null);

  // Fetch attendance data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const semester = 5;
  //       const subjectId = "CS501";
  //       const branch = "CS";
  //       const division = "A";
  //       const batch = "01";

  //       // Replace `fetchAttendanceData` with the actual API call or function
  //       const response = await fetchAttendanceData(
  //         semester,
  //         subjectId,
  //         branch,
  //         division,
  //         batch
  //       );

  //       console.log("Attendance Data:", response);
  //       setData(response);
  //     } catch (error) {
  //       console.error("Error fetching attendance data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (!data || !data.attendance || data.attendance.length === 0) {
    // If data is empty or invalid, render an empty div
    return <div>No data available</div>;
  }

  const exportToCSV = () => {
    const { students, attendanceRows, dates } = calculateData(data);

    const headers = ["Name", "PRN", ...dates, "Out of", "Student %"];

    // Prepare rows for student data
    const rows = students.map((student) => {
      const studentRow = [
        student.name,
        student.prn,
        ...attendanceRows.map((row) =>
          row.students.find((s) => s.prn === student.prn)?.attendance || 0
        ),
        `${student.cumulativeAttendance} / ${dates.length}`,
        `${((student.cumulativeAttendance / dates.length) * 100).toFixed(2)}%`,
      ];
      return studentRow;
    });

    // Prepare Lecture % row
    const lecturePercentageRow = [
      "Lecture %",
      "",
      ...attendanceRows.map((row) => `${row.lecturePercentage}%`),
      "",
      "",
    ];

    // Combine headers, rows, and Lecture % row
    const csvContent = [headers, ...rows, lecturePercentageRow]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    // Generate CSV file and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Attendance.csv";
    link.click();
  };

  const calculateData = (data) => {
    const students = {}; // Store cumulative attendance for each student
    const dates = [];
    const attendanceRows = [];
    const totalStudents = data.attendance[0]?.students.length || 0;

    // Initialize student data with names, PRNs, and starting attendance as 0
    data.attendance[0]?.students.forEach((student) => {
      students[student.prn] = {
        name: student.name,
        prn: student.prn,
        cumulativeAttendance: 0,
      };
    });

    // Iterate through attendance records
    data.attendance.forEach((record) => {
      const date = new Date(record.date).toLocaleDateString(); // Format date
      const studentData = record.students;
      if (date) dates.push(date);

      studentData.forEach((student) => {
        // Add attendance to cumulative value or keep previous value if absent
        students[student.prn].cumulativeAttendance += student.attendance;
      });

      // Calculate lecture percentage for the current date
      const presentCount = studentData.filter(
        (student) => student.attendance === 1
      ).length;
      const lecturePercentage = ((presentCount / totalStudents) * 100).toFixed(
        2
      );

      attendanceRows.push({
        date,
        students: studentData.map((s) => ({
          prn: s.prn,
          attendance: students[s.prn].cumulativeAttendance,
        })),
        lecturePercentage,
      });
    });

    return { students: Object.values(students), attendanceRows, dates };
  };

  // Process the data
  const { students, attendanceRows, dates } = calculateData(data);

  return (
    <div style={{ overflowX: "auto", padding: "20px" }}>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#007BFF", color: "#FFFFFF" }}>
            <th style={{ padding: "10px" }}>Name</th>
            <th style={{ padding: "10px" }}>PRN</th>
            {dates.map((date, index) => (
              <th key={index} style={{ padding: "10px" }}>
                {date}
              </th>
            ))}
            <th style={{ padding: "10px" }}>Out of</th>
            <th style={{ padding: "10px" }}>Student %</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const studentPercentage = (
              (student.cumulativeAttendance / dates.length) *
              100
            ).toFixed(2);

            return (
              <tr key={student.prn} style={{ backgroundColor: "#F9F9F9" }}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {student.name}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {student.prn}
                </td>
                {attendanceRows.map((row, index) => {
                  const studentAttendance = row.students.find(
                    (s) => s.prn === student.prn
                  )?.attendance;

                  return (
                    <td
                      key={index}
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                        backgroundColor:
                          studentAttendance > 0 ? "#DFF0D8" : "#F2DEDE",
                      }}
                    >
                      {studentAttendance || 0}
                    </td>
                  );
                })}
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {student.cumulativeAttendance} / {dates.length}
                </td>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                    fontWeight: "bold",
                  }}
                >
                  {studentPercentage}%
                </td>
              </tr>
            );
          })}
          <tr style={{ backgroundColor: "#E9ECEF", fontWeight: "bold" }}>
            <td colSpan="2" style={{ textAlign: "right", padding: "10px" }}>
              Lecture %
            </td>
            {attendanceRows.map((row, index) => (
              <td key={index} style={{ padding: "10px" }}>
                {row.lecturePercentage}%
              </td>
            ))}
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={exportToCSV}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Export to CSV
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;
