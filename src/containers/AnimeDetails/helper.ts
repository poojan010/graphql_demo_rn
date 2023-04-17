import moment from "moment";
import { StatusBar } from "react-native"
import { Extrapolation } from "react-native-reanimated"

import { WINDOW } from "utils/index"

import constants from 'constants/index';


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


const infoTitles = constants.mediaInfoContainer

export const extractInfoData = (mediaItem: any) => {
    let data: any[] = []

    if (mediaItem?.nextAiringEpisode) {
        const airingDate = mediaItem?.nextAiringEpisode?.airingAt * 1000

        let value = "Ep " + mediaItem?.nextAiringEpisode?.episode;

        const duration = moment.duration(moment(airingDate).diff(moment()))

        if (duration.years() > 0) {
            value += " " + duration.years() + "years"
        }
        else if (duration.months() > 0) {
            value += " " + duration.months() + "months"
        }
        else if (duration.days() > 0) {
            value += " " + duration.days() + "d " + duration.hours() + "h " + duration.minutes() + "m"
        }
        else if (duration.hours() > 0) {
            value += " " + duration.hours() + "h " + duration.minutes() + "m"
        }
        else {
            value += " " + duration.minutes() + "m"
        }

        data.push({
            title: infoTitles.airing,
            value: value
        })
    }
    if (mediaItem?.format) {
        data.push({
            title: infoTitles.format,
            value: mediaItem.format
        })
    }
    if (mediaItem?.duration) {
        data.push({
            title: infoTitles.duration,
            value: mediaItem?.duration + " mins"
        })
    }
    if (mediaItem?.status) {
        data.push({
            title: infoTitles.status,
            value: mediaItem?.status
        })
    }
    if (mediaItem?.startDate) {
        const startDate = moment.utc()

        startDate.set('year', mediaItem?.startDate?.year);
        startDate.set('month', mediaItem?.startDate?.month - 1);
        startDate.set('date', mediaItem?.startDate?.day);
        startDate.startOf('day');

        data.push({
            title: infoTitles.startDate,
            value: startDate.format("MMM DD, YYYY")
        })
    }
    if (mediaItem?.season) {
        data.push({
            title: infoTitles.season,
            value: mediaItem?.season + " " + mediaItem?.seasonYear
        })
    }
    if (mediaItem?.averageScore) {
        data.push({
            title: infoTitles.averageScore,
            value: mediaItem?.averageScore + "%"
        })
    }
    if (mediaItem?.meanScore) {
        data.push({
            title: infoTitles.meanScore,
            value: mediaItem?.meanScore + "%"
        })
    }
    if (mediaItem?.popularity) {
        data.push({
            title: infoTitles.popularity,
            value: mediaItem?.popularity
        })
    }
    if (mediaItem?.favourites) {
        data.push({
            title: infoTitles.favourites,
            value: mediaItem?.favourites
        })
    }
    if (mediaItem?.studios) {
        const mainStudio = mediaItem?.studios?.edges.find((item: any) => item?.isMain)
        const studioName = mainStudio?.node?.name

        data.push({
            title: infoTitles.studios,
            value: studioName
        })
    }
    if (mediaItem?.studios) {
        const producers = mediaItem?.studios?.edges.filter((item: any) => !item?.isMain)
        let producersNames = ""
        producers.forEach((item: any, index: number) => {
            producersNames += item?.node?.name
            if (index < producers?.length - 1) {
                producersNames += ", "
            }
        })

        data.push({
            title: infoTitles.producers,
            value: producersNames
        })
    }
    if (mediaItem?.source) {
        data.push({
            title: infoTitles.source,
            value: mediaItem?.source
        })
    }
    if (mediaItem?.hashtag) {
        data.push({
            title: infoTitles.hashtag,
            value: mediaItem?.hashtag
        })
    }
    if (mediaItem?.genres && mediaItem?.genres?.length > 0) {
        let genresList = ""
        mediaItem?.genres.forEach((item: any, index: number) => {
            genresList += item
            if (index < mediaItem?.genres?.length - 1) {
                genresList += ", "
            }
        })

        data.push({
            title: infoTitles.airing,
            value: genresList
        })
    }
    if (mediaItem?.title?.romaji) {
        data.push({
            title: infoTitles.romaji,
            value: mediaItem?.title?.romaji
        })
    }
    if (mediaItem?.title?.english) {
        data.push({
            title: infoTitles.english,
            value: mediaItem?.title?.english
        })
    }
    if (mediaItem?.title?.native) {
        data.push({
            title: infoTitles.native,
            value: mediaItem?.title?.native
        })
    }

    return data;
}