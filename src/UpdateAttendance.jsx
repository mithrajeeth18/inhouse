import React, { useState, useEffect } from 'react';

const UpdateAttendance = ({ data }) => {
  const [attendanceData, setAttendanceData] = useState(data.attendance); // Original data
  const [newSessions, setNewSessions] = useState([]); // Newly added sessions
  const [isUpdated, setIsUpdated] = useState(false); // Track if data has been updated
  const [todaysDate, setTodaysDate] = useState(""); // Today's date
  const [newSessionDate, setNewSessionDate] = useState(""); // Selected date for new session

  // Get current date on component mount in dd/MM/yyyy format
  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0]; // ISO format
  setTodaysDate(formattedDate);

    
  }, []);

  // Function to convert date from yyyy-mm-dd to dd/mm/yyyy
  const formatDate = (isoDateString) =>
  {
    
  const [year, month, day] = isoDateString.split("-");
  return `${day}/${month}/${year}`;
};

  const convertToDDMMYYYY = (dateString) => {
  try {
    // Parse the date string into a JavaScript Date object
    const date = new Date(dateString);

    if (isNaN(date)) {
      throw new Error("Invalid date string");
    }

    // Extract day, month, and year
    const day = String(date.getUTCDate()).padStart(2, '0'); // Day (UTC)
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month (0-based, so +1)
    const year = date.getUTCFullYear(); // Year

    // Return formatted date as dd/mm/yyyy
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error converting date:", error.message);
    return "Invalid Date";
  }
};






  // Handle checkbox change
  const handleCheckboxChange = (date, prn, isChecked) => {
    const updatedData = attendanceData.map((attendanceRecord) => {
      if (attendanceRecord.date === date) {
        const updatedStudents = attendanceRecord.students.map((student) => {
          if (student.prn === prn) {
            return { ...student, attendance: isChecked ? 1 : 0 };
          }
          return student;
        });
        return {
          ...attendanceRecord,
          students: updatedStudents,
        };
      }
      return attendanceRecord;
    });

    const updatedNewSessions = newSessions.map((session) => {
      if (session.date === date) {
        const updatedStudents = session.students.map((student) => {
          if (student.prn === prn) {
            return { ...student, attendance: isChecked ? 1 : 0 };
          }
          return student;
        });
        return {
          ...session,
          students: updatedStudents,
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
      // const formattedDate = formatDate(newSessionDate); // Format the selected date
      const newSession = {
        date: newSessionDate, // Use the formatted date
        sem_id: attendanceData[0].sem_id, // Use sem_id from existing data
        students: attendanceData[0].students.map((student) => ({
          ...student,
          attendance: 1, // Set default attendance to 1 (present)
        })),
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
    const dateA = new Date(a.date);
const dateB = new Date(b.date);
return dateA - dateB;

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
        {}
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
                {convertToDDMMYYYY(attendanceRecord.date)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attendanceData[0]?.students.map((student) => (
            <tr key={student.prn} style={{ backgroundColor: '#F9F9F9', color: 'black' }}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                {student.name}
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                {student.prn}
              </td>

              {sortedData.map((attendanceRecord, index) => {
                const studentAttendance = attendanceRecord.students.find(
                  (s) => s.prn === student.prn
                )?.attendance;

                return (
                  <td key={index} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    {newSessions.some((session) => session.date === attendanceRecord.date) ? (
                      <input
                        type="checkbox"
                        checked={studentAttendance === 1}
                        onChange={(e) =>
                          handleCheckboxChange(
                            attendanceRecord.date,
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
