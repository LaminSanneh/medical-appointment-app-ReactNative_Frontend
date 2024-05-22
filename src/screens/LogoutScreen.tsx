import React, { useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import {logoutUser} from '../store/slices/authSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps} from '../navigation/AppNavigator';
import {Button, Text} from 'react-native-paper';

const LogoutScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ScreenProps>();
  const isAuthenticated = useAppSelector(state => {
    return state.auth.isAuthenticated;
  });

  const handleLogoutAccept = () => {
    dispatch(logoutUser()).then(() => {
      console.log('Logged out user');

      // navigation.navigate('Login');
    });
  };

  const handleLogoutReject = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    navigation.navigate('Home');
  };

  useEffect(() => {
    console.log("isAuthenticated");
    console.log(isAuthenticated);

    if (isAuthenticated === false) {
      navigation.navigate('Login');
    }

    // if (user) {
    //   if (user.isDoctor) {
    //     navigation.navigate('DoctorAppointmentsList');
    //   } else {
    //     navigation.navigate('AppointmentsList');
    //   }
    // }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Are you sure you want to log out?</Text>
      <Button mode="contained" onPress={handleLogoutAccept}>
        Yes
      </Button>
      <Button mode="contained" onPress={handleLogoutReject}>
        No
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LogoutScreen;
