import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import RangeSlider from 'react-native-range-slider-expo';

export default function SpecificScreen({ navigation }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [range, setRange] = useState({ low: 12, high: 14 });

    const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

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
            timeRange: `${range.low}:00 - ${range.high}:00`,
        };

        console.log('Sending data to backend:', dataToSend);
        navigation.navigate('EndScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>원하는 날짜 지정</Text>

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

            <View style={styles.section}>
                <Text style={styles.label}>돌봄 시간</Text>
                <RangeSlider
                    min={12}
                    max={24}
                    fromValueOnChange={value => setRange(prev => ({ ...prev, low: value }))}
                    toValueOnChange={value => setRange(prev => ({ ...prev, high: value }))}
                    initialFromValue={range.low}
                    initialToValue={range.high}
                    styleSize="small"
                    showRangeLabels={false}
                    showValueLabels={true}
                    rangeLabelsTextColor="#000"
                    inRangeBarColor="#FFEB3B"
                    outOfRangeBarColor="#ccc"
                    thumbTintColor="#FFEB3B"
                />
                <Text style={styles.timeText}>{`${range.low}:00 - ${range.high}:00`}</Text>
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
        padding: '5%',
    },
    title: {
        fontSize: '20%',
        fontWeight: 'bold',
        marginBottom: '5%',
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
    },
    dateText: {
        fontSize: '15%',
        fontWeight: 'bold',
        color: '#000',
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dayButton: {
        backgroundColor: '#F5F5DC',
        paddingVertical: '2.5%',
        paddingHorizontal: '3.75%',
        borderRadius: '12.5%',
        alignItems: 'center',
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
    timeText: {
        fontSize: '15%',
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginTop: '2.5%',
    },
    nextButton: {
        backgroundColor: '#FFEB3B',
        paddingVertical: '3.75%',
        paddingHorizontal: '10%',
        borderRadius: '7.5%',
        alignItems: 'center',
        marginTop: '5%',
        position: 'absolute',
        bottom: '5%',
        width: '100%',
    },
    nextButtonText: {
        fontSize: '15%',
        fontWeight: 'bold',
        color: '#000',
    },
});