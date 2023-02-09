import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useQuery, gql } from '@apollo/client';






interface ScreenProps extends NativeStackScreenProps<any> {

}

const AnimeDetails: React.FC<ScreenProps> = () => {

    // const { loading, refetch, data, error } = useQuery(QUERY)




    return (
        <View style={styles.container}>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

});

export default AnimeDetails;