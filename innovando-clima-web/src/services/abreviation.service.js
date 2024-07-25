import axiosInstance from "./api"

export const getAbbreviations = async () => {
  try {
    const response = await axiosInstance.get(`/abbreviations`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching abbreviations:', error);
    throw error;
  }
};

export const getAbbreviationByAbbreviation = async (abbreviation) => {
  try {
    const response = await axiosInstance.get(`/abbreviations/${abbreviation}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching abbreviation ${abbreviation}:`, error);
    throw error;
  }
};
