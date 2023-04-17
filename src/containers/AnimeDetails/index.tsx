import React from 'react';
import { useQuery } from '@apollo/client';
import { StyleSheet, View } from 'react-native';
import { TabBarItem, TabView, TabBar } from 'react-native-tab-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Animated, { interpolate, useAnimatedStyle, } from 'react-native-reanimated';

import { WINDOW } from 'utils/index';
import useTheme from 'hooks/useTheme';
import useThemedStyles from 'hooks/useThemedStyles';
import RouteParamsList from 'navigator/routeParams';

import { GET_MEDIA_DETAILS } from './queries';

import {
    tabRoutes, HEADER_MAX_HEIGHT,
    interpolateBannerOpacity, interpolateBannerY, interpolateCoverY,
    interpolateCoverOpacity, interpolateButtonY, interpolateButtonOpacity,
} from './helper';

import Header from './Header';
import StatsTab from './Tabs/StatsTab';
import StaffTab from './Tabs/StaffTab';
import SocialTab from './Tabs/SocialTab';
import OverviewTab from './Tabs/OverviewTab';
import CharactersTab from './Tabs/CharactersTab';

import useScrollAnimationHandler from './hooks/useScrollAnimationHandler'


interface ScreenProps extends NativeStackScreenProps<RouteParamsList, "AnimeDetails"> { }

const AnimeDetails: React.FC<ScreenProps> = (props) => {

    const theme = useTheme()
    const style = useThemedStyles(styles);

    const { route: { params: { mediaItem: mediaItemFromParams } } } = props

    const { loading, refetch, data, error } = useQuery(GET_MEDIA_DETAILS, {
        variables: {
            id: mediaItemFromParams?.id,
            type: mediaItemFromParams?.type,
            isAdult: mediaItemFromParams?.isAdult,
        }
    })

    const mediaItem = loading || error
        ? mediaItemFromParams
        : data.Media


    const { tabIndex, setTabIndex, tabProps, translateY } = useScrollAnimationHandler()

    const tabNavigationState = { index: tabIndex, routes: tabRoutes }


    const tabViewAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const headerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const animatedBannerImageStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: interpolate(
                    translateY.value,
                    interpolateBannerY.inputRange,
                    interpolateBannerY.outputRange,
                    interpolateBannerY.extrapolate
                )
            }],
            opacity: interpolate(
                translateY.value,
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
                    translateY.value,
                    interpolateCoverY.inputRange,
                    interpolateCoverY.outputRange,
                    interpolateCoverY.extrapolate
                )

            }],
            opacity: interpolate(
                translateY.value,
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
                    translateY.value,
                    interpolateButtonY.inputRange,
                    interpolateButtonY.outputRange,
                    interpolateButtonY.extrapolate
                )
            }],
            opacity: interpolate(
                translateY.value,
                interpolateButtonOpacity.inputRange,
                interpolateButtonOpacity.outputRange,
                interpolateButtonOpacity.extrapolate
            )
        };
    });


    const tabViewProps = {
        lazy: true,
        swipeEnabled: true,
        initialLayout: { width: WINDOW.width },
    }

    const tabBarProps = {
        bounces: false,
        pressColor: 'transparent',
        activeColor: theme.colors.secondary,
        inactiveColor: theme.colors.text,
        style: style.tabViewStyle,
        indicatorStyle: style.indicatorStyle
    }


    const renderTabBarItem = (props: any) => {
        return (
            <TabBarItem
                {...props}
                style={style.tabItemStyle}
                labelStyle={style.labelStyle}
            />
        )
    }

    const renderTabBar = (props: any) => {
        return (
            <View>
                <TabBar
                    {...props}
                    {...tabBarProps}
                    scrollEnabled={true}
                    tabStyle={style.tabBarStyle}
                    renderTabBarItem={renderTabBarItem}
                />
            </View>
        )
    }


    const renderScene = ({ route }: { route: { key: string } }) => {
        switch (route.key) {
            case 'Overview':
                return (
                    <OverviewTab
                        {...tabProps[0]}
                        mediaItem={mediaItem}
                    />
                )
            case 'Characters':
                return (
                    <CharactersTab
                        {...tabProps[1]}
                        mediaItem={mediaItem}
                    />
                )
            case 'Staff':
                return (
                    <StaffTab
                        {...tabProps[2]}
                        mediaItem={mediaItem}
                    />
                )
            case 'Stats':
                return (
                    <StatsTab
                        {...tabProps[3]}
                        mediaItem={mediaItem}
                    />
                )
            case 'Social':
                return (
                    <SocialTab
                        {...tabProps[4]}
                        mediaItem={mediaItem}
                    />
                )
            default:
                return null
        }
    }

    return (
        <View style={style.screen}>
            <Animated.View style={[style.tabViewWraperStyle, tabViewAnimatedStyle]}>
                <TabView
                    {...tabViewProps}
                    lazy={false}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setTabIndex}
                    navigationState={tabNavigationState}
                />
            </Animated.View>
            <Header
                mediaItem={mediaItem}
                buttonStyle={animatedButtonStyles}
                headerStyle={headerAnimatedStyle}
                coverImageStyle={animatedCoverImageStyles}
                bannerImageStyle={animatedBannerImageStyles}
            />
        </View>
    );
};

const styles = (theme: any) => StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    tabViewWraperStyle: {
        flex: 1,
        top: HEADER_MAX_HEIGHT,
    },
    tabViewStyle: {
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
        marginHorizontal: (15),
    },
    labelStyle: {
        textTransform: 'capitalize',
        fontWeight: "500",
        color: "red",
        fontSize: 13.5
    },
    tabItemStyle: {
        height: 45
    },
    tabBarStyle: {
        width: 'auto',
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: theme.colors.secondary
    }
});

export default AnimeDetails;