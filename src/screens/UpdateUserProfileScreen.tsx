import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, PermissionsAndroid, Alert} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {launchImageLibrary} from 'react-native-image-picker';
import {updateProfileForCurrentUser} from '../store/slices/authSlice';

const UpdateStaffProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => {
    return state.auth.user;
  });
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [phone, setPhone] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  const handleSubmitUpdateProfile = () => {
    updateProfile();
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);

      if (newProfilePicture) {
        formData.append('profile_picture', {
          uri: newProfilePicture.uri,
          type: newProfilePicture.type,
          name: newProfilePicture.fileName,
        });
      }

      dispatch(updateProfileForCurrentUser(formData)).then(response => {
        Alert.alert('Updated Profile');
      });

      // navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
      setProfilePicture(user.photoUrl);
    }
  }, [user]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleProfilePictureChange = async () => {
    await requestCameraPermission();

    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (result.assets && result.assets.length > 0) {
      setNewProfilePicture(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">Update Profile</Text>
      <TextInput
        style={styles.input}
        label="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        label="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        label="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <Text variant="labelLarge">Profile Picture:</Text>
      {profilePicture ? (
        <Image source={{uri: profilePicture}} style={styles.profilePicture} />
      ) : (
        <Text>No Profile Picture</Text>
      )}
      {newProfilePicture && (
        <Image
          source={{uri: newProfilePicture.uri}}
          style={styles.profilePicture}
        />
      )}
      <Button onPress={handleProfilePictureChange}>
        Change Profile Picture
      </Button>

      <Button mode="contained" onPress={handleSubmitUpdateProfile}>
        Update
      </Button>
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
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
});

export default UpdateStaffProfileScreen;
