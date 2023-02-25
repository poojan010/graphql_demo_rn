import { gql } from '@apollo/client';

export const GET_MEDIA_DETAILS = gql`
    query mediaDetails($id:Int,$type:MediaType,$isAdult:Boolean){
        Media(id:$id,type:$type,isAdult:$isAdult){
            id 
            title{userPreferred romaji english native}
            coverImage{extraLarge large}
            bannerImage 
            startDate{year month day}
            endDate{year month day}
            description 
            season 
            seasonYear 
            type 
            format 
            status(version:2)
            episodes 
            duration 
            chapters 
            volumes 
            genres 
            synonyms 
            source(version:3)
            isAdult 
            isLocked 
            meanScore 
            averageScore 
            popularity 
            favourites 
            isFavouriteBlocked 
            hashtag 
            countryOfOrigin 
            isLicensed 
            isFavourite 
            isRecommendationBlocked 
            isFavouriteBlocked 
            isReviewBlocked 
            relations{
                edges{
                    id 
                    relationType(version:2)
                    node{
                        id 
                        title{userPreferred}
                        format 
                        type 
                        status(version:2)
                        bannerImage 
                        coverImage{large}
                    }
                }
            }
            characterPreview:characters(perPage:6,sort:[ROLE,RELEVANCE,ID]){
                edges{
                    id 
                    role 
                    name 
                    voiceActors(language:JAPANESE,sort:[RELEVANCE,ID]){
                        id 
                        name{userPreferred}
                        language:languageV2 
                        image{large}
                    }
                    node{
                        id 
                        name{userPreferred}
                        image{large}
                    }
                }
            }
            staffPreview:staff(perPage:8,sort:[RELEVANCE,ID]){
                edges{
                    id 
                    role 
                    node{
                        id 
                        name{userPreferred}
                        language:languageV2 
                        image{large}
                    }
                }
            }
            recommendations(perPage:7,sort:[RATING_DESC,ID]){
                pageInfo{total}
                nodes{
                    id 
                    rating 
                    userRating 
                    mediaRecommendation{
                        id 
                        title{userPreferred}
                        format 
                        type 
                        status(version:2)
                        bannerImage 
                        coverImage{large}
                    }
                    user{
                        id 
                        name 
                        avatar{large}
                    }
                }
            }
            externalLinks{
                id 
                site 
                url 
                type 
                language 
                color 
                icon 
                notes 
                isDisabled
            }
            streamingEpisodes{site title thumbnail url}
            trailer{id site}
            rankings{id rank type format year season allTime context}
            tags{id name description rank isMediaSpoiler isGeneralSpoiler userId}
            mediaListEntry{id status score}
            stats{
                statusDistribution{status amount}
            }
        }
    }
`


export const GET_CHARACTERS = gql`
    query characters($id:Int,$page:Int){
        Media(id:$id){
            id 
            characters(page:$page,sort:[ROLE,RELEVANCE,ID]){
                pageInfo{
                    total 
                    perPage 
                    currentPage 
                    lastPage 
                    hasNextPage
                }
                edges{
                    id 
                    role 
                    name 
                    voiceActorRoles(sort:[RELEVANCE,ID]){
                        roleNotes 
                        dubGroup 
                        voiceActor{
                            id 
                            name{userPreferred}
                            language:languageV2 
                            image{large}
                        }
                    }
                    node{
                        id 
                        name{userPreferred}
                        image{large}
                    }
                }
            }
        }
    }
` 