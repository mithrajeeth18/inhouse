import React, { useState } from 'react';
 

const attendanceData = {
    attendance: [
      {
        date: '2024-12-01',
        semId: 'SEM123',
        students: [
          { name: 'John Doe', prn: 'PRN12345', attendance: 1 },
          { name: 'Jane Smith', prn: 'PRN67890', attendance: 1 },
          { name: 'Alice Johnson', prn: 'PRN11223', attendance: 0 },
        ],
      },
      {
        date: '2024-12-02',
        semId: 'SEM123',
        students: [
          { name: 'John Doe', prn: 'PRN12345', attendance: 1 },
          { name: 'Jane Smith', prn: 'PRN67890', attendance: 1 },
          { name: 'Alice Johnson', prn: 'PRN11223', attendance: 1 },
        ],
      },
      {
        date: '2024-12-03',
        semId: 'SEM123',
        students: [
          { name: 'John Doe', prn: 'PRN12345', attendance: 1 },
          { name: 'Jane Smith', prn: 'PRN67890', attendance: 1 },
          { name: 'Alice Johnson', prn: 'PRN11223', attendance: 0 },
        ],
      },
      {
        date: '2024-12-04',
        semId: 'SEM123',
        students: [
          { name: 'John Doe', prn: 'PRN12345', attendance: 1 },
          { name: 'Jane Smith', prn: 'PRN67890', attendance: 0 },
          { name: 'Alice Johnson', prn: 'PRN11223', attendance: 0 },
        ],
      },
      {
        date: '2024-12-05',
        semId: 'SEM123',
        students: [
          { name: 'John Doe', prn: 'PRN12345', attendance: 1 },
          { name: 'Jane Smith', prn: 'PRN67890', attendance: 1 },
          { name: 'Alice Johnson', prn: 'PRN11223', attendance: 0 },
        ],
      },
    ],
  };
 
  const GetReport = () => {
    const [selectedOptions, setSelectedOptions] = useState({
      dropdown1: '', // Semester
      dropdown2: '', // Department
      dropdown3: '', // Batch
      dropdown4: '', // Subject
      dropdown5: '', // Division (if applicable)
    });
 
    const Semesters = [
      { value: 'SEM123', label: 'Semester 123' },
      { value: 'SEM124', label: 'Semester 124' },
      { value: 'SEM125', label: 'Semester 125' },
    ];
 
    const Departments = [
      { value: 'CSE', label: 'Computer Science' },
      { value: 'ECE', label: 'Electronics' },
      { value: 'ME', label: 'Mechanical' },
    ];
 
    const Batches = [
      { value: 'B1', label: 'Batch 1' },
      { value: 'B2', label: 'Batch 2' },
      { value: 'B3', label: 'Batch 3' },
    ];
 
    const Subjects = [
      { value: 'Math', label: 'Mathematics' },
      { value: 'Physics', label: 'Physics' },
      { value: 'Chem', label: 'Chemistry' },
    ];
 
    const Divisions = [
      { value: 'A', label: 'Division A' },
      { value: 'B', label: 'Division B' },
    ];
 
    const handleSelect = (dropdown, value) => {
      setSelectedOptions((prev) => ({ ...prev, [dropdown]: value }));
    };
 
    const selectedSemester = selectedOptions.dropdown1;
    const filteredAttendance = attendanceData.attendance.filter(
      (record) => record.semId === selectedSemester
    );
 
    const isDivisionRequired = selectedOptions.dropdown2 === 'CSE';
 
    // Flatten attendance data horizontally (dates as columns)
    const students = filteredAttendance.reduce((acc, record) => {
      record.students.forEach((student) => {
        // Find if student already exists in the accumulator
        const existingStudent = acc.find((s) => s.prn === student.prn);
        if (existingStudent) {
          // Add the attendance value under the date
          existingStudent.attendance[record.date] = student.attendance;
        } else {
          // Add new student with attendance data for the date
          acc.push({
            name: student.name,
            prn: student.prn,
            attendance: { [record.date]: student.attendance },
          });
        }
      });
      return acc;
    }, []);
 
    return (
      <div className="flex flex-col space-y-4 p-6 mx-auto">
        {/* Dropdowns */}
        <div className='flex flex-col max-w-md justify-center ml-[500px]'>
        <div>
          <label className="block mb-2 font-medium">Semester:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedOptions.dropdown1}
            onChange={(e) => handleSelect('dropdown1', e.target.value)}
          >
            <option value="">Select an option</option>
            {Semesters.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
 
        <div>
          <label className="block mb-2 font-medium">Department:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedOptions.dropdown2}
            onChange={(e) => handleSelect('dropdown2', e.target.value)}
          >
            <option value="">Select an option</option>
            {Departments.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
 
        <div>
          <label className="block mb-2 font-medium">Batch:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedOptions.dropdown3}
            onChange={(e) => handleSelect('dropdown3', e.target.value)}
          >
            <option value="">Select an option</option>
            {Batches.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
 
        <div>
          <label className="block mb-2 font-medium">Subject:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedOptions.dropdown4}
            onChange={(e) => handleSelect('dropdown4', e.target.value)}
          >
            <option value="">Select an option</option>
            {Subjects.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
 
        {/* Division Dropdown */}
        {isDivisionRequired && (
          <div>
            <label className="block mb-2 font-medium">Division:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedOptions.dropdown5}
              onChange={(e) => handleSelect('dropdown5', e.target.value)}
            >
              <option value="">Select an option</option>
              {Divisions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
        </div>
 
       
        {students.length > 0 ? (
          <div className="flex justify-center">
          <div className="parent mt-4 p-4 bg-gray-100 rounded max-w-lg">
            <h3 className="font-medium mb-2">Attendance Records:</h3>
            <div className="overflow-x-auto">
              <table className="child w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2 sticky left-0 bg-gray-200">Name</th>
                    <th className="border border-gray-300 px-4 py-2 sticky left-0 bg-gray-200">PRN</th>
                    {filteredAttendance.map((record, index) => (
                      <th key={index} className="border border-gray-300 px-4 py-2">
                        {record.date}
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2 sticky left-0 bg-white">{student.name}</td>
                      <td className="border border-gray-300 px-4 py-2 sticky left-0 bg-white">{student.prn}</td>
                      {filteredAttendance.map((record) => (
                        <td key={record.date} className="border border-gray-300 px-4 py-2">
                          {student.attendance[record.date]+student.attendance[record.date - 1]}
                         
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody> */}
                <tbody>
  {students.map((student, index) => (
    <tr key={index}>
      {/* Name column with sticky positioning */}
      <td className="border border-gray-300 px-4 py-2 sticky left-0 bg-white">{student.name}</td>
      {/* PRN column with sticky positioning */}
      <td className="border border-gray-300 px-4 py-2 sticky left-0 bg-white">{student.prn}</td>
      {/* Attendance columns */}
      {filteredAttendance.map((record, recordIndex) => {
        // Safely calculate attendance
        const currentAttendance = student.attendance[record.date] || 0;
        const previousAttendance = recordIndex > 0
          ? student.attendance[filteredAttendance[recordIndex - 1].date]
          : 0;
 
        // Add current and previous attendance
        const totalAttendance = currentAttendance + previousAttendance;
 
        return (
          <td key={record.date} className="border border-gray-300 px-4 py-2">
            {totalAttendance}
          </td>
        );
      })}
    </tr>
  ))}
</tbody>
 
              </table>
            </div>
          </div>
        </div>
       
       
        ) : (
          selectedSemester && (
            <p className="text-gray-600 mt-4">
              No attendance records found for this semester.
            </p>
          )
        )}
      </div>
    );
  };
 
  export default GetReport;