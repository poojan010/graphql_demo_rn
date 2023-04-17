import { useQuery } from '@apollo/client';
import React, { FC, forwardRef } from 'react'
import Animated from 'react-native-reanimated';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import useThemedStyles from 'hooks/useThemedStyles';

import InfoContainer from '../InfoContainer';
import ActivityCard from 'components/ActivityCard';
import ListFooterLoader from 'components/ActivityIndicator';

import { GET_ACTIVITIES } from '../queries';

import { HEADER_MIN_HEIGHT } from '../helper';

import constants from 'constants/index';
import { WINDOW } from 'utils/index';

const screenConstants = constants.animeDetails



const LoadMoreButton = ({ onPress }: { onPress: any }) => {
    const style = useThemedStyles(styles);
    return (
        <TouchableOpacity onPress={onPress} style={style.loadMoreButton}>
            <Text style={style.buttonText}>
                {screenConstants.loadMore}
            </Text>
        </TouchableOpacity>
    )
}

interface ISocialTab {
    mediaItem: any,
    onScroll: any,
    onScrollEndDrag: any,
    onMomentumScrollEnd: any,
}

const SocialTab = forwardRef<FlatList, ISocialTab>(({ mediaItem, ...restProps }, ref) => {
    const style = useThemedStyles(styles);

    const { loading, refetch, data, error, fetchMore } = useQuery(GET_ACTIVITIES, {
        variables: {
            id: mediaItem?.id,
            page: 1,
        }
    })


    const activities = data?.Page?.activities
        ? data?.Page?.activities
        : []


    const pageInfo = data?.Page?.pageInfo
        ? data?.Page?.pageInfo
        : {}


    const loadMoreData = () => {
        if (pageInfo?.hasNextPage === true) {
            fetchMore({
                variables: {
                    id: mediaItem?.id,
                    page: pageInfo?.currentPage + 1,
                }
            })
        }
    }


    const renderThread = ({ item, index }: { item: any, index: number }) => {
        return (
            <ActivityCard activity={item} />
        )
    }

    const renderFooterComponent = () => {
        if (pageInfo?.hasNextPage === true) {
            return (
                <View style={style.footerContainer}>
                    {loading
                        ? <ListFooterLoader />
                        : <LoadMoreButton onPress={loadMoreData} />
                    }
                    <View style={style.bottomSpace} />
                </View>
            )
        }
        else return <View style={style.bottomSpace} />
    }

    const renderHeaderComponent = () => {
        return (
            <>
                <InfoContainer mediaItem={mediaItem} />
                <Text style={style.sectionTitle}>
                    {screenConstants.recentActivity}
                </Text>
            </>
        )
    }


    return (
        <Animated.FlatList
            data={activities} //@ts-ignore
            ref={ref}
            {...restProps}
            bounces={false}
            scrollEventThrottle={16}
            renderItem={renderThread}
            contentContainerStyle={style.container}
            ListHeaderComponent={renderHeaderComponent}
            ListFooterComponent={renderFooterComponent}
        />
    )
})

export default SocialTab

const styles = (theme: any) => StyleSheet.create({
    container: {
        marginHorizontal: 10,
        minHeight: WINDOW.height
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "500",
        color: theme.colors.text,
        marginTop: 20
    },
    loadMoreButton: {
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background2
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: theme.colors.text,
    },
    footerContainer: {
        marginTop: 5
    },
    bottomSpace: {
        height: HEADER_MIN_HEIGHT
    }
})