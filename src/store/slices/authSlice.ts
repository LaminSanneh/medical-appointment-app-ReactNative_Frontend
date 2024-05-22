import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';
// import {api} from './index';
import {
  getUserData,
  getUserRole,
  login,
  logout,
  register,
  updateUserProfile,
} from '../../services/authService';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  isAuthenticated: boolean;
  userRole: string | null;
}

interface LoginUserData {
  email: string;
  password: string;
}

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  photoUrl: string;
  isDoctor: boolean;
  roles: string[];
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  token: null,
  isAuthenticated: false,
  userRole: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUserStart: state => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: state => {
      // state.user = action.payload;
      state.loading = false;
    },
    loginUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUserDataStart: state => {
      state.loading = true;
      state.error = null;
    },
    fetchUserDataSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    fetchUserDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileStart: state => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.user = {...state.user, ...action.payload};
      state.loading = false;
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUserStart: state => {
      state.loading = true;
      state.error = null;
    },
    logoutUserSuccess: state => {
      state.user = null;
      state.loading = false;
    },
    logoutUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerUserStart: state => {
      state.loading = true;
      state.error = null;
    },
    registerUserSuccess: state => {
      // state.user = action.payload;
      state.loading = false;
    },
    registerUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setUserRole(state, action: PayloadAction<string>) {
      state.userRole = action.payload;
    },
    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.userRole = null;
    },
  },
});

export const {
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  fetchUserDataStart,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  setToken,
  clearToken,
} = authSlice.actions;

export const loginUser = createAsyncThunk<void, LoginUserData>(
  'auth/loginUser',
  async (credentials, {dispatch}) => {
    try {
      dispatch(loginUserStart());
      const {email, password} = credentials;
      const token = await login(email, password);
      dispatch(setToken(token));
      dispatch(loginUserSuccess());
      dispatch(fetchUserData());
    } catch (error: any) {
      dispatch(loginUserFailure(error.message));
    }
  },
);

export const fetchUserData = createAsyncThunk<void, void>(
  'auth/fetchUserData',
  async (_, {dispatch}) => {
    try {
      dispatch(fetchUserDataStart());
      const userData = await getUserData();
      dispatch(fetchUserDataSuccess(userData));
    } catch (error: any) {
      dispatch(fetchUserDataFailure(error.message));
    }
  },
);

export const updateProfileForCurrentUser = createAsyncThunk<void, {}>(
  'auth/updateProfileForCurrentUser',
  async (formData, {dispatch}) => {
    try {
      dispatch(updateProfileStart());
      const userData = await updateUserProfile(formData);
      dispatch(updateProfileSuccess(userData));
    } catch (error: any) {
      dispatch(updateProfileFailure(error.message));
    }
  },
);

export const logoutUser = createAsyncThunk<void>(
  'auth/logoutUser',
  async (_, {dispatch}) => {
    try {
      dispatch(logoutUserStart());
      const response = await logout();
      dispatch(clearToken());
      dispatch(logoutUserSuccess());
    } catch (error: any) {
      dispatch(logoutUserFailure(error.message));
    }
  },
);

export const registerUser = createAsyncThunk<void, RegisterUserData>(
  'auth/registerUser',
  async (credentials, {dispatch}) => {
    try {
      dispatch(registerUserStart());
      const {name, email, password, role} = credentials;
      const response = await register(name, email, password, role);
      dispatch(registerUserSuccess());
    } catch (error: any) {
      dispatch(registerUserFailure(error.message));
    }
  },
);

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
