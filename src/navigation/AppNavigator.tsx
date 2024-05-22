import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import StaffManagementScreen from '../screens/StaffManagementScreen';
import {
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import RegisterScreen from '../screens/RegisterScreen';
import AppointmentSchedulingScreen from '../screens/AppointmentSchedulingScreen';
import AppointmentsListScreen from '../screens/AppointmentsListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import authHeader from '../services/authHeader';
import DoctorsScreen from '../screens/DoctorsScreen';
import UpdateUserProfileScreen from '../screens/UpdateUserProfileScreen';
import {Alert} from 'react-native';
import {fetchUserData, logoutUser} from '../store/slices/authSlice';
import DoctorAppointmentsListScreen from '../screens/DoctorAppointmentsListScreen';
import DoctorAppointmentConfirmationScreen from '../screens/DoctorAppointmentConfirmationScreen';
import LogoutScreen from '../screens/LogoutScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Logout: undefined;
  Register: undefined;
  Admin: undefined;
  Doctor: undefined;
  Receptionist: undefined;
  Patient: undefined;
  Doctors: undefined;
  Nurses: undefined;
  'Admin Staff': undefined;
  'Add Staff Member': undefined;
  'Update Profile': undefined;
  'Manage Staff Schedules': undefined;
  AppointmentScheduling: {
    doctorId: number;
  };
  AppointmentsList: undefined;
  DoctorAppointmentsList: undefined;
  DoctorAppointmentConfirmation: {
    appointmentId: number;
  };
  StaffManagement: undefined;
  Messaging: undefined;
};

export type ScreenProps = DrawerNavigationProp<
  RootStackParamList,
  'AppointmentScheduling'
  // | 'Home'
  // | 'Register'
  // | 'Transaction History'
  // | 'Update Profile'
  // | 'Update'
  // | 'Login'
  // | 'Logout'
>;

const Drawer = createDrawerNavigator<RootStackParamList>();

const AppNavigator = () => {
  const dispatch = useAppDispatch();
  const isTest = false;
  // const user = useAppSelector(state => {
  //   return state.auth.user;
  // });

  useEffect(() => {
    // TODO: Get token expiry from backend
    const tokenExpirationTime = 60 * 60 * 1000; // 1 hour
    const logoutTimer = setTimeout(() => {
      // dispatch(logoutUser());
      Alert.alert(
        'Session Expired',
        'Your session has expired. Please log in again.',
      );
    }, tokenExpirationTime);

    return () => clearTimeout(logoutTimer);
  }, [dispatch]);

  // AsyncStorage.multiRemove(['persist:root'], () => {
  AsyncStorage.getAllKeys((_err, keys) => {
    return AsyncStorage.multiGet(keys, (err2, values) => {
      console.log('Cached keys');
      console.log(keys);
      console.log('Cached values');
      console.log(values);
    });
  });
  // });

  const token = useAppSelector(state => state.auth.token);

  let isAuthenticated = false;

  if (token !== null) {
    authHeader.initializeToken(token);
    isAuthenticated = true;
    dispatch(fetchUserData()).then(response => {
      console.log('user data');
      console.log(response);
      console.log(response.payload);
    });
    // if (user?.id) {
    //   // setIsAuthenticated(true);
    // }
    // dispatch(fetchUserData())
    //   .then(results => {
    //     // isAuthenticated = true;
    //     console.log('got user data');
    //     console.log(results);
    //   })
    //   .catch(() => {
    //     console.log('Inside catch');
    //   });
  }

  // let initialRouteName = 'AppointmentsList';

  // if (user?.isDoctor) {
  //   initialRouteName = 'DoctorAppointmentsList';
  // }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        defaultStatus={isTest ? 'open' : 'closed'}
        // TODO: FInd a way to show appointmens list for doctor or patient
        initialRouteName="AppointmentsList">
        {isAuthenticated ? (
          <>
            <Drawer.Screen
              name="AppointmentScheduling"
              component={AppointmentSchedulingScreen}
            />
            <Drawer.Screen
              name="AppointmentsList"
              component={AppointmentsListScreen}
            />
            <Drawer.Screen
              name="DoctorAppointmentsList"
              component={DoctorAppointmentsListScreen}
            />
            <Drawer.Screen
              name="DoctorAppointmentConfirmation"
              component={DoctorAppointmentConfirmationScreen}
            />
            <Drawer.Screen name="Doctors" component={DoctorsScreen} />
            <Drawer.Screen
              name="Update Profile"
              component={UpdateUserProfileScreen}
            />
            <Drawer.Screen name="Logout" component={LogoutScreen} />
          </>
        ) : (
          <>
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
