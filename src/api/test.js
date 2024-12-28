async function getAttendanceData() {
  const url =
    "https://attendance-backend-gold.vercel.app/faculty/getAllAttendanceData";
  const queryParams = {
    semester: 5,
    subject_id: "CS501",
    branch: "CS",
    division: "A",
    batch: "01",
  };

  // Construct the query string
  const queryString = new URLSearchParams(queryParams).toString();

  try {
    // Make the GET request
    const response = await fetch(`${url}?${queryString}`);

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Parse and log the JSON data
    const data = await response.json();
    console.log("Attendance Data:", data);

    return data; // Return the data if needed
  } catch (error) {
    // Log any errors
    console.error("Failed to fetch attendance data:", error.message);
  }
}

// Call the function to test it
getAttendanceData();
