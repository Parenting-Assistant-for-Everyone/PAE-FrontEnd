import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type DumpScreenProps = {
    route: RouteProp<{ params: { name: string } }, 'params'>;
};

const DumpScreen: React.FC<DumpScreenProps> = ({ route }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the {route.name} screen (Placeholder)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    text: {
        fontSize: 20,
        color: '#000',
    },
});

export default DumpScreen;
