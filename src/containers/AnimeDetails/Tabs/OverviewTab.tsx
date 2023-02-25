import React, { FC } from 'react'
import RenderHtml from 'react-native-render-html';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { WINDOW } from 'utils/index';

import useTheme from 'hooks/useTheme';
import useThemedStyles from 'hooks/useThemedStyles';

import RelationCard from 'components/RelationCard';
import CharacterCard from 'components/CharacterCard';
import RecommendationCard from 'components/RecommendationCard';

import constants from 'constants/index';
const screenConstants = constants.animeDetails

const descriptionHtmlWidth = WINDOW.width - 20


const HorizontalList = ({ data, title, renderItem }: { data: any[], title: string, renderItem: any }) => {
    const style = useThemedStyles(styles);

    return (
        <>
            <Text style={style.sectionTitle}>
                {title}
            </Text>
            <ScrollView
                horizontal
                style={style.horizontalList}
                contentContainerStyle={style.horizontalListContainer}
            >
                {data?.map((item: any, index: number) => renderItem(item, index))}
            </ScrollView>
        </>
    )
}

interface IOverViewTab {
    mediaItem: any
}

const OverviewTab: FC<IOverViewTab> = ({ mediaItem }) => {

    const theme = useTheme()
    const style = useThemedStyles(styles);

    const descriptionContent = `<p style="color : ${theme.colors.shadowColor}">${mediaItem?.description}</p>`
    const descriptionHtml = { html: descriptionContent }

    const relations = mediaItem?.relations?.edges

    const characters = mediaItem?.characterPreview?.edges

    const recommendations = mediaItem?.recommendations?.nodes


    const renderRelation = (item: any, index: number) => {
        return (
            <RelationCard
                relation={item}
                key={index.toString()}
            />
        )
    }

    const renderRecommendation = (item: any, index: number) => {
        return (
            <RecommendationCard
                recommendation={item}
                key={index.toString()}
            />
        )
    }

    const renderCharacter = (item: any, index: number) => {
        const imageUri1 = { uri: item?.node?.image?.large }
        const imageUri2 = { uri: item?.voiceActors[0]?.image?.large }

        const leftMainText = item?.node?.name?.userPreferred
        const leftSubText = item?.role

        const rightMainText = item?.voiceActors[0]?.name?.userPreferred
        const rightSubText = item?.voiceActors[0]?.language
        return (
            <CharacterCard
                imageUri1={imageUri1}
                imageUri2={imageUri2}
                key={index.toString()}
                leftSubText={leftSubText}
                leftMainText={leftMainText}
                rightSubText={rightSubText}
                rightMainText={rightMainText}
            />
        )
    }


    return (
        <View style={style.container}>

            <Text style={style.sectionTitle}>
                {screenConstants.description}
            </Text>
            <View style={style.descriptionBox}>
                <RenderHtml
                    source={descriptionHtml}
                    contentWidth={descriptionHtmlWidth}
                />
            </View>

            <HorizontalList
                data={relations}
                renderItem={renderRelation}
                title={screenConstants.relations}
            />

            <Text style={style.sectionTitle}>
                {screenConstants.characters}
            </Text>
            {characters?.map(renderCharacter)}

            <HorizontalList
                data={recommendations}
                renderItem={renderRecommendation}
                title={screenConstants.recommendations}
            />

        </View>
    )
}

export default OverviewTab

const styles = (theme: any) => StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
    descriptionTitle: {
        fontSize: 14,
        marginTop: 10,
        fontWeight: "500",
        color: theme.colors.text,
    },
    descriptionBox: {
        marginTop: 5,
        borderWidth: 0.5,
        paddingHorizontal: 15,
        borderColor: theme.colors.text,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "500",
        color: theme.colors.text,
        marginTop: 20
    },
    horizontalList: {
        marginTop: 5
    },
    horizontalListContainer: {
        alignItems: "flex-start"
    }
})