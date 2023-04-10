import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { } from 'react-native-reanimated';

import useTheme from 'hooks/useTheme';
import useThemedStyles from 'hooks/useThemedStyles';

import { WINDOW } from 'utils/index';
import constants from 'constants/index';
import { BANNER_IMAGE_HEIGHT, COVER_IMAGE_WIDTH, HEADER_MAX_HEIGHT } from './helper';


interface Props {
    mediaItem: any,
    headerStyle: any,
    bannerImageStyle: any,
    coverImageStyle: any,
    buttonStyle: any,
}

const Header: React.FC<Props> = (props) => {

    const { mediaItem, headerStyle, coverImageStyle, bannerImageStyle, buttonStyle } = props

    const theme = useTheme()
    const style = useThemedStyles(styles);

    const bannerImageSource = { uri: mediaItem.bannerImage }
    const coverImageSource = { uri: mediaItem?.coverImage?.large }

    const title = mediaItem?.title?.userPreferred

    return (
        <Animated.View style={[style.header, headerStyle]}>

            <Animated.Image
                source={bannerImageSource}
                style={[style.bannerImage, bannerImageStyle]}
            />
            <Animated.Image
                source={coverImageSource}
                style={[style.coverImage, coverImageStyle]}
            />

            <Animated.View style={[style.addToListButtonView, buttonStyle]} >
                <TouchableOpacity style={style.addToListButton}>
                    <Text style={style.addToListButtonText}>
                        {constants.animeDetails.addToList}
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.Text numberOfLines={1} style={[style.title]}>
                {mediaItem?.title?.userPreferred}
            </Animated.Text>

        </Animated.View>
    )
}

export default Header

const styles = (theme: any) => StyleSheet.create({
    header: {
        top: 0,
        left: 0,
        right: 0,
        position: "absolute",
        height: HEADER_MAX_HEIGHT,
        backgroundColor: theme.colors.background,
    },
    bannerImage: {
        height: BANNER_IMAGE_HEIGHT,
    },
    coverImage: {
        aspectRatio: 0.66,
        position: 'absolute',
        width: COVER_IMAGE_WIDTH,
        left: WINDOW.width / 25,
        top: BANNER_IMAGE_HEIGHT / 2,
    },
    addToListButtonView: {
        position: "absolute",
        left: COVER_IMAGE_WIDTH + WINDOW.width / 12.5,
        top: BANNER_IMAGE_HEIGHT / 2 + COVER_IMAGE_WIDTH / 0.66 - WINDOW.width / 10
    },
    addToListButton: {
        backgroundColor: "#1F51FF",
        width: WINDOW.width / 1.65,
        justifyContent: "center",
        alignItems: "center",
        height: WINDOW.width / 10,
        borderRadius: 5
    },
    addToListButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "500"
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        left: WINDOW.width / 25,
        color: theme.colors.text,
        top: WINDOW.width / 10 + 20
    },
})