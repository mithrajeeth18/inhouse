import React from 'react';

const AttendanceTable = ({ data }) => {
  const calculateData = (data) => {
    const students = {}; // Store cumulative attendance for each student
    const dates = [];
    const attendanceRows = [];
    const totalStudents = data[0]?.attendance[0]?.students.length || 0;

    // Initialize student data with names, PRNs, and starting attendance as 0
    data[0]?.attendance[0]?.students.forEach((student) => {
      students[student.prn] = {
        name: student.name,
        prn: student.prn,
        cumulativeAttendance: 0,
      };
    });

    // Iterate through attendance records
    data.forEach((record) => {
      const date = record.attendance[0]?.date;
      const studentData = record.attendance[0]?.students;
      if (date) dates.push(date);

      studentData.forEach((student) => {
        // Add attendance to cumulative value or keep previous value if absent
        students[student.prn].cumulativeAttendance += student.attendance;
      });

      // Calculate lecture percentage for the current date
      const presentCount = studentData.filter(
        (student) => student.attendance === 1
      ).length;
      const lecturePercentage = ((presentCount / totalStudents) * 100).toFixed(2);

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
    <div style={{ overflowX: 'auto', padding: '20px' }}>
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#007BFF', color: '#FFFFFF' }}>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>PRN</th>
            {dates.map((date, index) => (
              <th key={index} style={{ padding: '10px' }}>
                {date}
              </th>
            ))}
            <th style={{ padding: '10px' }}>Out of</th>
            <th style={{ padding: '10px' }}>Student %</th>
            
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            // Calculate student percentage
            const studentPercentage = (
              (student.cumulativeAttendance / dates.length) *
              100
            ).toFixed(2);

            return (
              <tr key={student.prn} style={{ backgroundColor: '#F9F9F9', color: 'black' }}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {student.name}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {student.prn}
                </td>
                {attendanceRows.map((row, index) => {
                  const studentAttendance = row.students.find(
                    (s) => s.prn === student.prn
                  )?.attendance;

                  const prevAttendance =
                    index > 0
                      ? attendanceRows[index - 1].students.find(
                          (s) => s.prn === student.prn
                        )?.attendance || 0
                      : 0;

                  return (
                    <td
                      key={index}
                      style={{
                        padding: '10px',
                        borderBottom: '1px solid #ddd',
                        backgroundColor:
                          studentAttendance === prevAttendance
                            ? '#F2DEDE'
                            : '#DFF0D8',
                        color: studentAttendance === prevAttendance ? '#A94442' : '#3C763D',
                      }}
                    >
                      {studentAttendance || 0}
                    </td>
                  );
                })}
               
                <td
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  {student.cumulativeAttendance} / {dates.length}
                    </td>
                     <td
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #ddd',
                    fontWeight: 'bold',
                    color: studentPercentage >= 75 ? '#3C763D' : '#A94442',
                  }}
                >
                  {studentPercentage}%
                </td>
              </tr>
            );
          })}
          {/* Add lecture percentage row */}
          <tr style={{ backgroundColor: '#E9ECEF', fontWeight: 'bold' }}>
            <td
              colSpan="2"
              style={{
                padding: '10px',
                borderBottom: '1px solid #ddd',
                textAlign: 'right',
                color: 'black',
              }}
            >
              Lecture %
            </td>
            {attendanceRows.map((row, index) => (
              <td
                key={index}
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #ddd',
                  fontWeight: 'bold',
                  backgroundColor: '#FFF3CD',
                  color: '#856404',
                }}
              >
                {row.lecturePercentage}%
              </td>
            ))}
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}></td>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
