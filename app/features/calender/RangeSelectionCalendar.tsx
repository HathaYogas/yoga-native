import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import { Calendar } from 'react-native-calendars';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const RangeSelectionCalendar: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [selectionPhase, setSelectionPhase] = useState<'start' | 'end'>(
    'start'
  );

  const onDateChange = (date: Date) => {
    if (selectionPhase === 'start') {
      // 시작 날짜를 설정하고 종료 날짜 선택 모드로 전환
      setDateRange({
        startDate: date,
        endDate: null,
      });
      setSelectionPhase('end');
    } else {
      // 시작 날짜보다 이전 날짜를 선택한 경우
      if (dateRange.startDate && date < dateRange.startDate) {
        setDateRange({
          startDate: date,
          endDate: dateRange.startDate,
        });
      } else {
        // 정상적으로 종료 날짜 설정
        setDateRange({
          ...dateRange,
          endDate: date,
        });
      }
      setSelectionPhase('start'); // 다시 시작 날짜 선택 모드로 전환
    }
  };

  // 날짜 범위에 속하는지 확인하는 함수
  const isDateInRange = (date: Date): boolean => {
    if (!dateRange.startDate || !dateRange.endDate) return false;
    return date >= dateRange.startDate && date <= dateRange.endDate;
  };

  // 날짜를 "YYYY-MM-DD" 형식으로 변환
  const formatDate = (date: Date | null): string => {
    if (!date) return '선택되지 않음';
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // 날짜 범위 계산 (일 수)
  const calculateDaysDifference = (): number => {
    if (!dateRange.startDate || !dateRange.endDate) return 0;
    const diffTime = Math.abs(
      dateRange.endDate.getTime() - dateRange.startDate.getTime()
    );
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1을 하여 시작일도 포함
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>날짜 범위 선택 캘린더</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {selectionPhase === 'start'
            ? '시작 날짜를 선택하세요'
            : '종료 날짜를 선택하세요'}
        </Text>
      </View>

      <Calendar
        selectedDate={
          selectionPhase === 'start'
            ? dateRange.startDate || new Date()
            : dateRange.endDate || new Date()
        }
        onDateChange={onDateChange}
        style={styles.calendar}
        customStyle={{
          calendarContainer: styles.calendarContainer,
          dayButton: styles.dayButton,
          dayButtonSelected: styles.dayButtonSelected,
          // 범위에 포함된 날짜에 대한 스타일
          dayButtonInRange: {
            backgroundColor: '#E6F3FF',
          },
          dayLabelInRange: {
            color: '#0066CC',
          },
          // 시작 날짜와 종료 날짜에 대한 다른 스타일
          dayButtonStart: {
            backgroundColor: '#0066CC',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          },
          dayLabelStart: {
            color: 'white',
            fontWeight: 'bold',
          },
          dayButtonEnd: {
            backgroundColor: '#0066CC',
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
          dayLabelEnd: {
            color: 'white',
            fontWeight: 'bold',
          },
          // 요일별 색상
          sundayLabel: {
            color: '#FF3B30',
          },
          saturdayLabel: {
            color: '#007AFF',
          },
        }}
        // 커스텀 날짜 렌더링 함수
        renderDate={(date, selected) => {
          // 범위 내의 날짜인지 확인
          const isInRange = isDateInRange(date);
          // 시작 날짜인지 확인
          const isStartDate =
            dateRange.startDate &&
            date.getDate() === dateRange.startDate.getDate() &&
            date.getMonth() === dateRange.startDate.getMonth() &&
            date.getFullYear() === dateRange.startDate.getFullYear();
          // 종료 날짜인지 확인
          const isEndDate =
            dateRange.endDate &&
            date.getDate() === dateRange.endDate.getDate() &&
            date.getMonth() === dateRange.endDate.getMonth() &&
            date.getFullYear() === dateRange.endDate.getFullYear();

          // 여기서 커스텀 UI를 반환할 수 있습니다
          return null; // 기본 렌더링 사용
        }}
      />

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          시작 날짜: {formatDate(dateRange.startDate)}
        </Text>
        <Text style={styles.resultText}>
          종료 날짜: {formatDate(dateRange.endDate)}
        </Text>
        {dateRange.startDate && dateRange.endDate && (
          <Text style={styles.resultText}>
            총 {calculateDaysDifference()}일
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  calendar: {
    marginBottom: 10,
  },
  calendarContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    padding: 10,
  },
  dayButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayButtonSelected: {
    backgroundColor: '#0066CC',
    borderRadius: 20,
  },
  resultContainer: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
});

export default RangeSelectionCalendar;
