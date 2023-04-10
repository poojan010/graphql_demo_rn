import { FlatList, } from 'react-native';
import { useMemo, useRef, useState } from 'react';
import { useAnimatedScrollHandler, useDerivedValue, useSharedValue, } from 'react-native-reanimated';

import { HEADER_HEIGHT_DIFF } from '../helper';

import useScrollSync, { ScrollPair } from './useScrollSync'

const useScrollAnimationHandler = () => {

    const [tabIndex, setTabIndex] = useState(0)

    const overviewRef = useRef<FlatList>(null)
    const overviewScrollValue = useSharedValue(0)
    const overviewScrollHandler = useAnimatedScrollHandler((event) => {
        overviewScrollValue.value = event.contentOffset.y
    });

    const charactersRef = useRef<FlatList>(null)
    const charactersScrollValue = useSharedValue(0)
    const charactersScrollHandler = useAnimatedScrollHandler((event) => {
        charactersScrollValue.value = event.contentOffset.y
    });

    const staffRef = useRef<FlatList>(null)
    const staffScrollValue = useSharedValue(0)
    const staffScrollHandler = useAnimatedScrollHandler((event) => {
        staffScrollValue.value = event.contentOffset.y
    });

    const statsRef = useRef<FlatList>(null)
    const statsScrollValue = useSharedValue(0)
    const statsScrollHandler = useAnimatedScrollHandler((event) => {
        statsScrollValue.value = event.contentOffset.y
    });

    const socialRef = useRef<FlatList>(null)
    const socialScrollValue = useSharedValue(0)
    const socialScrollHandler = useAnimatedScrollHandler((event) => {
        socialScrollValue.value = event.contentOffset.y
    });

    const scrollPairs = useMemo<ScrollPair[]>(
        () => [
            { key: 0, list: overviewRef, position: overviewScrollValue },
            { key: 1, list: charactersRef, position: charactersScrollValue },
            { key: 2, list: staffRef, position: staffScrollValue },
            { key: 3, list: statsRef, position: statsScrollValue },
            { key: 4, list: socialRef, position: socialScrollValue },
        ],
        [
            overviewRef, overviewScrollValue,
            charactersRef, charactersScrollValue,
            staffRef, staffScrollValue,
            statsRef, statsScrollValue,
            socialRef, socialScrollValue
        ]
    );

    const { sync } = useScrollSync(scrollPairs)

    const tabProps = [
        {
            ref: overviewRef,
            onScroll: overviewScrollHandler,
            onScrollEndDrag: sync.bind(this, 0),
            onMomentumScrollEnd: sync.bind(this, 0),
        },
        {
            ref: charactersRef,
            onScroll: charactersScrollHandler,
            onScrollEndDrag: sync.bind(this, 1),
            onMomentumScrollEnd: sync.bind(this, 1),
        },
        {
            ref: staffRef,
            onScroll: staffScrollHandler,
            onScrollEndDrag: sync.bind(this, 2),
            onMomentumScrollEnd: sync.bind(this, 2),
        },
        {
            ref: statsRef,
            onScroll: statsScrollHandler,
            onScrollEndDrag: sync.bind(this, 3),
            onMomentumScrollEnd: sync.bind(this, 3),
        },
        {
            ref: socialRef,
            onScroll: socialScrollHandler,
            onScrollEndDrag: sync.bind(this, 4),
            onMomentumScrollEnd: sync.bind(this, 4),
        },
    ]

    const currentScrollValue = useDerivedValue(() => {
        return tabIndex === 0
            ? overviewScrollValue.value
            : tabIndex === 1
                ? charactersScrollValue.value
                : tabIndex === 2
                    ? staffScrollValue.value
                    : tabIndex === 3
                        ? statsScrollValue.value
                        : socialScrollValue.value

    }, [tabIndex])

    const translateY = useDerivedValue(
        () => -Math.min(currentScrollValue.value, HEADER_HEIGHT_DIFF)
    );

    return {
        tabIndex,
        setTabIndex,
        tabProps,
        translateY,
    }

}


export default useScrollAnimationHandler