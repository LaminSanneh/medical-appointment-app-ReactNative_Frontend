import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {isEnabled} from 'react-native/Libraries/Performance/Systrace';

interface Props {
  from: number[];
  to: number[];
  onPress: () => void;
  selectedTime: SelectedTime | null;
  isDisabled: boolean;
}

export interface SelectedTime {
  from: number[];
  to: number[];
}

const TimeSlot = ({from, to, onPress, selectedTime, isDisabled}: Props) => {
  let isSelected = false;

  if (selectedTime !== null) {
    isSelected =
      selectedTime.from[0] === from[0] && selectedTime.to[0] === to[0];
  }

  const marginBottom = 10;

  const styles = StyleSheet.create({
    timeSlotContainer: {
      backgroundColor: isSelected ? '#457ed4' : '#FFFFFF',
      borderRadius: 5,
      marginBottom: marginBottom,
      borderColor: isDisabled ? 'red' : 'green',
      borderWidth: isDisabled ? 1 : 1,
    },
    selectedTimeSlotContainer: {
      borderRadius: 5,
      backgroundColor: '#457ed4',
      marginBottom: marginBottom,
    },
    timeSlotText: {
      fontSize: 12,
      color: '#000000',
      paddingHorizontal: 25,
      paddingVertical: 8,
    },
    isDisabled: {
      backgroundColor: 'red',
    },
    isEnabled: {
      backgroundColor: 'yellow',
    },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        if (isDisabled) {
          return;
        }

        onPress();
      }}>
      <View style={styles.timeSlotContainer}>
        <Text style={styles.timeSlotText}>
          {from[0]}:{from[1]}-{to[0]}:{to[1]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TimeSlot;
