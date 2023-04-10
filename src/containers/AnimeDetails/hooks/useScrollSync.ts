
import { RefObject } from 'react';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';

import { HEADER_HEIGHT_DIFF, } from '../helper';



export type ScrollPair = {
    key: number,
    list: RefObject<FlatList>;
    position: Animated.SharedValue<number>;
};


const useScrollSync = (scrollPairs: ScrollPair[]) => {
    const sync = (index: number, event: any) => {

        const { y } = event.nativeEvent.contentOffset;

        for (const { key, list, position } of scrollPairs) {
            const scrollPosition = position.value ?? 0;

            if (index === key) continue;

            if (scrollPosition > HEADER_HEIGHT_DIFF && y > HEADER_HEIGHT_DIFF) {
                continue;
            }

            if (list?.current !== null) {
                if ("scrollToOffset" in list?.current) {
                    list.current?.scrollToOffset({
                        offset: Math.min(y, HEADER_HEIGHT_DIFF),
                        animated: false,
                    });
                }
            }
        }

    }
    return { sync }
}

export default useScrollSync