import React, { useState } from 'react';

const UpdateAttendance = ({ data }) => {
  // Initialize state with the attendance data passed as props
  const [attendanceData, setAttendanceData] = useState(data);
  const [isUpdated, setIsUpdated] = useState(false); // Track if the data has been updated

  // Handle checkbox change
  const handleCheckboxChange = (date, prn, isChecked) => {
    const updatedData = attendanceData.map((attendanceRecord) => {
      if (attendanceRecord.attendance[0].date === date) {
        const updatedStudents = attendanceRecord.attendance[0].students.map(
          (student) => {
            if (student.prn === prn) {
              return { ...student, attendance: isChecked ? 1 : 0 };
            }
            return student;
          }
        );
        return {
          ...attendanceRecord,
          attendance: [{ ...attendanceRecord.attendance[0], students: updatedStudents }],
        };
      }
      return attendanceRecord;
    });
    setAttendanceData(updatedData);
    setIsUpdated(true); // Mark data as updated
  };

  // Add new session (new date)
  const addSession = () => {
    const todayDate = new Date().toLocaleDateString(); // Get today's date in format dd/mm/yyyy
    const newSession = {
      attendance: [
        {
          date: todayDate,
          semId: 'SEM123',
          students: attendanceData[0].attendance[0].students.map((student) => ({
            ...student,
            attendance: 1, // Set to 1 (present) by default
          })),
        },
      ],
    };

    setAttendanceData([...attendanceData, newSession]);
    setIsUpdated(false); // Reset the update flag
  };

  // Handle final update
  const handleUpdate = () => {
    // Here you would typically send the updated data to the backend
    console.log("Updated data: ", attendanceData);
    setIsUpdated(false); // Reset update flag after final update
  };

  return (
    <div style={{ overflowX: 'auto', padding: '20px' }}>
      <button
        onClick={addSession}
        style={{ marginBottom: '10px', padding: '8px 16px', backgroundColor: '#007BFF', color: 'white' }}
      >
        Add Session
      </button>

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
            {attendanceData.map((attendanceRecord, index) => (
              <th key={index} style={{ padding: '10px' }}>
                {attendanceRecord.attendance[0].date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attendanceData[0]?.attendance[0]?.students.map((student) => (
            <tr key={student.prn} style={{ backgroundColor: '#F9F9F9', color: 'black' }}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                {student.name}
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                {student.prn}
              </td>

              {attendanceData.map((attendanceRecord, index) => {
                const studentAttendance = attendanceRecord.attendance[0].students.find(
                  (s) => s.prn === student.prn
                )?.attendance;

                return (
                  <td key={index} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    {attendanceRecord.attendance[0].date === new Date().toLocaleDateString() ? (
                      <input
                        type="checkbox"
                        checked={studentAttendance === 1}
                        onChange={(e) =>
                          handleCheckboxChange(
                            attendanceRecord.attendance[0].date,
                            student.prn,
                            e.target.checked
                          )
                        }
                        style={{
                          width: '20px',
                          height: '20px',
                          margin: '0',
                          cursor: 'pointer',
                          transform: 'scale(1.2)',
                        }}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={studentAttendance === 1}
                        disabled
                        style={{
                          width: '20px',
                          height: '20px',
                          margin: '0',
                          cursor: 'not-allowed',
                        }}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {isUpdated && (
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleUpdate}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Update Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateAttendance;
