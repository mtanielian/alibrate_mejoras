<template>
<div>

        <div style="margin-top:20px">
            <label style="float:left;margin-left: 20px;font-size: 20px;font-weight:bold">Rankings por género</label>
            <label style="float:right; margin-right: 60px;font-size: 12px; color: grey;">Ver Todos</label>
        </div>
        <div class="container-fluid">
            <div id="carousel-example" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner mx-auto" role="listbox">

                    <div v-for="ranking in aRanking" 
                        style="height:220"
                        class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3" 
                        v-bind:key="ranking._id" 
                    >
                        <div class="card" style="width: 18rem;">
                            <img :src="cdn + ranking.imageThumb" class="card-img-top" :alt="ranking.name">                            
                            <div class="card-body" style="padding:inherit">
                                <h5 class="card-title" style="font-size: 12px;margin-top: 10px;">{{ranking.name}}</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <a class="carousel-control-prev" href="#carousel-example" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carousel-example" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
</div>

</template>



<script>
    
import axios from 'axios'
import {constants} from '../../../constants'
//import store from '../../store'

export default {
    mounted() {
        this.getRankings();
    },
    
    data() {
        return {
            aRanking : [],
            cdn : constants.ALIBRATE.CDN
        }
    
    },
  
    methods: {
        getRankings() {
            let options = {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/x-www-form-urlencoded',
                    common : {'Authorization': "Bearer " + this.$store.state.token}
                }
            };

            axios.get(
                constants.ALIBRATE.RANKINGS.BOOKS_GENRES.url + "?page=1&limit=100", 
                options
            ).then((rs) => {
                this.aRanking = rs.data.docs.filter(ranking => ranking.imageThumb.includes('.png', '.jpg'))

            }).then(()=> {
                jQuery('#carousel').carousel();
                jQuery('.carousel-indicators > li').first().addClass('active');
                jQuery('.carousel-item').first().addClass('active');
                
                

                
                jQuery('#carousel-example').on('slide.bs.carousel', function (e) {
                    let $e = jQuery(e.relatedTarget);
                    let idx = $e.index();
                    let itemsPerSlide = parseInt(window.innerWidth / 190);
                    let totalItems = jQuery('.carousel-item').length;
                
                    if (idx >= totalItems-(itemsPerSlide-1)) {
                        let it = itemsPerSlide - (totalItems - idx);
                        for (let i=0; i<it; i++) {
                            // append slides to end
                            if (e.direction=="left") {
                                jQuery('.carousel-item').eq(i).appendTo('.carousel-inner');
                            }
                            else {
                                jQuery('.carousel-item').eq(0).appendTo('.carousel-inner');
                            }
                        }
                    }
                })

            })
            .catch((e) => {
                console.log(e)
                
            })
        }
    }
}
</script>



<style scoped>

@media only screen and (max-width: 600px) {
    .card {
        width : 28rem !important;
    }


}

/*
    code by Iatek LLC 2018 - CC 2.0 License - Attribution required
    code customized by Azmind.com
*/
@media (min-width: 768px) and (max-width: 991px) {
    
    .carousel-inner .active.col-md-4.carousel-item + .carousel-item + .carousel-item + .carousel-item {
        position: absolute;
        top: 0;
        right: -33.3333%;  
        z-index: -1;
        display: block;
        visibility: visible;
    }
}

/*este es el que muestra dos*/
@media (min-width: 576px) and (max-width: 768px) {
  
    .carousel-inner .active.col-sm-6.carousel-item + .carousel-item + .carousel-item {
        position: absolute;
        top: 0;
        right: -50%;  
        z-index: -1;
        display: block;
        visibility: visible;
    }
}

@media (min-width: 576px) {
    
    .carousel-item {
        margin-right: 0;
    }

    .carousel-inner .active + .carousel-item {
        display: block;
    }
    .carousel-inner .carousel-item.active:not(.carousel-item-right):not(.carousel-item-left),
    .carousel-inner .carousel-item.active:not(.carousel-item-right):not(.carousel-item-left) + .carousel-item {
        transition: none;
    }
    .carousel-inner .carousel-item-next {
        position: relative;
        transform: translate3d(0, 0, 0);
    }
    .active.carousel-item-left + .carousel-item-next.carousel-item-left,
    .carousel-item-next.carousel-item-left + .carousel-item,
    .carousel-item-next.carousel-item-left + .carousel-item + .carousel-item {
        position: relative;
        transform: translate3d(-100%, 0, 0);
        visibility: visible;
    }

    .carousel-inner .carousel-item-prev.carousel-item-right {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        display: block;
        visibility: visible;
    }
    
    .active.carousel-item-right + .carousel-item-prev.carousel-item-right,
    .carousel-item-prev.carousel-item-right + .carousel-item,
    .carousel-item-prev.carousel-item-right + .carousel-item + .carousel-item {
        position: relative;
        transform: translate3d(100%, 0, 0);
        visibility: visible;
        display: block;
        visibility: visible;
    }
}

/* MD */
@media (min-width: 768px) {
    /* show 3rd of 3 item slide */
    .carousel-inner .active + .carousel-item + .carousel-item {
        display: block;
    }
    .carousel-inner .carousel-item.active:not(.carousel-item-right):not(.carousel-item-left) + .carousel-item + .carousel-item {
        transition: none;
    }
    .carousel-inner .carousel-item-next {
        position: relative;
        transform: translate3d(0, 0, 0);
    }
    /* left or forward direction */
    .carousel-item-next.carousel-item-left + .carousel-item + .carousel-item + .carousel-item {
        position: relative;
        transform: translate3d(-100%, 0, 0);
        visibility: visible;
    }
    /* right or prev direction */
    .carousel-item-prev.carousel-item-right + .carousel-item + .carousel-item + .carousel-item {
        position: relative;
        transform: translate3d(100%, 0, 0);
        visibility: visible;
        display: block;
        visibility: visible;
    }
}
/* LG */
@media (min-width: 991px) {
    /* show 4th item */
    .carousel-inner .active + .carousel-item + .carousel-item + .carousel-item {
        display: block;
    }
    .carousel-inner .carousel-item.active:not(.carousel-item-right):not(.carousel-item-left) + .carousel-item + .carousel-item + .carousel-item {
        transition: none;
    }
    /* Show 5th slide on lg if col-lg-3 */
    .carousel-inner .active.col-lg-3.carousel-item + .carousel-item + .carousel-item + .carousel-item + .carousel-item {
        position: absolute;
        top: 0;
        right: -25%;  /*change this with javascript in the future*/
        z-index: -1;
        display: block;
        visibility: visible;
    }
    /* left or forward direction */
    .carousel-item-next.carousel-item-left + .carousel-item + .carousel-item + .carousel-item + .carousel-item {
        position: relative;
        transform: translate3d(-100%, 0, 0);
        visibility: visible;
    }
    /* right or prev direction //t - previous slide direction last item animation fix */
    .carousel-item-prev.carousel-item-right + .carousel-item + .carousel-item + .carousel-item + .carousel-item {
        position: relative;
        transform: translate3d(100%, 0, 0);
        visibility: visible;
        display: block;
        visibility: visible;
    }

.carousel-control-prev-icon,
.carousel-control-next-icon {
  height: 50px;
  width: 50px;
  background-size: 100%, 100%;
  border-radius: 50%;
  background-color : white;
  background-image: none;
}

.carousel-control-next-icon:after
{
  content: '>';
  font-size: 33px;
  font-weight: bold;
  color: black;
}

.carousel-control-prev-icon:after {
  content: '<';
  font-size: 33px;
  font-weight: bold;
  color: black;
}


}

</style>