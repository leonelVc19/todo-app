import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import Checkbox from './Checkbox';
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons'
import { deleteTodoReducer } from '../redux/todosSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Todo({
    id,
    text,
    isCompleted,
    isToday,
    hour

}) {
    const [thisTodoIsToday, setThisTodoIsToday] = hour ? React.useState(moment(new Date(hour)).isSame(moment(), 'day')) : React.useState(false);
    const [localHour, setLocalHour] = React.useState(new Date(hour));
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.todos);

    

    const handleDeleteTodo = async () => {
        dispatch(deleteTodoReducer(id));
        try {
            await AsyncStorage.setItem('@Todos', JSON.stringify(
                todos.filter(todo => todo.id !== id)
            ));

        } catch (error) {
            console.log(error);
            
        }
    }
    //Confirme delete
    const openConfirmationAlert = () => {
        Alert.alert(
            'Delete this task.',
            'Are you sure?',
            [
                {text: 'Yes', onPress: () => handleDeleteTodo() },
                {text: 'No', onPress: () => Alert.alert("This action was cancelled") },
            ],
            {
                canceled: true
            }
        );
    };

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox 
                    id={id}
                    text={text}
                    isCompleted={isCompleted}
                    isToday={thisTodoIsToday}
                    hour={hour}
                />
                <View>
                    <Text style={ 
                        isCompleted 
                        ? [styles.text, {textDecorationLine: 'line-through', color: '#73737330'}] 
                        : styles.text }
                    > { text } </Text>
                    <Text style={
                        isCompleted 
                        ? [styles.time, { textDecorationLine: 'line-through', color: '#73737330'}]
                        : styles.time}
                    > { moment(localHour).format('LT')} </Text>
                </View>
            </View>
            
            <TouchableOpacity onPress={openConfirmationAlert} >
                <MaterialIcons  name='delete-outline' size={24} color='#73737340' style={styles}/>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
        color: '#737373'
    },
    time: {
        fontSize: 13,
        color: '#a3a3a3',
        fontWeight: '500',
    },
})