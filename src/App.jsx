import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AttendanceTable from './AttendanceTable'
import GetReport from './GetReport'



function App() {
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
  
];
  return (
    <>
      <div>
           <AttendanceTable data={data} />
        </div>
    </>
  )
}

export default App
