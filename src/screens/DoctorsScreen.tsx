import React, {useEffect, useState} from 'react';
import {API_URL} from '@env';
import {View, FlatList, StyleSheet, Image} from 'react-native';
import authHeader from '../services/authHeader';
import axios from 'axios';
import {Avatar, Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps} from '../navigation/AppNavigator';
import withAuthorization from '../components/withAuthorization';

const fetchDoctors = async () => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    const response = await axios.get(`${API_URL}/doctors`, headers);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const DoctorsScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const navigation = useNavigation<ScreenProps>();

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const doctorsData = await fetchDoctors();
        setDoctors(doctorsData);
      } catch (error) {
        // Handle error
      }
    };

    getDoctors();
  }, []);

  const avatarImageSize = 70;

  const imagesList = [
    'http://192.168.100.5:8000/images/woman-doctor.jpg',
    'http://192.168.100.5:8000/images/woman-doctor2.jpg',
    'http://192.168.100.5:8000/images/woman-doctor3.jpg',
    'http://192.168.100.5:8000/images/man-doctor.jpg',
    'http://192.168.100.5:8000/images/man-doctor2.jpg',
    'http://192.168.100.5:8000/images/man-doctor3.jpg',
  ];

  const makeAppointment = (doctorId: number) => {
    navigation.navigate('AppointmentScheduling', {
      doctorId,
    });
  };

  const renderDoctorItem = ({item}) => {
    return (
      <View style={styles.doctorItem}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={avatarImageSize}
            source={() => {
              return (
                <Image
                  style={{
                    width: avatarImageSize,
                    height: avatarImageSize,
                    borderRadius: avatarImageSize / 2,
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
          <Text variant="titleSmall">Dr. {item.name}</Text>
          <Text style={styles.detailsBodyText} variant="bodySmall">
            {item.specialization}
          </Text>
          <Text style={styles.detailsBodyText} variant="bodySmall">
            {item.phone}
          </Text>
          <Text style={styles.detailsBodyText} variant="bodySmall">
            {item.email}
          </Text>
        </View>
        <Button
          onPress={() => {
            makeAppointment(item.id);
          }}
          mode="contained">
          Appointment
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        style={styles.listContaier}
        data={doctors}
        renderItem={renderDoctorItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  listContaier: {},
  doctorItem: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexBasis: '42.5%',
    marginBottom: 25,
    marginLeft: '5%',
    padding: 15,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  detailsContainer: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    rowGap: 3,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailsBodyText: {
    fontSize: 10,
  },
});

export default withAuthorization(['patient'])(DoctorsScreen);
