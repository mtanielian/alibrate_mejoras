<template>
    <div>
        <div style="background: #f5f5f5">
            <div id="header-ranking"
                style="background: #666 url('https://cdn.alibrate.com/images/bg-rankings.jpg') center; height: 160px;" 
                class="header-int hidden-xs"
            >
                <div class="container text-left ptl" style="margin-left:10px">
                    <h1 class="h2 light-grey text-uppercase mtl" style="color: white;font-weight: bold;padding-top: 50px;">
                        Rankings
                    </h1>
                </div>
            </div>
            <positions id="positionsWeb"></positions>
            <carouselGenre ></carouselGenre>
            <div style="margin-top:20px">
                <div class="row">
                    <div class="col-12">
                        <h2 class="text-uppercase" style="font-weight:bold">Ranking general</h2>
                    </div>
                    <div class="col-xl-5 offset-md-1 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label style="font-size:18px;font-weight:bold">Mejores reseñadores </label>
                        <contentGeneric :medals="this.medals" :ws_data="this.ws_top_more_likes_in_reviews_data"></contentGeneric>
                        <div style="margin:20px;color: #02a7e1; cursor:pointer" v-on:click='openModal(ws_top_more_likes_in_reviews)'>
                            Ver Todos <i class="fas fa-sort-down" style="margin-bottom:3px; margin-left: 5px;"></i>
                        </div>
                    </div>
                    <div class="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label style="font-size:18px;font-weight:bold">Libros más leídos </label>
                        <contentBooks :ws_data="this.ws_top_books_readed_in_libraries_data"></contentBooks>
                        <div style="margin:20px;color: #02a7e1; cursor:pointer" v-on:click='openModalBooks(ws_top_books_readed_in_libraries)'>
                            Ver Todos <i class="fas fa-sort-down" style="margin-bottom:3px; margin-left: 5px;"></i>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-5 offset-md-1 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label style="font-size:18px;font-weight:bold">Los que más reseñan </label>
                        <contentGeneric :medals="this.medals" :ws_data="this.ws_top_reviewers_data"></contentGeneric>
                        <div style="margin:20px;color: #02a7e1; cursor:pointer" v-on:click='openModal(ws_top_reviewers)'>
                            Ver Todos <i class="fas fa-sort-down" style="margin-bottom:3px; margin-left: 5px;"></i>
                        </div>
                    </div>
                    <div class="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label style="font-size:18px;font-weight:bold">Lectores con más seguidores </label>
                        <contentGeneric class="container" :medals="this.medals" :ws_data="this.ws_top_more_followed_data"></contentGeneric>
                        <div style="margin:20px;color: #02a7e1; cursor:pointer" v-on:click='openModal(ws_top_more_followed)'>
                            Ver Todos <i class="fas fa-sort-down" style="margin-bottom:3px; margin-left: 5px;"></i>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-5 offset-md-1 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label style="font-size:18px;font-weight:bold">Lectores con mejores textos </label>
                        <contentGeneric :medals="this.medals" :ws_data="this.ws_top_more_likes_in_texts_data"></contentGeneric>
                        <div style="margin:20px;color: #02a7e1; cursor:pointer" v-on:click='openModal(ws_top_more_likes_in_texts)'>
                            Ver Todos <i class="fas fa-sort-down" style="margin-bottom:3px; margin-left: 5px;"></i>
                        </div>
                    </div>
                    <div class="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label style="font-size:18px;font-weight:bold">Lectores con mejores listas </label>
                        <contentGeneric class="container" :medals="this.medals" :ws_data="this.ws_top_more_likes_in_lists_data"></contentGeneric>
                        <div style="margin:20px;color: #02a7e1; cursor:pointer" v-on:click='openModal(ws_top_more_likes_in_lists)'>
                            Ver Todos <i class="fas fa-sort-down" style="margin-bottom:3px; margin-left: 5px;"></i>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-5 offset-md-1 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label style="font-size:18px;font-weight:bold">Lectores con mejores citas </label>
                        <contentGeneric :medals="this.medals" :ws_data="this.ws_top_more_likes_in_quotes_data"></contentGeneric>
                        <div style="margin:20px;color: #02a7e1; cursor:pointer" v-on:click='openModal(ws_top_more_likes_in_quotes)'>
                            Ver Todos <i class="fas fa-sort-down" style="margin-bottom:3px; margin-left: 5px;"></i>
                        </div>
                    </div>
                    <div class="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label style="font-size:18px;font-weight:bold">Lectores con mejores imágenes </label>
                        <contentGeneric class="container" :medals="this.medals" :ws_data="this.ws_top_more_likes_in_images_data"></contentGeneric>
                        <div style="margin:20px;color: #02a7e1; cursor:pointer" v-on:click='openModal(ws_top_more_likes_in_images)'>
                            Ver Todos <i class="fas fa-sort-down" style="margin-bottom:3px; margin-left: 5px;"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal></modal>
        <modalBooks></modalBooks>
    </div>
</template>



<script>
import { constants } from '../../../constants'
import carouselGenre from './carousel_ranking_genre'
import positions from './positions'
import contentGeneric from './content_generic'
import contentBooks from './content_books'
import modal from './modal_generic'
import modalBooks from './modal_books'
import axios from 'axios'
import medalGold from '../../assets/images/medal-pos-1.svg'
import medalBronze from '../../assets/images/medal-pos-2.svg'
import medalSilver from '../../assets/images/medal-pos-3.svg'



export default {
    components : {
        carouselGenre, 
        positions, 
        contentGeneric,
        contentBooks, 
        modal, 
        modalBooks
    },
    created() {
    
        let url = [];
        let options = {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
                common : {'Authorization': "Bearer " + this.$store.state.token}
            }
        }

        this.ws_array.forEach((ws) => {
            let params = this.getParamsToWs(ws.params)
            url.push(axios.get(ws.url + params, options))
        })

        axios
            .all(url)
            .then(axios.spread((
                ws_top_more_likes_in_reviews_data,
                ws_top_books_readed_in_libraries_data,
                ws_top_reviewers_data,
                ws_top_more_followed_data,
                ws_top_more_likes_in_quotes_data,
                ws_top_more_likes_in_lists_data,
                ws_top_more_likes_in_images_data,
                ws_top_more_likes_in_texts_data
            ) => {
                this.ws_top_more_likes_in_reviews_data = ws_top_more_likes_in_reviews_data.data
                this.ws_top_books_readed_in_libraries_data = ws_top_books_readed_in_libraries_data.data
                this.ws_top_reviewers_data = ws_top_reviewers_data.data
                this.ws_top_more_followed_data = ws_top_more_followed_data.data
                this.ws_top_more_likes_in_quotes_data = ws_top_more_likes_in_quotes_data.data
                this.ws_top_more_likes_in_lists_data = ws_top_more_likes_in_lists_data.data
                this.ws_top_more_likes_in_images_data = ws_top_more_likes_in_images_data.data
                this.ws_top_more_likes_in_texts_data = ws_top_more_likes_in_texts_data.data
            }))

    },
    data() {
        return {
            medals : [
                medalGold,
                medalBronze,
                medalSilver
            ],
            user : this.$store.state.data_user,
            // Mejores reseñadores
            ws_top_more_likes_in_reviews : constants.ALIBRATE.RANKINGS.TOP_MORE_LIKES_IN_REVIEWS,
            // Libros más leídos
            ws_top_books_readed_in_libraries : constants.ALIBRATE.RANKINGS.TOP_BOOK_READED_IN_LIBRARIES,
             // Los que más reseñan
            ws_top_reviewers : constants.ALIBRATE.RANKINGS.TOP_REVIEWERS,
               //Lectores con más seguidores
            ws_top_more_followed : constants.ALIBRATE.RANKINGS.TOP_MORE_FOLLOWED,
            //Lectores con mejores citas
            ws_top_more_likes_in_quotes : constants.ALIBRATE.RANKINGS.TOP_MORE_LIKES_IN_QUOTES,
            // Lectores con mejores listas
            ws_top_more_likes_in_lists : constants.ALIBRATE.RANKINGS.TOP_MORE_LIKES_IN_LISTS,
            //Lectores con mejores imágenes
            ws_top_more_likes_in_images : constants.ALIBRATE.RANKINGS.TOP_MORE_LIKES_IN_IMAGES,
            //Lectores con mejores textos
            ws_top_more_likes_in_texts : constants.ALIBRATE.RANKINGS.TOP_MORE_LIKES_IN_TEXTS,

            ws_array : [
                constants.ALIBRATE.RANKINGS.TOP_MORE_LIKES_IN_REVIEWS,
                constants.ALIBRATE.RANKINGS.TOP_BOOK_READED_IN_LIBRARIES,
                constants.ALIBRATE.RANKINGS.TOP_REVIEWERS,
                constants.ALIBRATE.RANKINGS.TOP_MORE_FOLLOWED,
                constants.ALIBRATE.RANKINGS.TOP_MORE_LIKES_IN_QUOTES,
                constants.ALIBRATE.RANKINGS.TOP_MORE_LIKES_IN_LISTS,
                constants.ALIBRATE.RANKINGS.TOP_MORE_LIKES_IN_IMAGES,
                constants.ALIBRATE.RANKINGS.TOP_MORE_LIKES_IN_TEXTS,
            ],
            ws_top_more_likes_in_reviews_data : [],
            ws_top_books_readed_in_libraries_data : [],
            ws_top_reviewers_data : [],
            ws_top_more_followed_data : [],
            ws_top_more_likes_in_quotes_data : [],
            ws_top_more_likes_in_lists_data : [],
            ws_top_more_likes_in_images_data : [],
            ws_top_more_likes_in_texts_data : [],

        }
    },
    methods : {
        getParamsToWs(params) {
            let auxParams = params;
            let aParams = []
            Object.keys(auxParams).forEach((p) => {
                aParams.push(`${p}=${auxParams[p]}`)
            })

            return "?" + aParams.join("&");
        },
        openModal(params) {
            this.$root.$emit('loadDataModal', params)
        },

        openModalBooks(params) {
            this.$root.$emit('loadDataModalBooks', params)
        }
    }
}
</script>

<style scoped>

@media only screen and (max-width: 600px) {
    #header-ranking {
        display: none;
    }

    #positionsWeb {
        display : none;
    
    }
}
</style>