import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

// 기본 캘린더 컴포넌트
const BasicCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>기본 캘린더</Text>
      <Calendar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        style={styles.calendar}
      />
      <Text style={styles.selectedDateText}>
        선택된 날짜: {selectedDate.toDateString()}
      </Text>
    </View>
  );
};

// 커스텀 스타일 캘린더
const CustomStyledCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>커스텀 스타일 캘린더</Text>
      <Calendar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        style={styles.calendar}
        showControls={true}
        startFromMonday={true}
        customStyle={{
          calendarContainer: {
            backgroundColor: '#f0f8ff',
            borderRadius: 10,
            padding: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          },
          dayButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
          },
          dayButtonSelected: {
            backgroundColor: '#4682b4',
          },
          dayLabel: {
            fontSize: 14,
            color: '#333',
          },
          dayLabelSelected: {
            color: 'white',
            fontWeight: 'bold',
          },
          monthLabel: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#4682b4',
          },
          controlButtonText: {
            color: '#4682b4',
            fontWeight: 'bold',
          },
        }}
      />
    </View>
  );
};

// 이벤트 표시 캘린더
const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 이벤트가 있는 날짜들 (예시)
  const eventsMap = {
    '2025-03-15': true,
    '2025-03-20': true,
    '2025-03-25': true,
  };

  // 오늘 날짜를 YYYY-MM-DD 형식으로 변환
  const getFormattedDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>이벤트 표시 캘린더</Text>
      <Calendar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        style={styles.calendar}
        showEventIndicators={true}
        eventDates={eventsMap}
        customStyle={{
          eventIndicator: {
            backgroundColor: '#ff4500',
            width: 6,
            height: 6,
            borderRadius: 3,
          },
        }}
      />
      <Text style={styles.selectedDateText}>
        선택된 날짜: {selectedDate.toDateString()}
      </Text>
      {/* {eventsMap[getFormattedDate(selectedDate)] ? (
        <Text style={styles.eventText}>이벤트가 있습니다!</Text>
      ) : null} */}
    </View>
  );
};

// 날짜 범위 제한 캘린더
const DateRangeCalendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  // 오늘부터 30일 후까지만 선택 가능
  const minDate = today;
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 30);

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>날짜 범위 제한 캘린더</Text>
      <Calendar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        style={styles.calendar}
        minDate={minDate}
        maxDate={maxDate}
        customStyle={{
          dayButtonDisabled: {
            opacity: 0.3,
          },
          dayLabelDisabled: {
            color: '#c0c0c0',
          },
        }}
      />
      <Text style={styles.selectedDateText}>
        선택된 날짜: {selectedDate.toDateString()}
      </Text>
      <Text style={styles.infoText}>오늘부터 30일 이내만 선택 가능합니다.</Text>
    </View>
  );
};

// 다중 선택 캘린더
const MultiSelectCalendar = () => {
  const [selectedDates, setSelectedDates] = useState<{
    [key: string]: boolean;
  }>({});

  const getFormattedDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const onDateChange = (date: Date) => {
    const formattedDate = getFormattedDate(date);
    const newSelectedDates = { ...selectedDates };

    if (newSelectedDates[formattedDate]) {
      delete newSelectedDates[formattedDate];
    } else {
      newSelectedDates[formattedDate] = true;
    }

    setSelectedDates(newSelectedDates);
  };

  const selectedDatesArray = Object.keys(selectedDates);

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>다중 선택 캘린더</Text>
      <Calendar
        onDateChange={onDateChange}
        style={styles.calendar}
        showControls={true}
        customStyle={{
          dayButtonSelected: {
            backgroundColor: '#6a5acd',
          },
        }}
        selectedDates={selectedDates}
        allowMultipleSelection={true}
      />
      <Text style={styles.selectedDateText}>
        선택된 날짜:{' '}
        {selectedDatesArray.length > 0 ? selectedDatesArray.join(', ') : '없음'}
      </Text>
    </View>
  );
};

// 메인 컴포넌트
const CalendarExamples: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>캘린더 예시 모음</Text>
      <ScrollView>
        <BasicCalendar />
        <CustomStyledCalendar />
        <EventCalendar />
        <DateRangeCalendar />
        <MultiSelectCalendar />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  exampleContainer: {
    margin: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  calendar: {
    marginBottom: 10,
  },
  selectedDateText: {
    fontSize: 14,
    marginTop: 10,
    color: '#666',
  },
  eventText: {
    fontSize: 14,
    marginTop: 5,
    color: '#ff4500',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 12,
    marginTop: 5,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default CalendarExamples;
