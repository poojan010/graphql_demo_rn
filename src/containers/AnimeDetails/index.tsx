import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { WINDOW } from 'utils/index';
import constants from 'constants/index';
import useThemedStyles from 'hooks/useThemedStyles';
import RouteParamsList from 'navigator/routeParams';

import { GET_MEDIA_DETAILS } from './queries';

import {
    tabRoutes, BANNER_IMAGE_HEIGHT, COVER_IMAGE_WIDTH, HEADER_MAX_HEIGHT,
    interpolateHeader, interpolateBannerOpacity, interpolateBannerY, interpolateCoverY,
    interpolateCoverOpacity, interpolateButtonY, interpolateButtonOpacity, interpolateScrollViewY,
} from './helper';

import TabBar from 'components/TabBar';
import StaffTab from './Tabs/StaffTab';
import SocialTab from './Tabs/SocialTab';
import OverviewTab from './Tabs/OverviewTab';
import CharactersTab from './Tabs/CharactersTab';



interface ScreenProps extends NativeStackScreenProps<RouteParamsList, "AnimeDetails"> { }

const AnimeDetails: React.FC<ScreenProps> = (props) => {

    const style = useThemedStyles(styles);

    const { route: { params: { mediaItem: mediaItemFromParams } } } = props

    const { loading, refetch, data, error } = useQuery(GET_MEDIA_DETAILS, {
        variables: {
            id: mediaItemFromParams?.id,
            type: mediaItemFromParams?.type,
            isAdult: mediaItemFromParams?.isAdult,
        }
    })


    const [tabIndex, setTabIndex] = useState(0)

    const mediaItem = loading || error
        ? mediaItemFromParams
        : data.Media


    const bannerImageSource = { uri: mediaItem.bannerImage }
    const coverImageSource = { uri: mediaItem?.coverImage?.large }


    const scrollYValue = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollYValue.value = event.contentOffset.y;
    });


    /* Styles */
    const headerAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: interpolate(
                    scrollYValue.value,
                    interpolateHeader.inputRange,
                    interpolateHeader.outputRange,
                    interpolateHeader.extrapolate,
                )
            }],
        };
    });

    const animatedBannerImageStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: interpolate(
                    scrollYValue.value,
                    interpolateBannerY.inputRange,
                    interpolateBannerY.outputRange,
                    interpolateBannerY.extrapolate
                )
            }],
            opacity: interpolate(
                scrollYValue.value,
                interpolateBannerOpacity.inputRange,
                interpolateBannerOpacity.outputRange,
                interpolateBannerOpacity.extrapolate
            )

        };
    });

    const animatedCoverImageStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: interpolate(
                    scrollYValue.value,
                    interpolateCoverY.inputRange,
                    interpolateCoverY.outputRange,
                    interpolateCoverY.extrapolate
                )

            }],
            opacity: interpolate(
                scrollYValue.value,
                interpolateCoverOpacity.inputRange,
                interpolateCoverOpacity.outputRange,
                interpolateCoverOpacity.extrapolate
            )
        };
    });

    const animatedButtonStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: interpolate(
                    scrollYValue.value,
                    interpolateButtonY.inputRange,
                    interpolateButtonY.outputRange,
                    interpolateButtonY.extrapolate
                )
            }],
            opacity: interpolate(
                scrollYValue.value,
                interpolateButtonOpacity.inputRange,
                interpolateButtonOpacity.outputRange,
                interpolateButtonOpacity.extrapolate
            )
        };
    });

    const animatedScollViewStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: interpolate(
                    scrollYValue.value,
                    interpolateScrollViewY.inputRange,
                    interpolateScrollViewY.outputRange,
                    interpolateScrollViewY.extrapolate
                )
            }],
        };
    });



    const ScrollWrapper = ({ children }: { children: any }) => {
        const contentOffset = {
            x: 0,
            y: scrollYValue.value
        }

        const renderItem = ({ item, index }: any) => (
            <Animated.View style={[animatedScollViewStyles]}>
                {children}
            </Animated.View>
        )

        return (
            <Animated.FlatList
                data={[""]}
                bounces={false}
                renderItem={renderItem}
                scrollEventThrottle={1}
                onScroll={scrollHandler}
                decelerationRate={'fast'}
                ListEmptyComponent={null}
                nestedScrollEnabled={true}
                alwaysBounceVertical={false}
                contentOffset={contentOffset}
                alwaysBounceHorizontal={false}
                contentContainerStyle={style.scrollViewContainer}
            />
        )
    }

    const renderScene = () => {
        switch (tabIndex) {
            case 0: {
                return (
                    <OverviewTab mediaItem={mediaItem} />
                )
            }
            case 1: {
                return (
                    <CharactersTab mediaItem={mediaItem} />
                )
            }
            case 2: {
                return (
                    <StaffTab mediaItem={mediaItem} />
                )
            }
            case 4: {
                return (
                    <SocialTab mediaItem={mediaItem} />
                )
            }
            default:
                return null
        }
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

                <TabBar
                    tabRoutes={tabRoutes}
                    onPressTab={setTabIndex}
                    selctedTabIndex={tabIndex}
                />

            </Animated.View>

            <ScrollWrapper>
                {renderScene()}
            </ScrollWrapper>


        </SafeAreaView >
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
        backgroundColor: theme.colors.background,
    },
    scrollViewContainer: {
        paddingBottom: HEADER_MAX_HEIGHT + 50
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
});

export default AnimeDetails;