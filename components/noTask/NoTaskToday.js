import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react';
import { ImageAnimation } from '../Animation/ImageAnimation';
import nothingTomorrow from '../../assets/nothingTomorrow.png';

export default function NoTaskToday() {
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', justifyContent: 'space-between', paddingTop: 5}}>
                <ImageAnimation>
                    <Image source={nothingTomorrow} style={{width: 100, height: 200, }}/> 
                </ImageAnimation>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 15}}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#'}}>CONGRATS!</Text>
                <Text>You don't have any task, enjoy your day.</Text>
            </View>
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