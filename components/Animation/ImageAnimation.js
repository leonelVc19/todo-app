import { Animated, View } from "react-native";

export const ImageAnimation = ({ children }) => {
    const animatedValue = new Animated.Value(1);
    Animated.loop(
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: .98,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: .99,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ])
    ).start();
    return (
        <View style={{ left: '25%', paddingTop: 5}}>
            <Animated.View style={{transform: [{ scale: animatedValue}]}}>
                {children}
            </Animated.View>
        </View>
    );
}