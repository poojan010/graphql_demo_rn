import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { WINDOW } from 'utils/index'

import useThemedStyles from 'hooks/useThemedStyles'

interface IRelationCard {
    relation: any
}

const RelationCard: FC<IRelationCard> = ({ relation }) => {

    const style = useThemedStyles(styles);

    const imageUri = { uri: relation?.node?.coverImage?.large }

    const relationType = relation?.relationType

    const relationName = relation?.node?.title?.userPreferred

    const relationStatus = relation?.node?.type + " " + relation?.node?.status

    return (
        <View style={style.container}>
            <Image source={imageUri} style={style.image} />
            <View style={style.rightView}>
                <View>
                    <Text style={style.relationType}>{relationType}</Text>
                    <Text style={style.relationName}>{relationName}</Text>
                </View>
                <View>
                    <Text style={style.relationStatus}>{relationStatus}</Text>
                </View>
            </View>
        </View>
    )
}



export default RelationCard

const styles = (theme: any) => StyleSheet.create({
    container: {
        marginRight: 20,
        flexDirection: "row",
        maxWidth: WINDOW.width,
        height: WINDOW.height / 5.7,
        minWidth: WINDOW.width * 0.75,
        backgroundColor: theme.colors.background2,
    },
    image: {
        flex: 1
    },
    rightView: {
        flex: 2,
        marginLeft: 10,
        marginVertical: 10,
        justifyContent: "space-between",
    },
    relationType: {
        fontSize: 12,
        fontWeight: "500",
        color: theme.colors.secondary,
        textTransform: "capitalize",
    },
    relationName: {
        fontSize: 15,
        marginTop: 10,
        fontWeight: "500",
        color: theme.colors.text,
    },
    relationStatus: {
        fontSize: 12,
        color: theme.colors.text,
        textTransform: "capitalize",
    },
})  