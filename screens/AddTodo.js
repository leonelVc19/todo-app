import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Button, TextInput, Switch, Platform } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoReducer } from '../redux/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

export default function AddTodo() {
    const [name, setName] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [isToday, setIsToday] = React.useState(false);
    const [withAlert, setWithAlert] = React.useState(false);
    const listTodos = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const AddTodo = async () => {
        const newTodo = {
            id: Math.floor(Math.random() * 1000000),
            text: name,
            hour: isToday ? date.toISOString() : new Date(date).getTime() + 24 * 60 *60 * 1000,
            isToday: isToday,
            isCompleted: false,
        }
        try {
            await AsyncStorage.setItem('@Todos', JSON.stringify([...listTodos, newTodo]));
            dispatch(addTodoReducer(newTodo));
            console.log('Todo saved correctly');
            if(withAlert) {
                await scheduleTodoNotifications(newTodo);
            }
            navigation.goBack();
        } catch (e) {
            console.log('Error saving Todo' + e)
        }
    }

    //for datepicker for android
    const [text, setText] = React.useState('Time selected');
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = 'Date: ' + tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime =  'Hour: ' + tempDate.getHours() + ':' + tempDate.getMinutes();
        setText(fDate+ '\n' + fTime);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
        });
    };
    const showTimepicker = () => {
        showMode('time');
    };

    //Funcion to notifications
    const scheduleTodoNotifications = async (todo) => {
        const trigger = new Date(todo.hour);
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "It's time!!",
                    body: todo.text,
                },
                trigger,
            });
            console.log('Notificacion was schedule');
        } catch (error) {
            alert('The notification failed to schedule, make sure the hour is valid');
        }

    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>AddTodo</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Name</Text>
                <TextInput 
                    placeholder="Add descrioption"
                    placeholderTextColor='#00000030'
                    style={styles.textInput}
                    onChangeText={(text) => {setName(text)}}
                />
            </View>

            <View style={styles.inputContainer}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.inputText}>Hour: </Text>
                    <Text style={{color: '#a3a3a3', fontSize: 11, fontWeight: 'bold', top: 5}}>{text}</Text>
                </View>
                <TouchableOpacity onPress={showTimepicker} style={styles.buttonSelect}>
                    <Text style={{color:'#fff'}}>Show time</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.inputContainer, {alignItems: 'center',}]}>
                <View>
                    <Text style={styles.inputText}>Today</Text>
                    <Text style={{color:'#00000030', fontSize: 12, maxWidth: '85%'}}>If you today, the task will be considered as tomorrow</Text>
                </View>
                <Switch 
                    value={isToday}
                    onValueChange={(value) => { setIsToday(value)}}
                />
            </View>

            <View style={[styles.inputContainer, {alignItems: 'center', }]}>
                <View>
                    <Text style={styles.inputText}>Alert</Text>
                    <Text style={{color:'#00000030', fontSize: 12, maxWidth: '85%'}}>You will receive an alert at the time you set fot this reminder</Text>
                </View>
                <Switch 
                        value={withAlert}
                        onValueChange={(value) => { setWithAlert(value)}}
                    />
                
            </View>
            
            <TouchableOpacity onPress={AddTodo}style={styles.button}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 17,}}>Done</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: '#F2F8FA'
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 10
    },
    inputText: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24,
    },
    textInput: {
        borderBottomColor: '#00000030',
        borderBottomWidth: 1,
        width: '80%',
    },
    inputContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 18
    },
    button: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        height: 46,
        borderRadius: 11,
    },
    buttonSelect:{
        marginTop: -5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        height: 40,
        width: '30%',
        borderRadius: 11,
    },
    timeSelect:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        height: 25,
        width: '55%',
        borderRadius: 3,
    }
})