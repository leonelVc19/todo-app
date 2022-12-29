import { Text, Image, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Test() {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a "Por Hacer"</Text>
            <View style={styles.featureContainer}>
                <Image style={styles.icon} source={require('../assets/arrows.png')} />
                <View style={{flex: 1}}>
                    <Text style={styles.subTitle}>Manage Daily Tasks</Text>
                    <Text style={styles.subHeadline}>"Por Hacer" is a simple app that helps you to increase your productivity.</Text>
                </View>
            </View>
            <View style={styles.featureContainer}>
                <Image style={styles.icon} source={require('../assets/bell.png')} />
                <View style={{flex: 1}}>
                    <Text style={styles.subTitle}>Notificaciones</Text>
                    <Text style={styles.subHeadline}>Get notified when it's time to do you tasks.</Text>
                </View>
            </View>
            <View style={styles.featureContainer}>
                <Image style={styles.icon} source={require('../assets/design.png')} />
                <View style={{flex: 1}}>
                    <Text style={styles.subTitle}>Diseño Minimalista</Text>
                    <Text style={styles.subHeadline}>Enjoy a simple design that allows you to focus only on what you have to do.</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                <Text style={[styles.subTitle, {color: '#fff'}]}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

const androidHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: androidHeight > 800 ? 70 : 50,
        marginTop: 100,
    },
    subTitle: {
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 22,
    },
    subHeadline: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
        color: '#828282',
    },
    featureContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    icon: {
        width: 42,
        height: 42,
        marginRight: 20,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: '#007AFF',
        //backgroundColor: '#000000',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        borderRadius: 12,
        marginTop: 100,
        position: 'absolute',
        bottom: iphoneHeight > 800 ? 90 : 30,
    }
}); 