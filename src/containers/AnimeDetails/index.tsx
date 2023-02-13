import React, { useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Animated, ImageStyle, SafeAreaView, StatusBar, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { WINDOW } from 'utils/index';
import constants from 'constants/index';
import useThemedStyles from 'hooks/useThemedStyles';

import RouteParamsList from 'navigator/routeParams';



const statusBarHeight = StatusBar?.currentHeight ? StatusBar.currentHeight : 32


const HEADER_MAX_HEIGHT = WINDOW.height / 2.7
const HEADER_MIN_HEIGHT = WINDOW.height / 8
const HEADER_HEIGHT_DIFF = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT


const BANNER_IMAGE_HEIGHT = WINDOW.height / 4

const COVER_IMAGE_HEIGHT = WINDOW.height / 4.5
const COVER_IMAGE_WIDTH = WINDOW.width / 3.75



interface ScreenProps extends NativeStackScreenProps<RouteParamsList, "AnimeDetails"> { }

const AnimeDetails: React.FC<ScreenProps> = (props) => {

    const style = useThemedStyles(styles);

    const { route: { params: { mediaItem } } } = props
    if (__DEV__) console.log(mediaItem);

    const bannerImageSource = { uri: mediaItem.bannerImage }
    const coverImageSource = { uri: mediaItem?.coverImage?.large }

    const scrollYValue = useRef(new Animated.Value(0)).current


    /* Interpolation Values */

    const headerTranslateY = scrollYValue.interpolate({
        inputRange: [0, HEADER_HEIGHT_DIFF],
        outputRange: [0, -HEADER_HEIGHT_DIFF],
        extrapolate: "clamp"
    })

    const bannerImageTranslateY = scrollYValue.interpolate({
        inputRange: [0, HEADER_HEIGHT_DIFF],
        outputRange: [0, 100],
        extrapolate: 'clamp',
    });

    const bannerImageOpacity = scrollYValue.interpolate({
        inputRange: [0, HEADER_HEIGHT_DIFF / 4, HEADER_HEIGHT_DIFF / 2, HEADER_HEIGHT_DIFF / 1.5, HEADER_HEIGHT_DIFF],
        outputRange: [1, 0.8, 0.6, 0.3, 0],
        extrapolate: 'clamp',
    });

    const coverImageTranslateY = scrollYValue.interpolate({
        inputRange: [0, HEADER_HEIGHT_DIFF],
        outputRange: [0, -10],
        extrapolate: 'clamp',
    });

    const coverImageOpacity = scrollYValue.interpolate({
        inputRange: [0, HEADER_HEIGHT_DIFF / 4, HEADER_HEIGHT_DIFF / 2, HEADER_HEIGHT_DIFF / 1.5, HEADER_HEIGHT_DIFF],
        outputRange: [1, 0.8, 0.6, 0.3, 0],
        extrapolate: 'clamp',
    });

    const buttonTranslateY = scrollYValue.interpolate({
        inputRange: [0, HEADER_HEIGHT_DIFF],
        outputRange: [0, -10],
        extrapolate: 'clamp',
    });

    const buttonOpacity = scrollYValue.interpolate({
        inputRange: [0, HEADER_HEIGHT_DIFF / 4, HEADER_HEIGHT_DIFF / 2, HEADER_HEIGHT_DIFF / 1.5, HEADER_HEIGHT_DIFF],
        outputRange: [1, 0.8, 0.6, 0.3, 0],
        extrapolate: 'clamp',
    });


    /* Styles */

    // @ts-ignore
    const headerAnimatedStyles: StyleProp<ViewStyle> = {
        transform: [{ translateY: headerTranslateY }],
    }

    // @ts-ignore
    const animatedBannerImageStyles: StyleProp<ImageStyle> = {
        transform: [{ translateY: bannerImageTranslateY }],
        opacity: bannerImageOpacity
    }

    // @ts-ignore
    const animatedCoverImageStyles: StyleProp<ImageStyle> = {
        transform: [{ translateY: coverImageTranslateY }],
        opacity: coverImageOpacity
    }

    // @ts-ignore   
    const animatedButtonStyles: StyleProp<ViewStyle> = {
        transform: [{ translateY: buttonTranslateY }],
        opacity: buttonOpacity
    }


    return (
        <SafeAreaView style={style.screen}>

            <Animated.View style={[style.header, headerAnimatedStyles]}>

                <Animated.Image
                    source={bannerImageSource}
                    style={[style.bannerImage, animatedBannerImageStyles]}
                />
                <Animated.Image
                    source={coverImageSource}
                    style={[style.coverImage, animatedCoverImageStyles]}
                />

                <Animated.View style={[style.addToListButtonView, animatedButtonStyles]} >
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

            <Animated.ScrollView
                bounces={false}
                style={style.scrollView}
                contentContainerStyle={style.scrollViewContainer}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
                    { useNativeDriver: true },
                )}
            >

            </Animated.ScrollView>

        </SafeAreaView>
    );
};

const styles = (theme: any) => StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        position: "absolute",
        height: HEADER_MAX_HEIGHT,
    },
    scrollView: {
        height: 2000
    },
    scrollViewContainer: {
        height: 5000,
        paddingTop: HEADER_MAX_HEIGHT - statusBarHeight,
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
        position: "absolute",
        left: WINDOW.width / 25,
        color: theme.colors.text,
        top: BANNER_IMAGE_HEIGHT / 2 + COVER_IMAGE_WIDTH / 0.66 + 15
    }
});

export default AnimeDetails;