import axios from "axios";

const BASE_URL = "https://attendance-backend-gold.vercel.app";

/**
 * Fetch attendance data based on provided parameters.
 * @param {string} semester - Semester (e.g., "5").
 * @param {string} subject_id - Subject ID (e.g., "CS01").
 * @param {string} branch - Branch (e.g., "CS").
 * @param {string} division - Division (e.g., "A").
 * @param {string} batch - Batch (e.g., "01" or "ALL").
 * @returns {Promise<object>} - Attendance data or error.
 */
export const getAttendanceData = async (
  semester,
  subject_id,
  branch,
  division,
  batch
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/faculty/getAllAttendanceData`,
      {
        params: { semester, subject_id, branch, division, batch },
      }
    );

    return response.data; // Return the attendance data
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      console.error("No response received from the server:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    throw error; // Re-throw error for handling in the calling component
  }
};
