import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DropdownPage from './components/DropdownPage';
import Navbar from './components/Navbar';

const AttendancePage = () => {
  const [criteria, setCriteria] = useState({
    semesters: [],
    branches: {},
    divisions: {},
    batches: {},
  });
  const [selected, setSelected] = useState({
    semester: '',
    branch: '',
    division: '',
    batch: '',
  });
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch criteria for dropdowns
  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await axios.get(
          'https://attendance-backend-gold.vercel.app/principal/getCriteria'
        );
        setCriteria(response.data);
      } catch (err) {
        console.error('Error fetching criteria:', err);
        setError('Failed to fetch criteria.');
      }
    };

    fetchCriteria();
  }, []);

  // Handle dropdown change
  const handleDropdownChange = (updatedValue) => {
    setSelected((prev) => ({ ...prev, ...updatedValue }));
  };
  

  // Fetch attendance data
  const fetchAttendanceData = async () => {
    setLoading(true);
    setError(null);
  
    try {
      console.log('Selected:', selected);
      const { semester, branch, division, batch } = selected;
      
      console.log('Sending request with:', { semester, branch, division, batch });
  
      const response = await axios.get(
        'https://attendance-backend-gold.vercel.app/principal/fetchAttendanceData',
        { params: { semester, branch, division, batch } }
      );
      console.log('Response:', response);
      setAttendanceData(response.data);
    } catch (err) {
      console.error('Error fetching attendance data:', err.response || err);
      setError(err.response?.data?.message || 'Failed to fetch attendance data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <Navbar />
      <DropdownPage
        criteria={criteria}
        selected={selected}
        onDropdownChange={handleDropdownChange}
        onFetchData={fetchAttendanceData}
        isLoading={loading}
        error={error}
      >
        {/* Attendance Table */}
        {attendanceData.length > 0 && (
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2 border border-gray-300" rowSpan="2">
                    PRN
                  </th>
                  <th className="p-2 border border-gray-300" rowSpan="2">
                    Name
                  </th>
                  <th className="p-2 border border-gray-300" rowSpan="2">
                    Batch
                  </th>
                  <th
                    className="p-2 border border-gray-300"
                    colSpan={Object.keys(attendanceData[0].subjects).length}
                  >
                    Subjects
                  </th>
                </tr>
                <tr className="bg-blue-600 text-white">
  {Object.entries(attendanceData[0].subjects).map(([subjectCode, subjectData]) => (
    <th
      key={subjectCode}
      className="p-2 border border-gray-300 text-center font-semibold"
    >
      {subjectCode} <br />
      <span className="text-sm font-normal">({subjectData.type})</span>
    </th>
  ))}
</tr>

              </thead>
              <tbody>
                {attendanceData.map((student, index) => (
                  <tr key={index} className="text-center odd:bg-gray-100 even:bg-gray-200">
                    <td className="p-2 border border-gray-300">{student.prn}</td>
                    <td className="p-2 border border-gray-300">{student.name}</td>
                    <td className="p-2 border border-gray-300">{student.batch}</td>
                    {Object.entries(student.subjects).map(([subjectCode, subjectData]) => {
                      const attendedCount = subjectData.attendance.filter((status) => status === 1).length;
                      const attendancePercentage = (attendedCount / subjectData.attendance.length) * 100;

                      return (
                        <td key={subjectCode} className={`-2 border border-gray-300 text-center ${attendancePercentage < 75 ? 'bg-[#F2DEDD] text-red' : 'bg-[#DFEFD8] text-green'}`}>
                          {attendancePercentage.toFixed(2)}%
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && <p className="text-blue-500 text-center">Loading attendance data...</p>}

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </DropdownPage>
    </div>
  );
};

export default AttendancePage;