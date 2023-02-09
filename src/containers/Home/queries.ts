import { gql } from '@apollo/client';

export const HOME_DATA = gql`
    query($season: MediaSeason, $seasonYear: Int, $nextSeason:MediaSeason, $nextYear: Int)  {

        trending:Page(page: 1, perPage: 6) { media(type: ANIME,sort: TRENDING_DESC, isAdult: false) {...media} }

        season:Page(page: 1, perPage: 6) { media(type: ANIME,sort: POPULARITY_DESC, isAdult: false, season: $season, seasonYear: $seasonYear) {...media } }

        nextSeason:Page(page: 1, perPage: 6) { media(type: ANIME,sort: TRENDING_DESC, isAdult: false,season: $nextSeason, seasonYear: $nextYear) {...media} }

        popular:Page(page: 1, perPage: 6) { media(sort:POPULARITY_DESC,type:ANIME,isAdult:false) {...media} }

        top:Page(page: 1, perPage: 10) { media(sort:SCORE_DESC,type:ANIME,isAdult:false) {...media} }
        
    }
    fragment media on Media{
        id 
        title{
            userPreferred
        }
        coverImage{
            extraLarge 
            large 
            color
        }
        startDate{
            year 
            month 
            day
        }
        endDate{
            year 
            month 
            day
        }
        bannerImage 
        season 
        seasonYear
        description 
        type 
        format 
        status(version:2)
        episodes 
        duration 
        chapters 
        volumes 
        genres 
        isAdult 
        averageScore 
        popularity 
        mediaListEntry{
            id 
            status
        }
        nextAiringEpisode{
            airingAt 
            timeUntilAiring 
            episode
        }
        studios(isMain:true){
            edges{
                isMain 
                node{
                    id 
                    name
                }
            }
        }
    }
`