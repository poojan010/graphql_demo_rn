import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { WINDOW } from 'utils/index'

import useThemedStyles from 'hooks/useThemedStyles'

interface ICharacterCard {
    imageUri1: any,
    imageUri2: any,
    leftMainText: any,
    leftSubText: any,
    rightMainText: any,
    rightSubText: any,
}

const CharacterCard: FC<ICharacterCard> = ({ imageUri1, imageUri2, leftMainText, leftSubText, rightMainText, rightSubText }) => {

    const style = useThemedStyles(styles);

    return (
        <View style={style.container}>

            <View style={style.leftView}>
                <Image source={imageUri1} style={style.image} />
                <View style={style.leftInfoView}>
                    <Text style={style.characterCardMainText} numberOfLines={2} >
                        {leftMainText}
                    </Text>
                    <Text style={style.charcharacterCardSubText}>
                        {leftSubText}
                    </Text>
                </View>
            </View>

            <View style={style.rightView}>
                <View style={style.rightInfoView}>
                    <Text style={style.characterCardMainText} numberOfLines={2} >
                        {rightMainText}
                    </Text>
                    <Text style={style.charcharacterCardSubText}>
                        {rightSubText}
                    </Text>
                </View>
                <Image source={imageUri2} style={style.image} />
            </View>
        </View>
    )

}



export default CharacterCard

const styles = (theme: any) => StyleSheet.create({
    container: {
        marginVertical: 7,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: theme.colors.background2,
    },
    leftView: {
        width: "48.5%",
        flexDirection: "row",
    },
    rightView: {
        width: "48.5%",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    image: {
        aspectRatio: 0.66,
        width: WINDOW.width / 5,
    },
    leftInfoView: {
        marginVertical: 10,
        marginLeft: 5,
        paddingRight: "47%",
        justifyContent: "space-between"
    },
    rightInfoView: {
        marginVertical: 10,
        marginRight: 5,
        paddingLeft: "47%",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    characterCardMainText: {
        fontSize: 13,
        fontWeight: "500",
        color: theme.colors.text,
        textTransform: "capitalize",
    },
    charcharacterCardSubText: {
        fontSize: 12,
        color: theme.colors.text,
        textTransform: "capitalize",
    },
})  