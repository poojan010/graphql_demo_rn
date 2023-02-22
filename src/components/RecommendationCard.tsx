import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { WINDOW } from 'utils/index'

import useThemedStyles from 'hooks/useThemedStyles'

interface IRecommendationCard {
    recommendation: any
}

const RecommendationCard: FC<IRecommendationCard> = ({ recommendation }) => {

    const style = useThemedStyles(styles);

    const imageUri = { uri: recommendation?.mediaRecommendation?.coverImage?.large }

    const recommendationName = recommendation?.mediaRecommendation?.title?.userPreferred

    return (
        <View style={style.container}>

            <Image source={imageUri} style={style.image} />

            <Text style={style.recommendationName}>{recommendationName}</Text>

        </View>
    )
}



export default RecommendationCard

const styles = (theme: any) => StyleSheet.create({
    container: {
        marginRight: 20,
        width: WINDOW.width / 2.5,
    },
    image: {
        aspectRatio: 0.80,
        width: WINDOW.width / 2.5,
    },
    recommendationName: {
        fontSize: 14,
        fontWeight: "500",
        marginTop: 7,
        color: theme.colors.text,
    }
})  