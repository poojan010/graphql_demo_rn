import React from 'react';
import { useQuery } from '@apollo/client';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HOME_DATA } from './queries'

import constants from 'constants/index';
import useThemedStyles from 'hooks/useThemedStyles';

import { HorizontalList } from 'components/index';



const mapFunction = (item: any, index: number) => ({
    name: item.title?.userPreferred,
    image: item.coverImage.large
})

const mainListKey = "homeData"


interface ScreenProps extends NativeStackScreenProps<any> { }

const Home: React.FC<ScreenProps> = () => {
    const style = useThemedStyles(styles);

    const { loading, refetch, data, error } = useQuery(HOME_DATA, {
        variables: {
            nextSeason: "SPRING",
            nextYear: 2023,
            season: "WINTER",
            seasonYear: 2023,
            type: "ANIME",
        }
    })

    if (loading || error) {
        return <SafeAreaView style={style.container} />
    }

    const listData = [
        { title: constants.homePage.trendingNow, data: data.trending.media },
        { title: constants.homePage.popularThisSeason, data: data.season.media },
        { title: constants.homePage.nextSeason, data: data.nextSeason.media },
        { title: constants.homePage.allTimePopluar, data: data.popular.media },
        { title: constants.homePage.top100, data: data.top.media },
    ]

    const renderSectionItem = ({ item, index }: { item: any, index: number }) => {
        const key = index.toString()
        return (
            <HorizontalList
                key={key}
                numColumns={3}
                list={item.data}
                title={item.title}
                onPressItem={() => { }}
                mapFunction={mapFunction}
                onPressViewAll={() => { }}
            />
        )
    }

    return (
        <SafeAreaView style={style.container}>

            <FlatList
                bounces={false}
                data={listData}
                listKey={mainListKey}
                style={style.mainListStyle}
                renderItem={renderSectionItem}
                showsVerticalScrollIndicator={false}
            />

        </SafeAreaView>
    );
};

const styles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    mainListStyle: {
        marginHorizontal: 15,
    }

});

export default Home;