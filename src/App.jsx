import AttendanceTable from './AttendanceTable'
import DynamicDropdowns from './dummydropdown';
import UpdateAttendance from './UpdateAttendance';
import FacultyPage from './Facultypage';
import fetchAttendanceData from './api/fetchAttendanceData';
import { useState } from 'react';

//import AttendanceTable from './dummytabel' ;
function App()
{
  
 const [selectedValues, setSelectedValues] = useState({});

  const handleSelectionChange = (values) => {
    setSelectedValues(values);
  };
  const data2 = {
  "semesters": ["5", "6", "7", "8"],
  "divisions": {
    "5": ["A", "B"],
    "6": ["A", "B"],
    "7": ["A"],
    "8": ["B"]
  },
  "batches": {
    "5": {"A": ["01", "02"], "B": ["03", "ALL"]},
    "6": {"A": ["01"], "B": ["ALL"]},
    "7": {"A": ["ALL"]},
    "8": {"B": ["02", "ALL"]}
  }
}

  const data1 = {

    "attendance": [
      {
        "date": "2024-12-23T04:30:00.000Z",
        "sem_id": "5_CS_A_01_CS501_F001",
        "students": [
          {
            "name": "Alice Green",
            "prn": "PRN005",
            "attendance": 0
          }
        ]
      },
      {
        "date": "2024-12-22T23:00:00.000Z",
        "sem_id": "5_CS_A_01_CS501_F001",
        "students": [
          {
            "name": "Alice Green",
            "prn": "PRN005",
            "attendance": 1
          }
        ]
      }
    ]
  }
  
  const data = [
    {
      attendance: [
        {
          date: '02/08/2024',
          semId: 'SEM123',
          students: [
            { name: 'John Doe', prn: 'PRN12345', attendance: 1 },
            { name: 'Jane Smith', prn: 'PRN67890', attendance: 0 },
            { name: 'Mithra', prn: 'PRN12340', attendance: 1 },
          ],
        },
      ],
    },
    {
      attendance: [
        {
          date: '03/08/2024',
          semId: 'SEM123',
          students: [
            { name: 'John Doe', prn: 'PRN12345', attendance: 1 },
            { name: 'Jane Smith', prn: 'PRN67890', attendance: 0 },
            { name: 'Mithra', prn: 'PRN12340', attendance: 0 },
          ],
        },
      ],
    },
    {
      attendance: [
        {
          date: '04/08/2024',
          semId: 'SEM123',
          students: [
            { name: 'John Doe', prn: 'PRN12345', attendance: 1 },
            { name: 'Jane Smith', prn: 'PRN67890', attendance: 0 },
            { name: 'Mithra', prn: 'PRN12340', attendance: 1 },
          ],
        },
      ],
    },
    {
      attendance: [
        {
          date: '05/08/2024',
          semId: 'SEM123',
          students: [
            { name: 'John Doe', prn: 'PRN12345', attendance: 1 },
            { name: 'Jane Smith', prn: 'PRN67890', attendance: 1 },
            { name: 'Mithra', prn: 'PRN12340', attendance: 1 },
          ],
        },
      ],
    },
    {
      attendance: [
        {
          date: '05/08/2024',
          semId: 'SEM123',
          students: [
            { name: 'John Doe', prn: 'PRN12345', attendance: 1 },
            { name: 'Jane Smith', prn: 'PRN67890', attendance: 1 },
            { name: 'Mithra', prn: 'PRN12340', attendance: 1 },
          ],
        },
      ],
    },
    {
      attendance: [
        {
          date: '08/08/2024',
          semId: 'SEM123',
          students: [
            { name: 'John Doe', prn: 'PRN12345', attendance: 1 },
            { name: 'Jane Smith', prn: 'PRN67890', attendance: 1 },
            { name: 'Mithra', prn: 'PRN12340', attendance: 0 },
          ],
        },
      ],
    },
    {
      attendance: [
        {
          date: '08/08/2024',
          semId: 'SEM123',
          students: [
            { name: 'John Doe', prn: 'PRN12345', attendance: 1 },
            { name: 'Jane Smith', prn: 'PRN67890', attendance: 1 },
            { name: 'Mithra', prn: 'PRN12340', attendance: 0 },
          ],
        },
      ],
    },
    {
      attendance: [
        {
          date: '24/12/2024',
          semId: 'SEM123',
          students: [
            { name: 'John Doe', prn: 'PRN12345', attendance: 1 },
            { name: 'Jane Smith', prn: 'PRN67890', attendance: 1 },
            { name: 'Mithra', prn: 'PRN12340', attendance: 0 },
          ],
        },
      ],
    },
    {
      attendance: [
        {
          date: '08/08/2024',
          semId: 'SEM123',
          students: [
            { name: 'John Doe', prn: 'PRN12345', attendance: 1 },
            { name: 'Jane Smith', prn: 'PRN67890', attendance: 1 },
            { name: 'Mithra', prn: 'PRN12340', attendance: 0 },
          ],
        },
      ],
    },
  
  ];
  return (
    <>
      <div>
        {/* <AttendanceTable data={data}  /> */}
        {/* <DropDown data={data2}/> */}
        
        {/* <FacultyPage /> */}
        {/* <UpdateAttendance data={data}/> */}
        <DynamicDropdowns data={data2} onSelectionChange={handleSelectionChange}/>
      </div>
    </>
  )
}

export default App
