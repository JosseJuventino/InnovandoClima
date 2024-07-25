// src/services/record.service.js
import axiosInstance from "./api";

export const getLatestRecordsByStation = async (stationId) => {
  try {
    const response = await axiosInstance.get(`/records/latest/${stationId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching latest records:', error);
    throw error;
  }
};

export const getRecordsByStationAndDate = async (stationId, date) => {
  try {
    const response = await axiosInstance.get(`/records/station/${stationId}/date/${date}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching records by station and date:', error);
    throw error;
  }
};

export const getRecordsByStationDateAndAbbreviation = async (stationId, date, abbreviation) => {
  try {
    const response = await axiosInstance.get(`/records/station/${stationId}/date/${date}/abbreviation/${abbreviation}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};

export const getRecordsByStationAndDateRange = async (stationId, startDate, endDate, abbreviation) => {
  try {
    const response = await axiosInstance.get(`/records/station/${stationId}/range`, {
      params: { startDate, endDate, abbreviation }
    });
    console.log()
    return response.data.data;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};

export const getAllAbbreviationsRecordsByStationAndDateRange = async (stationId, startDate, endDate) => {
  try {
    const response = await axiosInstance.get(`/records/station/${stationId}/all-abbreviations`, {
      params: { startDate, endDate }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching all abbreviations records:', error);
    throw error;
  }
};