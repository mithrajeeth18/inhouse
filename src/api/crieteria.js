import axios from "axios";

/**
 * Fetch criteria for the report and ensure the exact format
 * @returns {Promise<Object>} - Returns the formatted criteria data
 */
const getCriteria = async () => {
  const endpoint =
    "https://attendance-backend-gold.vercel.app/principal/getCriteria";

  try {
    const response = await axios.get(endpoint);

    // Transform response to match the exact desired format
    const data = response.data;

    const formattedData = {
      semesters: data.semesters || [],
      branches: data.branches || {},
      divisions: data.divisions || {},
      batches: data.batches || {},
    };

    console.log("Formatted Criteria Data:", formattedData);
    return formattedData;
  } catch (error) {
    console.error("Error fetching criteria:", error.message);
    throw error;
  }
};
getCriteria();
export default getCriteria;
