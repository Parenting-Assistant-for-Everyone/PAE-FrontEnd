import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegularPageScreen({ navigation }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

    const handleDateChange = (event: any, date: Date | undefined) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (date) {
            setSelectedDate(date);
        }
    };

    const toggleDaySelection = (day: string) => {
        setSelectedDays((prevDays) =>
            prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
        );
    };

    const handleNext = () => {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식
        const dataToSend = {
            startDate: formattedDate,
            selectedDays: selectedDays,
        };

        console.log('Sending data to backend:', dataToSend);
        navigation.navigate('EndScreen'); //로직 최종 화면
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>내가 원하는 시간 직접 입력</Text>

            <View style={styles.section}>
                <Text style={styles.label}>돌봄 시작일</Text>
                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={styles.dateText}>
                        {selectedDate.toISOString().split('T')[0]} {/* YYYY-MM-DD 형식 */}
                    </Text>
                </TouchableOpacity>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            <View style={styles.section}>
                <Text style={styles.label}>돌봄 요일</Text>
                <View style={styles.daysContainer}>
                    {daysOfWeek.map((day) => (
                        <TouchableOpacity
                            key={day}
                            style={[
                                styles.dayButton,
                                selectedDays.includes(day) && styles.dayButtonSelected,
                            ]}
                            onPress={() => toggleDaySelection(day)}
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    selectedDays.includes(day) && styles.dayTextSelected,
                                ]}
                            >
                                {day}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>다음</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: '5%',
    },
    title: {
        fontSize: '20%',
        fontWeight: 'bold',
        marginVertical: '7.5%',
        textAlign: 'center',
    },
    section: {
        marginBottom: '7.5%',
    },
    label: {
        fontSize: '16%',
        marginBottom: '2.5%',
    },
    dateButton: {
        backgroundColor: '#FFEB3B',
        paddingVertical: '3.75%',
        paddingHorizontal: '5%',
        borderRadius: '2.5%',
        alignItems: 'center',
        width: '50%',
        alignSelf: 'flex-end',
    },
    dateText: {
        fontSize: '16%',
        fontWeight: 'bold',
        color: '#000',
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayButton: {
        backgroundColor: '#F5F5DC',
        paddingVertical: '2.5%',
        paddingHorizontal: '3.75%',
        borderRadius: '5%',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: '1.25%',
    },
    dayButtonSelected: {
        backgroundColor: '#FFEB3B',
    },
    dayText: {
        fontSize: '15%',
        color: '#000',
    },
    dayTextSelected: {
        color: '#000',
        fontWeight: 'bold',
    },
    nextButton: {
        backgroundColor: '#FFEB3B',
        paddingVertical: '3.75%',
        paddingHorizontal: '10%',
        borderRadius: '7.5%',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
        position: 'absolute',
        bottom: '5%',
    },
    nextButtonText: {
        fontSize: '15%',
        fontWeight: 'bold',
        color: '#000',
    },
});