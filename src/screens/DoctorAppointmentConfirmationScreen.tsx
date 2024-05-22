import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import {useAppDispatch} from '../store/hooks';
import {
  confirmAppointmentForDoctor,
  fetchAppointment,
  unConfirmAppointmentForDoctor,
} from '../store/slices/appointmentsSlice';
import moment from 'moment';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList, ScreenProps} from '../navigation/AppNavigator';
import AppointConfirmationIndicator from '../components/AppointConfirmationIndicator';
import withAuthorization from '../components/withAuthorization';

const DoctorAppointmentConfirmationScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList>>();
  const appointmentId = route.params?.appointmentId;
  const navigation = useNavigation<ScreenProps>();

  const [appointment, setAppointment] = useState();

  const imagesList = [
    'http://192.168.100.5:8000/images/woman-doctor.jpg',
    'http://192.168.100.5:8000/images/woman-doctor2.jpg',
    'http://192.168.100.5:8000/images/woman-doctor3.jpg',
    'http://192.168.100.5:8000/images/man-doctor.jpg',
    'http://192.168.100.5:8000/images/man-doctor2.jpg',
    'http://192.168.100.5:8000/images/man-doctor3.jpg',
  ];

  const avatarImageSize = 80;

  useEffect(() => {
    dispatch(fetchAppointment(appointmentId)).then(results => {
      setAppointment(results.payload);
    });
  }, [dispatch, appointmentId]);

  const confirmAppointment = () => {
    dispatch(confirmAppointmentForDoctor(appointmentId)).then(results => {
      setAppointment(results.payload);
    });
  };

  const unConfirmAppointment = () => {
    dispatch(unConfirmAppointmentForDoctor(appointmentId)).then(results => {
      setAppointment(results.payload);
    });
  };

  if (!appointment) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('DoctorAppointmentsList')}>
        Go back
      </Button>
      <View style={styles.avatarAreaContainer}>
        <Avatar.Image
          style={styles.avatarElement}
          size={avatarImageSize}
          source={() => {
            return (
              <Image
                style={{
                  width: avatarImageSize,
                  height: avatarImageSize,
                  borderRadius: avatarImageSize / 4,
                }}
                source={{
                  uri: imagesList[
                    Math.floor(Math.random() * imagesList.length)
                  ],
                }}
              />
            );
          }}
        />
        <View>
          <Text variant="titleMedium">{appointment.doctor.name}</Text>
          <Text variant="bodyMedium">{appointment.doctor.specialization}</Text>
        </View>
      </View>
      {/* <View style={styles.statusContainer}>
        <Text>Status: </Text>
        {appointment.confirmed ? (
          <Text style={styles.statusConfirmed}>Confirmed</Text>
        ) : (
          <Text style={styles.statusUnConfirmed}>UnConfirmed</Text>
        )}
      </View> */}
      <AppointConfirmationIndicator confirmed={appointment.confirmed} />
      <View style={styles.dateAndTimeContainer}>
        <Text variant="labelLarge">Date and Time</Text>
        <View style={styles.dateTimeBodyContainer}>
          <Text variant="bodyLarge">
            {moment(appointment.appointment_date_time).format('MMMM Do YYYY')}
          </Text>
          <Text variant="bodyLarge">
            {moment(appointment.appointment_date_time).format('h:mm A')} -
            {moment(appointment.end_time).format('h:mm A')}
          </Text>
          {/* <Text variant="bodyLarge">08 September, 2024</Text>
          <Text variant="bodyLarge">10:00 - 11:00</Text> */}
        </View>
      </View>
      <View style={styles.patientInformationContainer}>
        <Text variant="headlineMedium">Patient Information</Text>
        <View style={styles.patientInfoBodyBodyContainer}>
          <Text variant="bodyLarge">{appointment.patient.name}</Text>
          <Text variant="bodyLarge">{appointment.patient.address}</Text>
        </View>
      </View>
      {appointment.confirmed ? (
        <Button onPress={unConfirmAppointment} mode="contained">
          Unconfirm Booking
        </Button>
      ) : (
        <Button onPress={confirmAppointment} mode="contained">
          Confirm Booking
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  avatarAreaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarElement: {
    marginRight: 15,
    marginBottom: 20,
  },
  dateAndTimeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  patientInformationContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
  },
  patientInfoBodyBodyContainer: {
    marginTop: 10,
  },
  dateTimeBodyContainer: {
    alignItems: 'center',
  },
});

export default withAuthorization(['doctor'])(
  DoctorAppointmentConfirmationScreen,
);
