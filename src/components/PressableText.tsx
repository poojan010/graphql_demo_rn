import React, { FC } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'


interface IPressableText {
    text: string,
    onPress: any,
    textStyle?: StyleProp<TextStyle>,
    containerStyle?: StyleProp<ViewStyle>,
}

const PressableText: FC<IPressableText> = ({ text, onPress, textStyle, containerStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={containerStyle}>
            <Text style={[styles.text, textStyle]}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default PressableText

const styles = StyleSheet.create({
    text: {
        fontSize: 14,

    }
})