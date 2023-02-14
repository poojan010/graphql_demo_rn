import React, { FC } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { StyleSheet, TouchableOpacity, View, } from 'react-native'

import { WINDOW } from 'utils/index';

import useTheme from 'hooks/useTheme';
import useThemedStyles from 'hooks/useThemedStyles';


const MenuIcon = () => {
    const theme = useTheme()
    return (
        <Entypo
            name={"menu"}
            size={25}
            color={theme.colors.secondary}
        />
    )
}

const ShadowWrapper = ({ children }: { children: any }) => {
    const style = useThemedStyles(styles);
    return (
        <View style={style.shadowCardContainer}>
            <View style={style.shadowCard}>
                {children}
            </View>
        </View>
    )
}

interface IHelperButton { }

const HelperButton: FC<IHelperButton> = ({ }) => {

    const theme = useTheme()
    const style = useThemedStyles(styles);

    const onPressButton = () => {
        theme.toggleTheme()
    }

    return (
        <View style={style.helperButtonView}>

            <ShadowWrapper>
                <TouchableOpacity onPress={onPressButton} style={style.button}>
                    <MenuIcon />
                </TouchableOpacity>
            </ShadowWrapper>

        </View>
    )
}

export default HelperButton

const styles = (theme: any) => StyleSheet.create({
    helperButtonView: {
        position: "absolute",
        right: WINDOW.width / 11,
        bottom: WINDOW.width / 6.5,
    },
    button: {
        padding: 10,
        backgroundColor: theme.colors.background2
    },
    shadowCardContainer: {
        shadowRadius: 3,
        shadowOpacity: 0.3,
        shadowColor: theme.colors.shadowColor,
        borderRadius: 5,
        shadowOffset: { height: 3, width: 1 },
    },
    shadowCard: {
        elevation: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: 5,
    },
})