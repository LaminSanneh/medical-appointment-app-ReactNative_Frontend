import React, {useEffect, useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {loginUser} from '../store/slices/authSlice';
import {Text, TextInput} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps} from '../navigation/AppNavigator';

const LoginScreen = () => {
  const [email, setEmail] = useState('lamin.evra@gmail.com');
  const [password, setPassword] = useState('mypassword');
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => {
    return state.auth.user;
  });

  const isAuthenticated = useAppSelector(state => {
    return state.auth.isAuthenticated;
  });

  const navigation = useNavigation<ScreenProps>();

  const handleLogin = () => {
    dispatch(loginUser({email, password})).then(() => {});
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      return;
    }

    if (user) {
      if (user.isDoctor) {
        console.log('Redirecting to DoctorAppointmentsList');
        navigation.navigate('DoctorAppointmentsList');
      } else {
        console.log('Redirecting to AppointmentsList');
        navigation.navigate('AppointmentsList');
      }
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">Login</Text>
      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        label="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginScreen;
