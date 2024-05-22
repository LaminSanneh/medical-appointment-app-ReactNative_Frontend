import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Button, Text as TextFromPaper} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import TimeSlot, {SelectedTime} from '../components/TimeSlot';
import {useAppDispatch} from '../store/hooks';
import {
  createAppointment,
  fetchAppointmentsForDoctorAndCurrentPatient,
} from '../store/slices/appointmentsSlice';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList, ScreenProps} from '../navigation/AppNavigator';

interface SelectedDay {
  day: number;
  month: number;
  year: number;
}

interface OccupiedTime {
  [date: string]: {
    disabled: boolean;
    disableTouchEvent: boolean;
    dates: string[];
    selected?: boolean;
  };
}

interface Appointment {
  appointment_date_time: string;
}

const AppointmentSchedulingScreen = () => {
  const dispatch = useAppDispatch();
  const [timeOptions, setTimeOptions] = useState([]);
  const [selectedTime, setSelectedTime] = useState<SelectedTime | null>(null);
  const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);
  const [doctorAppointments, setDoctorAppointments] = useState<Appointment[]>(
    [],
  );
  const [markedDates, setMarkedDates] = useState<OccupiedTime>({});
  const navigation = useNavigation<ScreenProps>();
  const route = useRoute<RouteProp<RootStackParamList>>();

  const doctorId = route.params?.doctorId;

  const populateInitialTimeOptions = () => {
    const startingHour = 8;
    const endingHour = 22;
    const intervalMinutes = 60;
    const date = moment();
    const toDate = moment();
    date.hours(startingHour);
    date.minutes(0);
    toDate.hours(startingHour);
    toDate.minutes(intervalMinutes);
    const timesRangeList = [];
    let isDisabled;

    for (let index = startingHour * 2; index < 48; index++) {
      isDisabled = false;

      if (selectedDay) {
        let markedDate =
          markedDates[
            moment(
              `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`,
            ).format('YYYY-MM-DD')
          ];

        if (markedDate && markedDate.dates.indexOf(date.format('HH')) !== -1) {
          isDisabled = true;
        }
      }

      timesRangeList.push({
        from: [date.format('HH'), date.format('mm'), date.format('A')],
        to: [toDate.format('HH'), toDate.format('mm'), toDate.format('A')],
        isDisabled,
      });

      if (
        Number.parseInt(toDate.format('HH'), 10) === endingHour &&
        Number.parseInt(toDate.format('mm'), 10) === 0
      ) {
        break;
      }

      date.add(intervalMinutes, 'minutes');
      toDate.add(intervalMinutes, 'minutes');
    }

    setTimeOptions(timesRangeList);
  };

  useEffect(() => {
    populateInitialTimeOptions();
  }, [selectedDay, markedDates]);

  useEffect(() => {
    const today = moment();
    setSelectedDay({
      day: Number.parseInt(today.format('DD'), 10),
      month: Number.parseInt(today.format('MM'), 10),
      year: Number.parseInt(today.format('YYYY'), 10),
    });
  }, []);

  const updateSetMarkedDates = () => {
    const markedDatesKeyMap: OccupiedTime = {};

    doctorAppointments.forEach((appointment: Appointment) => {
      const currentDate = moment(
        appointment.appointment_date_time,
        'YYYY-MM-DD HH:mm',
      );

      if (markedDatesKeyMap[currentDate.format('YYYY-MM-DD')]) {
        markedDatesKeyMap[currentDate.format('YYYY-MM-DD')].dates.push(
          currentDate.format('HH'),
        );
      } else {
        markedDatesKeyMap[currentDate.format('YYYY-MM-DD')] = {
          disabled: true,
          disableTouchEvent: true,
          dates: [currentDate.format('HH')],
        };
      }
    });

    setMarkedDates(markedDatesKeyMap);
  };

  useEffect(() => {
    updateSetMarkedDates();
    // setDisabledDays2(markedDates);
  }, [doctorAppointments]);

  useEffect(() => {
    dispatch(fetchAppointmentsForDoctorAndCurrentPatient(doctorId)).then(
      results => {
        const appointments = results.payload
          ? results.payload
          : results.payload.data;
        setDoctorAppointments(appointments);
      },
    );
  }, [dispatch]);

  // const setDisabledDays2 = (givenMarkedDates: OccupiedTime) => {
  //   const newMarkedDates: OccupiedTime = {};

  //   for (const key in givenMarkedDates) {
  //     if (Object.prototype.hasOwnProperty.call(givenMarkedDates, key)) {
  //       if (
  //         moment().format('YYYY-MM-DD') === key ||
  //         moment(key).isSameOrAfter(moment())
  //       ) {
  //         continue;
  //       }

  //       newMarkedDates[key] = givenMarkedDates[key];
  //     }
  //   }

  //   const today = moment();
  //   let startOfMonth = moment().startOf('month');

  //   for (let index = 0; index < 31; index++) {
  //     if (
  //       startOfMonth.isBefore(today) &&
  //       moment().format('YYYY-MM-DD') !== startOfMonth.format('YYYY-MM-DD')
  //     ) {
  //       newMarkedDates[startOfMonth.format('YYYY-MM-DD')] = {
  //         disabled: true,
  //         disableTouchEvent: true,
  //         dates: [],
  //       };
  //     }

  //     startOfMonth.add(1, 'days');
  //   }

  //   setMarkedDates(newMarkedDates);
  // };

  const setDisabledDays = (givenMarkedDates: OccupiedTime) => {
    const newMarkedDates: OccupiedTime = {};

    // Leaving here for Examples
    //   '2024-05-16': {selected: true, marked: true, selectedColor: 'blue'},
    //   '2024-05-17': {marked: true},
    //   '2024-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
    //   '2024-05-19': {disabled: true, disableTouchEvent: true},

    // Existing marked values copied into new variable
    for (const key in givenMarkedDates) {
      if (Object.prototype.hasOwnProperty.call(givenMarkedDates, key)) {
        if (
          moment().format('YYYY-MM-DD') === key ||
          moment(key).isSameOrAfter(moment())
        ) {
          continue;
        }

        newMarkedDates[key] = givenMarkedDates[key];
      }
    }

    const today = moment();
    let startOfMonth = moment().startOf('month');

    // dates before today copied into new variable
    for (let index = 0; index < 31; index++) {
      if (
        startOfMonth.isBefore(today) &&
        moment().format('YYYY-MM-DD') !== startOfMonth.format('YYYY-MM-DD')
      ) {
        newMarkedDates[startOfMonth.format('YYYY-MM-DD')] = {
          disabled: true,
          disableTouchEvent: true,
          dates: [],
        };
      }

      startOfMonth.add(1, 'days');
    }

    // add selected day's date and set selected status
    if (selectedDay) {
      const selectedDayMarkedKey = moment(
        `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`,
      ).format('YYYY-MM-DD');

      newMarkedDates[selectedDayMarkedKey] = {
        ...newMarkedDates[selectedDayMarkedKey],
        ...{
          disabled: false,
          disableTouchEvent: false,
          selected: true,
          dates: [],
        },
      };
    }

    return newMarkedDates;
  };

  const renderDatePicker = () => {
    return (
      <Calendar
        markedDates={setDisabledDays(markedDates)}
        // markedDates={markedDates}
        // {{
        //   '2024-05-16': {selected: true, marked: true, selectedColor: 'blue'},
        //   '2024-05-17': {marked: true},
        //   '2024-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
        //   '2024-05-19': {disabled: true, disableTouchEvent: true},
        // }}
        onDayPress={day => {
          setSelectedDay({
            day: day.day,
            month: day.month,
            year: day.year,
          });
          setSelectedTime(null);
        }}
      />
    );
  };

  const onPress = (value: SelectedTime) => {
    setSelectedTime(value);
  };

  const getTimeSlots = useCallback(() => {
    return timeOptions.map((option, index) => {
      const {from, to, isDisabled} = option;
      return (
        <TimeSlot
          isDisabled={isDisabled}
          onPress={() => onPress(option)}
          from={from}
          to={to}
          key={`${index}`}
          selectedTime={selectedTime}
        />
      );
    });
  }, [timeOptions, selectedTime]);

  const submitAppointment = () => {
    const appointmentDateTime = `${selectedDay?.year}-${selectedDay?.month}-${selectedDay?.day} ${selectedTime?.from[0]}:${selectedTime?.from[1]}`;
    dispatch(createAppointment({appointmentDateTime, doctorId}))
      .then(results => {
        Alert.alert('New appointment created');
      })
      .catch(results => {
        Alert.alert('Appoint creation error.' + results.error.message);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Button onPress={() => navigation.navigate('Doctors')}>
            Go back
          </Button>
          <TextFromPaper variant="titleMedium">Select Date</TextFromPaper>
          <View style={styles.datePickerContainer}>{renderDatePicker()}</View>
          <TextFromPaper variant="titleMedium">Select Time</TextFromPaper>
          <View style={styles.timePickerContainer}>{getTimeSlots()}</View>
          <Button
            onPress={submitAppointment}
            style={styles.appointmentButton}
            mode="contained">
            Schedule Appointment
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  datePickerContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
  timePickerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  appointmentButton: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
});

export default AppointmentSchedulingScreen;
