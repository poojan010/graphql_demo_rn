import React, { FC, forwardRef } from 'react'
import { useQuery } from '@apollo/client';
import Animated from 'react-native-reanimated';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { VictoryArea, VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from "victory-native";

import { WINDOW } from 'utils/index';
import useTheme from 'hooks/useTheme';
import useThemedStyles from 'hooks/useThemedStyles';

import InfoContainer from '../InfoContainer';

import { GET_STATS } from '../queries';

import { HEADER_MIN_HEIGHT } from '../helper';



interface IStatsTab {
    mediaItem: any,
    onScroll: any,
    onScrollEndDrag: any,
    onMomentumScrollEnd: any,
}

const StatsTab = forwardRef<FlatList, IStatsTab>(({ mediaItem, ...restProps }, ref) => {

    const theme = useTheme()
    const style = useThemedStyles(styles);

    const { loading, refetch, data, error, fetchMore } = useQuery(GET_STATS, {
        variables: {
            id: mediaItem?.id,
        }
    })


    const recerntActivitiesData = data?.Media?.trends?.nodes
        ? [...data?.Media?.trends?.nodes].reverse().slice(1).map((item, index) => ({ ...item, day: (index + 2).toString(), x: (index + 2).toString(), y: item?.trending }))
        : []

    const renderFooterComponent = () => {
        return <View style={style.bottomSpace} />
    }

    const renderHeaderComponent = () => {
        return (
            <InfoContainer mediaItem={mediaItem} />
        )
    }

    return (
        <Animated.FlatList
            data={[""]} //@ts-ignore
            ref={ref}
            {...restProps}
            bounces={false}
            style={style.container}
            scrollEventThrottle={16}
            contentContainerStyle={style.container}
            ListHeaderComponent={renderHeaderComponent}
            ListFooterComponent={renderFooterComponent}
            renderItem={() => {
                return (
                    <>
                        <ScrollView horizontal>
                            <VictoryChart height={WINDOW.height / 2.5} width={WINDOW.width * 2} theme={VictoryTheme.material} >
                                {/* <VictoryBar data={recerntActivitiesData} x="day" y="trending" /> */}
                                <VictoryArea
                                    data={recerntActivitiesData}
                                    interpolation="natural"
                                    labels={({ datum }) => datum.y}
                                    labelComponent={<VictoryLabel dy={10} />}
                                    // domain={{ y: [0, 5000] }}
                                    domainPadding={{ x: 25 / 4 }}
                                    style={{
                                        data: {
                                            fill: theme.colors.secondary, fillOpacity: 0.7, stroke: theme.colors.secondary, strokeWidth: 3,
                                            width: 1000
                                        },
                                        labels: {
                                            fontSize: 15,
                                            fill: theme.colors.secondary
                                        },

                                    }}
                                />
                            </VictoryChart>
                        </ScrollView>
                    </>
                )
            }}
        />
    )
})

export default StatsTab

const styles = (theme: any) => StyleSheet.create({
    container: {
        marginHorizontal: 10,
        height: WINDOW.height
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "500",
        color: theme.colors.text,
        marginTop: 20
    },
    bottomSpace: {
        height: HEADER_MIN_HEIGHT
    }
})