import React, {useState} from 'react';
import {View, Button, StyleSheet, Alert} from 'react-native';
import {useAppDispatch} from '../store/hooks';
import {registerUser} from '../store/slices/authSlice';
import {Text, TextInput} from 'react-native-paper';

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('Lamin Sanneh');
  const [email, setEmail] = useState('lamin.evra@gmail.com');
  const [password, setPassword] = useState('mypassword');
  const [confirmPassword, setConfirmPassword] = useState('mypassword');
  //   const [name, setName] = useState('');
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('admin');
  const dispatch = useAppDispatch();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      return;
    }

    setRole(
      'admin',
      // 'doctor',
      // 'receptionist',
      // 'patient'
    );

    dispatch(registerUser({name, email, password, role})).then(() => {
      Alert.alert('Registered');
    });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Register" onPress={handleRegister} />
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

export default RegisterScreen;
