import { useQuery } from '@apollo/client';
import React, { forwardRef } from 'react'
import Animated from 'react-native-reanimated';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import useThemedStyles from 'hooks/useThemedStyles';

import CharacterCard from 'components/CharacterCard';
import ListFooterLoader from 'components/ActivityIndicator';

import { GET_CHARACTERS } from '../queries';

import constants from 'constants/index';

const screenConstants = constants.animeDetails



interface ICharactersTab {
    mediaItem: any,
    onScroll: any,
    onScrollEndDrag: any,
    onMomentumScrollEnd: any,
}

const CharactersTab = forwardRef<FlatList, ICharactersTab>(({ mediaItem, ...restProps }, ref) => {

    const style = useThemedStyles(styles);

    const { loading, refetch, data, error, fetchMore } = useQuery(GET_CHARACTERS, {
        variables: {
            id: mediaItem?.id,
            page: 1
        }
    })

    const characters = data?.Media?.characters?.edges
        ? data?.Media?.characters?.edges
        : []

    const pageInfo = data?.Media?.characters?.pageInfo
        ? data?.Media?.characters?.pageInfo
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


    const renderCharacter = ({ item, index }: { item: any, index: number }) => {

        const imageUri1 = { uri: item?.node?.image?.large }
        const imageUri2 = { uri: item?.voiceActorRoles[0]?.voiceActor?.image?.large }

        const leftMainText = item?.node?.name?.userPreferred
        const leftSubText = item?.role

        const rightMainText = item?.voiceActorRoles[0]?.voiceActor?.name?.userPreferred
        const rightSubText = item?.voiceActorRoles[0]?.voiceActor?.language

        return (
            <CharacterCard
                imageUri1={imageUri1}
                imageUri2={imageUri2}
                key={index.toString()}
                leftSubText={leftSubText}
                leftMainText={leftMainText}
                rightSubText={rightSubText}
                rightMainText={rightMainText}
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

    const renderHeaderComponent = () => {
        return (
            <Text style={style.sectionTitle}>
                {screenConstants.characters}
            </Text>
        )
    }


    return (
        <View style={style.container}>
            <Animated.FlatList //@ts-ignore
                ref={ref}
                data={characters}
                bounces={false}
                {...restProps}
                scrollEventThrottle={16}
                renderItem={renderCharacter}
                onEndReached={onEndReached}
                ListHeaderComponent={renderHeaderComponent}
                ListFooterComponent={renderFooterComponent}
            />

        </View>
    )
})

export default CharactersTab

const styles = (theme: any) => StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "500",
        color: theme.colors.text,
        marginTop: 20
    },
})