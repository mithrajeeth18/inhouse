// async function getAttendanceData() {
//   const url =
//     "https://attendance-backend-gold.vercel.app/faculty/getAllAttendanceData";
//   const queryParams = {
//     semester: 5,
//     subject_id: "CS501",
//     branch: "CS",
//     division: "A",
//     batch: "01",
//   };

//   // Construct the query string
//   const queryString = new URLSearchParams(queryParams).toString();

//   try {
//     // Make the GET request
//     const response = await fetch(`${url}?${queryString}`);

//     // Check if the response is ok (status code 200-299)
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} ${response.statusText}`);
//     }

//     // Parse and log the JSON data
//     const data = await response.json();
//     console.log("Attendance Data:", data);

//     return data; // Return the data if needed
//   } catch (error) {
//     // Log any errors
//     console.error("Failed to fetch attendance data:", error.message);
//   }
// }

// // Call the function to test it
// getAttendanceData();


const data = {
  semester: "5",
  branch: "CS",
  division: "A",
  subject_id: "CS501",
  faculty_id: "F001",
  attendance: [
    {
      date: "2024-12-01T09:00:00Z",
      students: [
        { prn: "PRN001", attendance: 1 }, // Present
        { prn: "PRN002", attendance: 0 }, // Absent
        { prn: "PRN005", attendance: 1 }, // Present
        // Include all students for the date
      ],
    },
  ],
};

fetch("https://attendance-backend-gold.vercel.app/faculty/updateAttendanceData", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json", // Ensure JSON content type
  },
  body: JSON.stringify(data), // Convert the data to JSON string
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((responseData) => {
    console.log("Success:", responseData);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
