import { StatusBar } from "react-native"
import { Extrapolation, interpolate } from "react-native-reanimated"

import { WINDOW } from "utils/index"


export const statusBarHeight = StatusBar?.currentHeight ? StatusBar.currentHeight : 55


export const TAB_BAR_HEIGHT = 48
export const HEADER_MAX_HEIGHT = WINDOW.height / 2.75
export const HEADER_MIN_HEIGHT = WINDOW.height / 5.5
export const HEADER_HEIGHT_DIFF = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + TAB_BAR_HEIGHT



export const BANNER_IMAGE_HEIGHT = WINDOW.height / 4

export const COVER_IMAGE_HEIGHT = WINDOW.height / 4.5
export const COVER_IMAGE_WIDTH = WINDOW.width / 3.75



export const tabRoutes = [
    { key: 'Overview', title: "Overview" },
    { key: 'Characters', title: "Characters" },
    { key: 'Staff', title: "Staff" },
    { key: 'Stats', title: "Stats" },
    { key: 'Social', title: "Social" },
    { key: 'Reviews', title: "Reviews" },
]

export const interpolateHeader = {
    inputRange: [0, HEADER_HEIGHT_DIFF],
    outputRange: [0, -HEADER_HEIGHT_DIFF],
    extrapolate: Extrapolation.CLAMP
}

export const interpolateBannerY = {
    inputRange: [0, -HEADER_HEIGHT_DIFF],
    outputRange: [0, 100],
    extrapolate: Extrapolation.CLAMP
}

export const interpolateBannerOpacity = {
    inputRange: [0, -HEADER_HEIGHT_DIFF],
    outputRange: [1, 0],
    extrapolate: Extrapolation.CLAMP
}

export const interpolateCoverY = {
    inputRange: [0, -HEADER_HEIGHT_DIFF],
    outputRange: [0, -10],
    extrapolate: Extrapolation.CLAMP
}

export const interpolateCoverOpacity = {
    inputRange: [0, -HEADER_HEIGHT_DIFF],
    outputRange: [1, 0],
    extrapolate: Extrapolation.CLAMP
}

export const interpolateButtonY = {
    inputRange: [0, -HEADER_HEIGHT_DIFF],
    outputRange: [0, -10],
    extrapolate: Extrapolation.CLAMP
}

export const interpolateButtonOpacity = {
    inputRange: [0, -HEADER_HEIGHT_DIFF],
    outputRange: [1, 0],
    extrapolate: Extrapolation.CLAMP
}

export const interpolateScrollViewY = {
    inputRange: [0, HEADER_HEIGHT_DIFF],
    outputRange: [HEADER_MAX_HEIGHT - statusBarHeight, HEADER_MIN_HEIGHT * 2],
    extrapolate: Extrapolation.CLAMP
}
