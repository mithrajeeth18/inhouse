// Install axios if not already installed: npm install axios
import axios from "axios";

/**
 * Fetch attendance data from the API.
 *
 * @param {number} semester - The semester value.
 * @param {string} subjectId - The subject ID.
 * @param {string} branch - The branch value.
 * @param {string} division - The division value.
 * @param {string} batch - The batch value.
 * @returns {Promise} - A promise resolving to the API response data.
 */
const fetchAttendanceData = async (
  semester,
  subjectId,
  branch,
  division,
  batch
) => {
  try {
    // Construct the URL dynamically based on the parameters
    const url = `https://attendance-backend-gold.vercel.app/faculty/getAllAttendanceData`;

    const params = {
      semester,
      subject_id: subjectId,
      branch,
      division,
      batch,
    };

    const response = await axios.get(url, { params });

    // Log or return the response data
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    throw error;
  }
};
// fetchAttendanceData(5,"CS501","CS","A","01");
export default fetchAttendanceData;
