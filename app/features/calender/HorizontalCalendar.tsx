import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

// 화면 너비 가져오기
const { width } = Dimensions.get('window');
const DAY_WIDTH = width / 7;

const HorizontalCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState<Date[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  // 날짜 생성 (현재 날짜 기준 전후 1년)
  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      const dateArray: Date[] = [];

      // 이전 1년부터
      const oneYearAgo = new Date(today);
      oneYearAgo.setFullYear(today.getFullYear() - 1);

      // 이후 1년까지
      const oneYearLater = new Date(today);
      oneYearLater.setFullYear(today.getFullYear() + 1);

      let currentDate = new Date(oneYearAgo);
      while (currentDate <= oneYearLater) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dateArray;
    };

    setDates(generateDates());
  }, []);

  // 처음 렌더링시 현재 날짜로 스크롤
  useEffect(() => {
    if (dates.length > 0 && scrollViewRef.current) {
      const today = new Date();
      const index = dates.findIndex(
        (date) =>
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
      );

      if (index !== -1) {
        // 약간의 지연을 주어 ScrollView가 제대로 초기화되게 함
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            x: index * DAY_WIDTH,
            animated: true,
          });
        }, 100);
      }
    }
  }, [dates]);

  // 날짜 선택 처리
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // 이전/다음 달로 이동
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }

    setSelectedDate(newDate);

    // 해당 월의 첫 날짜 인덱스 찾기
    const targetIndex = dates.findIndex(
      (date) =>
        date.getDate() === 1 &&
        date.getMonth() === newDate.getMonth() &&
        date.getFullYear() === newDate.getFullYear()
    );

    if (targetIndex !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: targetIndex * DAY_WIDTH,
        animated: true,
      });
    }
  };

  // 날짜가 선택된 날짜와 같은지 확인
  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // 요일 반환
  const getDayOfWeek = (date: Date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  };

  // 오늘 날짜인지 확인
  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDate(date, today);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateMonth('prev')}>
          <Text style={styles.navButton}>{'< 이전'}</Text>
        </TouchableOpacity>

        <Text style={styles.monthYearText}>
          {`${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월`}
        </Text>

        <TouchableOpacity onPress={() => navigateMonth('next')}>
          <Text style={styles.navButton}>{'다음 >'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekDaysContainer}>
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <View key={index} style={styles.weekDayCell}>
            <Text
              style={[
                styles.weekDayText,
                index === 0 ? styles.sundayText : null,
                index === 6 ? styles.saturdayText : null,
              ]}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {dates.map((date, index) => {
          const isSelected = isSameDate(date, selectedDate);
          const todayCheck = isToday(date);
          const day = date.getDay(); // 0: 일요일, 6: 토요일

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateContainer,
                isSelected && styles.selectedDateContainer,
                todayCheck && styles.todayContainer,
              ]}
              onPress={() => handleDateSelect(date)}
            >
              <Text
                style={[
                  styles.dayOfWeekText,
                  day === 0 && styles.sundayText,
                  day === 6 && styles.saturdayText,
                  isSelected && styles.selectedText,
                ]}
              >
                {getDayOfWeek(date)}
              </Text>

              <Text
                style={[
                  styles.dateText,
                  isSelected && styles.selectedText,
                  todayCheck && styles.todayText,
                ]}
              >
                {date.getDate()}
              </Text>

              {todayCheck && <View style={styles.todayIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.selectedDateInfoContainer}>
        <Text style={styles.selectedDateInfo}>
          선택된 날짜:{' '}
          {`${selectedDate.getFullYear()}년 ${
            selectedDate.getMonth() + 1
          }월 ${selectedDate.getDate()}일 (${getDayOfWeek(selectedDate)})`}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  navButton: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '500',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  weekDayCell: {
    width: DAY_WIDTH,
    paddingVertical: 10,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  scrollViewContent: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  dateContainer: {
    width: DAY_WIDTH,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateContainer: {
    backgroundColor: '#E6F3FF',
    borderRadius: 8,
  },
  todayContainer: {
    borderWidth: 1,
    borderColor: '#0066CC',
    borderRadius: 8,
  },
  dayOfWeekText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  selectedText: {
    color: '#0066CC',
    fontWeight: 'bold',
  },
  todayText: {
    fontWeight: 'bold',
  },
  todayIndicator: {
    position: 'absolute',
    bottom: 5,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0066CC',
  },
  sundayText: {
    color: '#FF3B30',
  },
  saturdayText: {
    color: '#007AFF',
  },
  selectedDateInfoContainer: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedDateInfo: {
    fontSize: 16,
    color: '#333',
  },
});

export default HorizontalCalendar;
