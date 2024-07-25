// src/services/stationService.js
import axiosInstance from "./api"

export const getAllStations = async () => {
  try {
    const response = await axiosInstance.get('/stations');
    return response.data.data; // Ajusta esto según la estructura de tu respuesta
  } catch (error) {
    console.error('Error fetching stations:', error);
    throw error;
  }
};

export const getStationById = async (id) => {
  try {
    const response = await axiosInstance.get(`/stations/${id}`);
    return response.data.data; // Ajusta esto según la estructura de tu respuesta
  } catch (error) {
    console.error(`Error fetching station with id ${id}:`, error);
    throw error;
  }
};

export const createStation = async (stationData) => {
  try {
    const response = await axiosInstance.post('/stations', stationData);
    return response.data.data; // Ajusta esto según la estructura de tu respuesta
  } catch (error) {
    console.error('Error creating station:', error);
    throw error;
  }
};

export const updateStationById = async (id, stationData) => {
  try {
    const response = await axiosInstance.put(`/stations/${id}`, stationData);
    return response.data.data; // Ajusta esto según la estructura de tu respuesta
  } catch (error) {
    console.error(`Error updating station with id ${id}:`, error);
    throw error;
  }
};

export const deleteStationById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/stations/${id}`);
    return response.data.data; // Ajusta esto según la estructura de tu respuesta
  } catch (error) {
    console.error(`Error deleting station with id ${id}:`, error);
    throw error;
  }
};
