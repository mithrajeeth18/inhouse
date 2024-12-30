import React, { useState, useEffect } from 'react';

const UpdateAttendance = ({ data }) => {
  const [attendanceData, setAttendanceData] = useState(data); // Original data
  const [newSessions, setNewSessions] = useState([]); // Newly added sessions
  const [isUpdated, setIsUpdated] = useState(false); // Track if data has been updated
  const [todaysDate, setTodaysDate] = useState(""); // Today's date
  const [newSessionDate, setNewSessionDate] = useState(""); // Selected date for new session

  // Get current date on component mount in dd/MM/yyyy format
  useEffect(() => {
    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    setTodaysDate(formattedDate);
  }, []);

  // Function to convert date from yyyy-mm-dd to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle checkbox change
  const handleCheckboxChange = (date, prn, isChecked) => {
    const updatedData = attendanceData.map((attendanceRecord) => {
      if (attendanceRecord.attendance[0].date === date) {
        const updatedStudents = attendanceRecord.attendance[0].students.map((student) => {
          if (student.prn === prn) {
            return { ...student, attendance: isChecked ? 1 : 0 };
          }
          return student;
        });
        return {
          ...attendanceRecord,
          attendance: [{ ...attendanceRecord.attendance[0], students: updatedStudents }],
        };
      }
      return attendanceRecord;
    });

    const updatedNewSessions = newSessions.map((session) => {
      if (session.attendance[0].date === date) {
        const updatedStudents = session.attendance[0].students.map((student) => {
          if (student.prn === prn) {
            return { ...student, attendance: isChecked ? 1 : 0 };
          }
          return student;
        });
        return {
          ...session,
          attendance: [{ ...session.attendance[0], students: updatedStudents }],
        };
      }
      return session;
    });

    setAttendanceData(updatedData);
    setNewSessions(updatedNewSessions);
    setIsUpdated(true);
  };

  // Add new session with a user-selected date
  const addSession = () => {
    if (newSessionDate) {
      const formattedDate = formatDate(newSessionDate);
       // Format the selected date
      const newSession = {
        attendance: [
          {
            date: formattedDate, // Use the formatted date
            semId: 'SEM123',
            students: attendanceData[0].attendance[0].students.map((student) => ({
              ...student,
              attendance: 1, // Set default attendance to 1 (present)
            })),
          },
        ],
      };
      setNewSessions([...newSessions, newSession]);
      setIsUpdated(false);
    }
  };

  // Update the data and merge the new session data with the old
  const handleUpdate = () => {
    const updatedData = [...attendanceData, ...newSessions];
    setAttendanceData(updatedData);
    console.log(updatedData);
    setNewSessions([]); // Clear new sessions after update
    setIsUpdated(false); // Reset the update flag
  };

  // Sort data based on the date in ascending order
  const sortedData = [...attendanceData, ...newSessions].sort((a, b) => {
    const dateA = a.attendance[0].date.split('/').reverse().join('');
    const dateB = b.attendance[0].date.split('/').reverse().join('');
    return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
  });

  return (
    <div style={{ overflowX: 'auto', padding: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Select Date for New Session: </label>
        <input
          type="date"
          onChange={(e) => setNewSessionDate(e.target.value)}
          value={newSessionDate}
          style={{ marginLeft: '10px' }}
        />
        {formatDate(newSessionDate)}
        <button
          onClick={addSession}
          style={{ marginLeft: '10px', padding: '8px 16px', backgroundColor: '#007BFF', color: 'white' }}
        >
          Add Session
        </button>
      </div>

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
            {sortedData.map((attendanceRecord, index) => (
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

              {sortedData.map((attendanceRecord, index) => {
                const studentAttendance = attendanceRecord.attendance[0].students.find(
                  (s) => s.prn === student.prn
                )?.attendance;

                return (
                  <td key={index} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    {newSessions.some((session) => session.attendance[0].date === attendanceRecord.attendance[0].date) ? (
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