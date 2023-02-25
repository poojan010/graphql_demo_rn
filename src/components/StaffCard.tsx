import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { WINDOW } from 'utils/index'

import useThemedStyles from 'hooks/useThemedStyles'

interface IStaffCard {
    imageUri: any,
    mainText: string,
    subText: string
}

const StaffCard: FC<IStaffCard> = ({ imageUri, mainText, subText }) => {

    const style = useThemedStyles(styles);

    return (
        <View style={style.container}>
            <Image source={imageUri} style={style.image} />
            <View style={style.rightView}>
                <Text style={style.mainText}>{mainText}</Text>
                <Text style={style.subText}>{subText}</Text>
            </View>
        </View>
    )
}



export default StaffCard

const styles = (theme: any) => StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 10,
        backgroundColor: theme.colors.background2,
    },
    image: {
        width: WINDOW.width * 0.2,
        aspectRatio: 0.8
    },
    rightView: {
        flex: 1,
        marginLeft: 10,
        marginVertical: 10,
        justifyContent: "space-between",
    },
    mainText: {
        fontSize: 14,
        fontWeight: "500",
        textTransform: "capitalize",
        color: theme.colors.text,
    },
    subText: {
        fontSize: 12,
        color: theme.colors.text,
        textTransform: "capitalize",
    },
})  