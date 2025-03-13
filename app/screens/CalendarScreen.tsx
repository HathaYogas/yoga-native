import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

// 이벤트 타입 정의
interface Event {
  id: string;
  title: string;
  description: string;
  time: string;
}

// 이벤트 데이터 타입 정의
interface EventsData {
  [date: string]: Event[];
}

// 마커 타입 정의
interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    dotColor?: string;
    selected?: boolean;
    selectedColor?: string;
  };
}

// 더미 데이터 정의
const dummyEvents: EventsData = {
  '2025-03-10': [
    {
      id: '1',
      title: '미팅',
      description: '클라이언트와 프로젝트 미팅',
      time: '10:00 - 11:30',
    },
    {
      id: '2',
      title: '점심 약속',
      description: '팀원들과 점심 식사',
      time: '12:00 - 13:00',
    },
  ],
  '2025-03-11': [
    {
      id: '3',
      title: '코드 리뷰',
      description: '신규 기능 코드 리뷰',
      time: '14:00 - 15:00',
    },
  ],
  '2025-03-12': [
    {
      id: '4',
      title: '스프린트 계획',
      description: '다음 스프린트 계획 회의',
      time: '09:00 - 10:30',
    },
    {
      id: '5',
      title: '디자인 리뷰',
      description: 'UI/UX 디자인 리뷰',
      time: '15:00 - 16:00',
    },
  ],
  '2025-03-15': [
    {
      id: '6',
      title: '주간 회고',
      description: '이번 주 성과 및 개선점 논의',
      time: '16:00 - 17:00',
    },
  ],
  '2025-03-20': [
    {
      id: '7',
      title: '데모 발표',
      description: '클라이언트 데모 발표 준비',
      time: '13:00 - 14:30',
    },
  ],
};

// 캘린더 테마 정의
const calendarTheme = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  textSectionTitleDisabledColor: '#d9e1e8',
  selectedDayBackgroundColor: '#50cebb',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#00adf5',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  dotColor: '#50cebb',
  selectedDotColor: '#ffffff',
  arrowColor: 'orange',
  disabledArrowColor: '#d9e1e8',
  monthTextColor: '#2d4150',
  indicatorColor: 'blue',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 14,
};

// 표시된 날짜에 점으로 표시할 마커 객체 생성 함수
const getMarkedDates = (
  events: EventsData,
  selectedDate: string
): MarkedDates => {
  const markedDates: MarkedDates = {};

  // 이벤트가 있는 날짜에 점 표시
  Object.keys(events).forEach((date) => {
    markedDates[date] = { marked: true, dotColor: '#50cebb' };
  });

  // 선택된 날짜 스타일 적용
  if (selectedDate) {
    markedDates[selectedDate] = {
      ...(markedDates[selectedDate] || {}),
      selected: true,
      selectedColor: '#50cebb',
    };
  }

  return markedDates;
};

const CalendarScreens: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [events, setEvents] = useState<EventsData>(dummyEvents);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  // 백엔드에서 데이터를 가져오는 것처럼 시뮬레이션
  useEffect(() => {
    // 실제로는 여기서 API 호출을 통해 이벤트 데이터를 가져옴
    // 예: fetchEvents().then(data => setEvents(data));

    // 더미 데이터 사용
    setEvents(dummyEvents);

    // 마커 설정
    setMarkedDates(getMarkedDates(dummyEvents, selectedDate));
  }, [selectedDate]);

  // 날짜 선택 핸들러
  const handleDayPress = (day: DateData): void => {
    setSelectedDate(day.dateString);
  };

  // 선택된 날짜의 이벤트 가져오기
  const getSelectedDateEvents = (): Event[] => {
    return events[selectedDate] || [];
  };

  // 이벤트 아이템 렌더링
  const renderEventItem = (item: Event): React.ReactNode => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.eventItem}
        onPress={() => console.log('Event pressed:', item.title)}
      >
        <View style={styles.eventTimeContainer}>
          <Text style={styles.eventTime}>{item.time}</Text>
        </View>
        <View style={styles.eventContent}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          markedDates={markedDates}
          onDayPress={handleDayPress}
          monthFormat={'yyyy년 MM월'}
          hideExtraDays={true}
          disableMonthChange={false}
          firstDay={0}
          hideDayNames={false}
          showWeekNumbers={false}
          enableSwipeMonths={true}
          theme={calendarTheme}
        />
      </View>

      <View style={styles.agendaContainer}>
        <Text style={styles.dateHeader}>
          {selectedDate
            ? new Date(selectedDate).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })
            : ''}
        </Text>

        <ScrollView style={styles.eventsContainer}>
          {getSelectedDateEvents().length > 0 ? (
            getSelectedDateEvents().map((event) => renderEventItem(event))
          ) : (
            <Text style={styles.noEventsText}>일정이 없습니다.</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  calendarContainer: {
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderRadius: 10,
    margin: 10,
  },
  calendar: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  agendaContainer: {
    flex: 1,
    padding: 15,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  eventsContainer: {
    flex: 1,
  },
  eventItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventTimeContainer: {
    marginRight: 15,
    paddingRight: 15,
    borderRightWidth: 1,
    borderRightColor: '#eee',
    justifyContent: 'center',
    width: 95,
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
  },
  noEventsText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
});

export default CalendarScreens;
