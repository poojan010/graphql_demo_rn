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
            nextAiringEpisode{airingAt timeUntilAiring episode}
            studios{edges{isMain node{id name}}}
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


export const GET_STAFF = gql`
    query staff($id:Int,$page:Int){
        Media(id:$id){
            id 
            staff(page:$page,sort:[RELEVANCE,ID]){
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


export const GET_ACTIVITIES = gql`
    query($id:Int,$page:Int){
        Page(page:$page,perPage:40){
            pageInfo{
                total 
                perPage 
                currentPage 
                lastPage 
                hasNextPage
            }
            activities(mediaId:$id,sort:ID_DESC,type:MEDIA_LIST){... on 
                ListActivity{
                    id 
                    userId 
                    type 
                    status
                    progress 
                    replyCount 
                    isLocked 
                    isSubscribed 
                    isLiked 
                    likeCount 
                    createdAt 
                    user{id name avatar{large}}
                    media{
                        id 
                        type 
                        bannerImage 
                        title{userPreferred}
                        coverImage{large}
                    }
                }
            }
        }
    }
`

export const GET_STATS = gql`
    query($id:Int){
        Media(id:$id){
            id 
            rankings{id rank type format year season allTime context}
            trends(sort:ID_DESC){
                nodes{averageScore date trending popularity}
            }
            airingTrends:trends(releasing:true,sort:EPISODE_DESC){
                nodes{averageScore inProgress episode}
            }
            distribution:stats{
                status:statusDistribution{status amount}
                score:scoreDistribution{score amount}
            }
        }
    }
`