import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import useTheme from 'hooks/useTheme';
import useThemedStyles from 'hooks/useThemedStyles';

import { extractInfoData } from './helper';


interface Props {
    mediaItem: any,
}

const InfoItem = ({ title, value }: any) => {

    const style = useThemedStyles(styles);

    return (
        <View style={style.itemStyle}>
            <Text style={style.itemTitle}>
                {title}
            </Text>
            <Text style={style.itemValue}>
                {value}
            </Text>
        </View>
    )
}

const InfoContainer: React.FC<Props> = (props) => {

    const { mediaItem } = props

    const theme = useTheme()
    const style = useThemedStyles(styles);

    const infoData = extractInfoData(mediaItem)

    return (
        <ScrollView horizontal style={style.container}>
            {infoData.map((item, index) => {
                return (
                    <InfoItem
                        title={item.title}
                        value={item.value}
                    />
                )
            })}
        </ScrollView>
    )
}

export default InfoContainer

const styles = (theme: any) => StyleSheet.create({
    container: {
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: theme.colors.background2,
    },
    itemStyle: {
        marginHorizontal: 10,
        marginVertical: 10,
    },
    itemTitle: {
        fontSize: 16,
        marginVertical: 5,
        color: theme.colors.text
    },
    itemValue: {
        fontSize: 14,
        marginVertical: 5,
        color: theme.colors.text,
    }
})