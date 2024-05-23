import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  confirmAppointment,
  createNewAppointment,
  getAppointment,
  getAppointments,
  getAppointmentsForDoctorAndCurrentPatient,
  unConfirmAppointment,
} from '../../services/appointmentsService';

export interface CreateAppointmentData {
  appointmentDateTime: string;
  doctorId: number;
}

export const fetchAppointments = createAsyncThunk<void, void>(
  'appointments/fetchAppointments',
  async () => {
    return await getAppointments();
  },
);

export const fetchAppointment = createAsyncThunk<void, number>(
  'appointments/fetchAppointment',
  async (appointmentId: number) => {
    return await getAppointment(appointmentId);
  },
);

export const confirmAppointmentForDoctor = createAsyncThunk<void, number>(
  'appointments/confirmAppointmentForDoctor',
  async (appointmentId: number) => {
    return await confirmAppointment(appointmentId);
  },
);

export const unConfirmAppointmentForDoctor = createAsyncThunk<void, number>(
  'appointments/unConfirmAppointmentForDoctor',
  async (appointmentId: number) => {
    return await unConfirmAppointment(appointmentId);
  },
);

export const fetchAppointmentsForDoctorAndCurrentPatient = createAsyncThunk<
  void,
  number
>(
  'appointments/fetchAppointmentsForDoctorAndCurrentPatient',
  async (doctorId: number) => {
    return await getAppointmentsForDoctorAndCurrentPatient(doctorId);
  },
);

export const createAppointment = createAsyncThunk<void, CreateAppointmentData>(
  'appointments/createAppointment',
  async ({appointmentDateTime, doctorId}) => {
    return await createNewAppointment({appointmentDateTime, doctorId});
  },
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAppointments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch appointments';
      })
      .addCase(createAppointment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Create appointments failed';
      });
  },
});

export default appointmentsSlice.reducer;
