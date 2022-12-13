import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';



export default function AddTodo() {
    const [name, setName] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [isToday, setIsToday] = React.useState(false);
    console.log('Fecha: ',date)

    //for datepicker for android
    const [mode, setMode] = React.useState('time');
    const [show, setShow] = React.useState(false);
    const [text, setText] = React.useState('algo');
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'android')
        setDate(currentDate);
        console.log('fechha',currentDate)

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
        let fTime = 'Hours'  + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();

        setText(fDate + '\n' + fTime)
        console.log('fecha selecionada',fDate + '\n' + fTime)



    }
    //const onC
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
   

    return (
        <View style={styles.container}>
            <Text style={styles.title}>AddTodo</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputText}> Name</Text>
                <TextInput 
                    placeholder="Add descrioption"
                    placeholderTextColor='#00000030'
                    style={styles.textInput}
                    onChangeText={(text) => {setName(name)}}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}> Hour</Text>

                <TouchableOpacity onPress={() => showMode('time')} style={styles.buttonSelect}>
                    <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Select Hour</Text>
                </TouchableOpacity>
                {show &&  (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={'time'}
                        is24Hour={true}
                        onChange={onChange}
                        style={{width: '80%'}}
                    />
                )}

            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}> Today</Text>
                <Switch 
                    value={isToday}
                    onValueChange={(value) => { setIsToday(value)}}
                />
            </View>

            <TouchableOpacity onPress={() => alert('ss')}style={styles.button}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 17,}}>Done</Text>
            </TouchableOpacity>
            
            <Text style={{color: '#00000030'}}>If you today, the task will be considered as tomorrow</Text>

            <Text>{text}</Text>
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
        paddingBottom: 30
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
    }
})