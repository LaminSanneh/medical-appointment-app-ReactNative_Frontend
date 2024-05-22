import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {fetchAppointments} from '../store/slices/appointmentsSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps} from '../navigation/AppNavigator';
import AppointConfirmationIndicator from '../components/AppointConfirmationIndicator';
import moment from 'moment';
import withAuthorization from '../components/withAuthorization';

const DoctorAppointmentsListScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => {
    return state.auth.user?.id;
  });

  const navigation = useNavigation<ScreenProps>();

  useEffect(() => {
    const getAppointments = async () => {
      dispatch(fetchAppointments()).then(results => {
        const appointmentsData = results.payload
          ? results.payload
          : results.payload.data;
        setAppointments(appointmentsData);
      });
    };

    getAppointments();
  }, [dispatch]);

  const onAppointmentPress = (appointmentId: number) => {
    navigation.navigate('DoctorAppointmentConfirmation', {appointmentId});
  };

  const avatarImageSize = 80;

  const imagesList = [
    'http://192.168.100.5:8000/images/woman-doctor.jpg',
    'http://192.168.100.5:8000/images/woman-doctor2.jpg',
    'http://192.168.100.5:8000/images/woman-doctor3.jpg',
    'http://192.168.100.5:8000/images/man-doctor.jpg',
    'http://192.168.100.5:8000/images/man-doctor2.jpg',
    'http://192.168.100.5:8000/images/man-doctor3.jpg',
  ];

  const renderAppointmentItem = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() => {
          onAppointmentPress(item.id);
        }}>
        <View style={styles.appointmentItem}>
          <View style={styles.avatarContainer}>
            {/* <AvatarText label={getAvatartextLabel(item.doctor.name)} /> */}
            <Avatar.Image
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
          </View>
          <View style={styles.detailsContainer}>
            <Text variant="titleMedium">{item.patient.name}</Text>
            <Text variant="bodyMedium">
              {moment(item.appointment_date_time).format('MMMM Do YYYY')}{' '}
              {moment(item.appointment_date_time).format('h:mm A')} -{' '}
              {moment(item.end_time).format('h:mm A')}
            </Text>
            <Text variant="bodyMedium">{item.patient.phone}</Text>
            <AppointConfirmationIndicator confirmed={item.confirmed} />
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 15,
    marginTop: 18,
  },
  appointmentItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 18,
    padding: 15,
  },
  avatarContainer: {
    // width: '30%',
    marginRight: 20,
  },
  detailsContainer: {
    // width: '70%',
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
});

export default withAuthorization(['doctor'])(DoctorAppointmentsListScreen);
