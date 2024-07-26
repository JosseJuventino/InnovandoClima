import axiosInstance from "./api";

export const getAllInstruments = async () => {
  try {
    const response = await axiosInstance.get('/instruments');
    return response.data.data; // Adjust based on the API response structure
  } catch (error) {
    console.error('Error fetching instruments:', error);
    throw error;
  }
};

export const getInstrumentById = async (id) => {
  try {
    const response = await axiosInstance.get(`/instruments/${id}`);
    return response.data.data; // Adjust based on the API response structure
  } catch (error) {
    console.error(`Error fetching instrument with id ${id}:`, error);
    throw error;
  }
};

export const createInstrument = async (instrumentData) => {
  try {
    const response = await axiosInstance.post('/instruments', instrumentData);
    return response.data.data; // Adjust based on the API response structure
  } catch (error) {
    console.error('Error creating instrument:', error);
    throw error;
  }
};

export const updateInstrumentById = async (id, instrumentData) => {
  try {
    const response = await axiosInstance.put(`/instruments/${id}`, instrumentData);
    return response.data.data; // Adjust based on the API response structure
  } catch (error) {
    console.error(`Error updating instrument with id ${id}:`, error);
    throw error;
  }
};

export const deleteInstrumentById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/instruments/${id}`);
    return response.data.data; // Adjust based on the API response structure
  } catch (error) {
    console.error(`Error deleting instrument with id ${id}:`, error);
    throw error;
  }
};

export const getInstrumentsByStation = async (stationId) => {
  try {
    const response = await axiosInstance.get(`/instruments/station/${stationId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching instruments for station with id ${stationId}:`, error);
    throw error;
  }
};
