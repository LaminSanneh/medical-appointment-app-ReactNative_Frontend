import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
// import {loginUser} from '../store/authSlice';

const HomeScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    // dispatch(loginUser({email, password}));
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
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

export default HomeScreen;
