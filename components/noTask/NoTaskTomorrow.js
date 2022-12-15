import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react';
import nothingTomorrow from '../../assets/nothingTomorrow.png';

export default function NoTaskTomorrow() {
    return (
        <View style={styles.container}>
            <Image source={nothingTomorrow} style={{width: 80, height: 160}}/> 
            <Text>NoTaskTomorrow</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})