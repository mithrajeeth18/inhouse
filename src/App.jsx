import AttendanceTable from './AttendanceTable'
import UpdateAttendance from './UpdateAttendance';


function App()
{
  
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
        <AttendanceTable data={data1} />
        
      </div>
    </>
  )
}

export default App
