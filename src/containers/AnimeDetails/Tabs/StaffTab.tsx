import React, { forwardRef } from 'react'
import { useQuery } from '@apollo/client';
import Animated from 'react-native-reanimated';
import { FlatList, StyleSheet, View } from 'react-native';

import useThemedStyles from 'hooks/useThemedStyles';

import StaffCard from 'components/StaffCard';
import InfoContainer from '../InfoContainer';
import ListFooterLoader from 'components/ActivityIndicator';

import { GET_STAFF } from '../queries';

import { WINDOW } from 'utils/index';
import { HEADER_MIN_HEIGHT } from '../helper';

interface IStaffTab {
    mediaItem: any,
    onScroll: any,
    onScrollEndDrag: any,
    onMomentumScrollEnd: any,
}

const StaffTab = forwardRef<FlatList, IStaffTab>(({ mediaItem, ...restProps }, ref) => {
    const style = useThemedStyles(styles);

    const { loading, refetch, data, error, fetchMore } = useQuery(GET_STAFF, {
        variables: {
            id: mediaItem?.id,
            page: 1
        }
    })

    const staff = data?.Media?.staff?.edges
        ? data?.Media?.staff?.edges
        : []


    const pageInfo = data?.Media?.staff?.pageInfo
        ? data?.Media?.staff?.pageInfo
        : {}


    const onEndReached = () => {
        if (pageInfo?.hasNextPage === true) {
            fetchMore({
                variables: {
                    id: mediaItem?.id,
                    page: pageInfo?.currentPage + 1
                }
            })
        }
    }


    const renderStaff = ({ item, index }: { item: any, index: number }) => {
        const imageUri = { uri: item?.node?.image?.large }

        const mainText = item?.node?.name?.userPreferred
        const subText = item?.role

        return (
            <StaffCard
                key={index.toString()}
                imageUri={imageUri}
                mainText={mainText}
                subText={subText}
            />
        )
    }

    const renderFooterComponent = () => {
        if (pageInfo?.hasNextPage === true) {
            return (
                <>
                    <ListFooterLoader />
                    <View style={style.bottomSpace} />
                </>
            )
        }
        else return <View style={style.bottomSpace} />
    }


    const renderHeaderComponent = () => {
        return (
            <InfoContainer mediaItem={mediaItem} />
        )
    }


    return (
        <Animated.FlatList
            data={staff} //@ts-ignore
            ref={ref}
            bounces={false}
            {...restProps}
            scrollEventThrottle={16}
            renderItem={renderStaff}
            onEndReached={onEndReached}
            contentContainerStyle={style.container}
            ListFooterComponent={renderFooterComponent}
            ListHeaderComponent={renderHeaderComponent}
        />
    )
})

export default StaffTab

const styles = (theme: any) => StyleSheet.create({
    container: {
        marginHorizontal: 10,
        minHeight: WINDOW.height
    },
    bottomSpace: {
        height: HEADER_MIN_HEIGHT
    }
})