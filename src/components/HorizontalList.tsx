import React, { FC } from 'react'
import { FlatList, Image, ImageStyle, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

import { WINDOW } from 'utils/index'
import constants from 'constants/index'

import useThemedStyles from 'hooks/useThemedStyles'

import PressableText from './PressableText'


const PARENT_MARGIN_HOR = 30
const CARD_SPACING = 5
const CARD_IMAGE_ASPECT_RATIO = 0.75


const MediaCard = ({ index, item, onPress, numColumns }: { index: number, numColumns: number, item: any, onPress: any }) => {

    const style = useThemedStyles(styles);

    const TOTAL_LIST_WIDTH = WINDOW.width - PARENT_MARGIN_HOR
    const CARD_WIDTH = TOTAL_LIST_WIDTH / numColumns - CARD_SPACING
    const CARD_IMAGE_HEIGHT = CARD_WIDTH / CARD_IMAGE_ASPECT_RATIO

    const cardViewStyle: StyleProp<ViewStyle> = {
        marginTop: 15,
        width: CARD_WIDTH,
        marginRight: CARD_SPACING * 2,
    }

    const imageSource = { uri: item.image }
    const imageStyle: StyleProp<ImageStyle> = {
        borderRadius: 5,
        width: CARD_WIDTH,
        height: CARD_IMAGE_HEIGHT,
    }

    return (
        <TouchableOpacity activeOpacity={0.7} key={index} onPress={onPress} style={cardViewStyle}>
            <Image
                style={imageStyle}
                source={imageSource}
            />
            <Text
                numberOfLines={2}
                style={style.cardName}
                ellipsizeMode={"tail"}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    )
}


interface HListProps {
    list: any[],
    title: string,
    mapFunction: any,
    onPressItem: any,
    numColumns: number,
    onPressViewAll: any,
}

const HorizontalList: FC<HListProps> = (props) => {

    const style = useThemedStyles(styles);

    const { list, title, onPressViewAll, onPressItem, mapFunction, numColumns } = props

    const updatedList: any = list.map(mapFunction)

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        const orginalItem = list[index]

        const key = index.toString()

        return (
            <MediaCard
                key={key}
                item={item}
                index={index}
                numColumns={numColumns}
                onPress={onPressItem.bind(this, orginalItem)}
            />
        )
    }

    return (
        <View style={style.container}>

            <View style={style.topRowContainer}>
                <Text style={style.titleStyle}>
                    {title}
                </Text>
                <PressableText
                    onPress={onPressViewAll}
                    textStyle={style.buttonTextStyle}
                    text={constants.mediaHorizontalList.viewAll}
                />
            </View>

            <FlatList
                bounces={false}
                listKey={title}
                data={updatedList}
                renderItem={renderItem}
                numColumns={numColumns}
                style={style.listStyle}
                showsHorizontalScrollIndicator={false}
            />

        </View>
    )
}

export default HorizontalList

const styles = (theme: any) => StyleSheet.create({
    container: {
        marginVertical: 25
    },
    topRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleStyle: {
        fontSize: 17,
        fontWeight: '700',
        color: theme.colors.text,
    },
    buttonTextStyle: {
        fontSize: 13,
        color: theme.colors.text,
    },
    listStyle: {
        flexGrow: 1
    },
    cardName: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: '500',
        color: theme.colors.text,
    }
})