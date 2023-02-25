import React, { FC } from 'react'
import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet, View } from 'react-native';

import useThemedStyles from 'hooks/useThemedStyles';

import StaffCard from 'components/StaffCard';
import ListFooterLoader from 'components/ActivityIndicator';

import { GET_STAFF } from '../queries';



interface IStaffTab {
    mediaItem: any
}

const StaffTab: FC<IStaffTab> = ({ mediaItem }) => {
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
                <ListFooterLoader />
            )
        }
        else return null
    }


    return (
        <View style={style.container}>

            <FlatList
                data={staff}
                renderItem={renderStaff}
                onEndReached={onEndReached}
                ListFooterComponent={renderFooterComponent}
            />

        </View>
    )
}

export default StaffTab

const styles = (theme: any) => StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
})