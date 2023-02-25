import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { howmuchTime_IsPast, WINDOW } from 'utils/index'

import useTheme from 'hooks/useTheme'
import useThemedStyles from 'hooks/useThemedStyles'

import constants from 'constants/index'


const ChatIcon = ({ color, style }: { color: string, style: any }) => <Ionicons style={style} color={color} name="chatbubbles" size={15} />
const HeartIcon = ({ color, style }: { color: string, style: any }) => <Ionicons style={style} color={color} name="heart" size={15} />


interface IActivityCard {
    activity: any
}

const ActivityCard: FC<IActivityCard> = ({ activity }) => {

    const theme = useTheme()
    const style = useThemedStyles(styles);

    const imageUri = { uri: activity?.media?.coverImage?.large }

    const userName = activity?.user?.name
    const userAvatar = { uri: activity?.user?.avatar?.large }

    const statusString = activity?.status + " " + activity?.progress + " " + constants.of

    const mediaTitle = activity?.media?.title?.userPreferred

    const creationTime = howmuchTime_IsPast(activity?.createdAt)

    return (
        <View style={style.container}>

            <Image source={imageUri} style={style.image} />

            <View style={style.rightView1}>
                <Text style={style.userName}>{userName}</Text>
                <Text style={style.statusText}>{statusString}</Text>
                <Text style={style.mediaTitle}>{mediaTitle}</Text>
                <Image source={userAvatar} style={style.avatar} />
            </View>

            <View style={style.rightView2}>
                <Text style={style.creationTime}>{creationTime}</Text>
                <View style={style.iconsRow}>
                    <ChatIcon style={style.iconStyle} color={theme.colors.text} />
                    <HeartIcon style={style.iconStyle} color={theme.colors.text} />
                </View>
            </View>

        </View>
    )
}



export default ActivityCard

const styles = (theme: any) => StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.background2,
    },
    image: {
        width: WINDOW.width * 0.20,
    },
    rightView1: {
        flex: 1.4,
        marginLeft: 8,
        marginVertical: 10,
        justifyContent: "space-between",
    },
    userName: {
        fontSize: 14,
        fontWeight: "500",
        color: theme.colors.secondary,
    },
    statusText: {
        fontSize: 13.5,
        marginTop: 10,
        textTransform: "capitalize",
        color: theme.colors.text,
    },
    mediaTitle: {
        fontSize: 14,
        fontWeight: "500",
        marginTop: 4,
        color: theme.colors.secondary,
        textTransform: "capitalize",
    },
    avatar: {
        aspectRatio: 1,
        marginTop: 10,
        borderRadius: 4,
        width: WINDOW.width / 10,
    },
    rightView2: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    creationTime: {
        fontSize: 12,
        fontWeight: "500",
        color: theme.colors.text,
    },
    iconsRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconStyle: {
        marginHorizontal: 4
    }
})  