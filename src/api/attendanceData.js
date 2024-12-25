import axios from "axios";

const BASE_URL = "https://attendance-backend-gold.vercel.app";

/**
 * Fetch attendance data based on provided parameters.
 * @param {string} sem - Semester (e.g., "5").
 * @param {string} subID - Subject ID (e.g., "CS01").
 * @param {string} branch - Branch (e.g., "CS").
 * @param {string} division - Division (e.g., "A").
 * @param {string} batch - Batch (e.g., "01" or "ALL").
 * @returns {Promise<object>} - Attendance data or error.
 */
export const getAttendanceData = async (
  sem,
  subID,
  branch,
  division,
  batch
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/faculty/getAllAttendanceData`,
      {
        params: {
          semester: sem,
          subject_id: subID,
          branch: branch,
          division: division,
          batch: batch,
        },
      }
    );

    return response.data; // Return the attendance data
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    throw error; // Re-throw error for handling in the calling component
  }
};
