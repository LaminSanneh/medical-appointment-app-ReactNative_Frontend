import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {fetchAppointments} from '../store/slices/appointmentsSlice';
import {useAppDispatch} from '../store/hooks';
import withAuthorization from '../components/withAuthorization';

const AppointmentsListScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useAppDispatch();

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
          <Text variant="titleMedium">Dr. {item.doctor.name}</Text>
          {/* <Text variant="bodyMedium">{item.patient.name}</Text> */}
          <Text variant="bodyMedium">{item.appointment_date_time}</Text>
        </View>
      </View>
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

export default withAuthorization(['patient'])(AppointmentsListScreen);
