import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const AppointConfirmationIndicator = ({confirmed = false}) => {
  return (
    <View style={styles.statusContainer}>
      <Text>Appointment Status: </Text>
      {confirmed ? (
        <Text style={styles.statusConfirmed}>Confirmed</Text>
      ) : (
        <Text style={styles.statusUnConfirmed}>UnConfirmed</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusConfirmed: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 5,
    color: '#FFFFFF',
  },
  statusUnConfirmed: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
    color: '#FFFFFF',
  },
});

export default AppointConfirmationIndicator;
