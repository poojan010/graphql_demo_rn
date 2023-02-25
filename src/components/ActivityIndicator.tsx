import useTheme from 'hooks/useTheme'
import React, { FC } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'


interface IListFooterLoader { }

const ListFooterLoader: FC<IListFooterLoader> = ({ }) => {
    const theme = useTheme()
    return (
        <ActivityIndicator size={"small"} color={theme.colors.text} />
    )
}

export default ListFooterLoader

const styles = StyleSheet.create({

})