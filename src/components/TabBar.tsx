import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import Animated from 'react-native-reanimated'

import { WINDOW } from 'utils/index'
import useThemedStyles from 'hooks/useThemedStyles'


interface ITabBar {
    selctedTabIndex: number,
    onPressTab: (index: number) => void,
    tabRoutes: Array<{ key: string, title: string }>,
}

const TabBar: FC<ITabBar> = ({ tabRoutes, selctedTabIndex, onPressTab }) => {

    const style = useThemedStyles(styles)

    const renderTabItem = (item: any, index: number) => {

        const key = index.toString()

        const tabItemStyle = index === selctedTabIndex ? style.tabItemSelected : {}

        const tabItemTextStyle = index === selctedTabIndex ? style.tabItemTitleSelected : {}

        return (
            <TouchableOpacity
                key={key}
                onPress={onPressTab.bind(this, index)}
                activeOpacity={0.7} style={[style.tabItem, tabItemStyle]}
            >
                <Text style={[style.tabItemTitle, tabItemTextStyle]}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <Animated.ScrollView
            horizontal
            bounces={false}
            style={style.scrollView}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={style.scrollViewContainer}
        >
            {tabRoutes.map((item, index) => renderTabItem(item, index))}
        </Animated.ScrollView>
    )
}

export default TabBar

const styles = (theme: any) => StyleSheet.create({
    scrollView: {
        marginHorizontal: 10
    },
    scrollViewContainer: {
        alignItems: "flex-start",
        top: WINDOW.width / 10 + 30,
    },
    tabItem: {
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 12,
        marginRight: 10,
        marginTop: 5,
    },
    tabItemSelected: {
        backgroundColor: "#1F51FF",
    },
    tabItemTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: theme.colors.text,
    },
    tabItemTitleSelected: {
        color: "white",
    }
})