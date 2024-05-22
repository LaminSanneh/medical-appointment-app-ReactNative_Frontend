import axios from 'axios';
import {API_URL} from '@env';
import authHeader from './authHeader';
import {CreateAppointmentData} from '../store/slices/appointmentsSlice';

export const getAppointments = async () => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    const response = await axios.get(`${API_URL}/appointments`, headers);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch appointments',
    );
  }
};

export const getAppointmentsForDoctor = async (doctorId: number) => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    const response = await axios.get(
      `${API_URL}/appointments/appointmentsForDoctor/${doctorId}`,
      headers,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch appointments',
    );
  }
};

export const getAppointment = async (appointmentId: number) => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    const response = await axios.get(
      `${API_URL}/appointments/${appointmentId}`,
      headers,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch single appointment',
    );
  }
};

export const confirmAppointment = async (appointmentId: number) => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    const response = await axios.put(
      `${API_URL}/appointments/confirmAppointment/${appointmentId}`,
      null,
      headers,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to confirm appointment',
    );
  }
};

export const unConfirmAppointment = async (appointmentId: number) => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    const response = await axios.put(
      `${API_URL}/appointments/unConfirmAppointment/${appointmentId}`,
      null,
      headers,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to unconfirm appointment',
    );
  }
};

export const getAppointmentsForDoctorAndCurrentPatient = async (
  doctorId: number,
) => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    const response = await axios.get(
      `${API_URL}/appointments/getForDoctorAndCurrentUser/${doctorId}`,
      headers,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch appointments',
    );
  }
};

export const createNewAppointment = async ({
  appointmentDateTime,
  doctorId,
}: CreateAppointmentData) => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    const response = await axios.post(
      `${API_URL}/appointments`,
      {appointment_date_time: appointmentDateTime, doctor_id: doctorId},
      headers,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to create appointments',
    );
  }
};
