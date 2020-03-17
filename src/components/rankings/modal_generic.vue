<template>
<div class="container">
    <div class="modal fade" v-bind:class="ws.classModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header" style="background-color:#1c4865; color:white">
                    <h5 class="modal-title text-uppercase">{{ws.modalName}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body container" style="max-height:500px;overflow-y:auto;" v-on:scroll.passive='handleScroll'>
                    <div v-for="(person, index) in aPeople" class="row" style="background:white;margin-bottom:10px;height:90px;border: 1px solid hsla(0,0%,80%,.5);margin-right:0px;margin-left: 0px" :key="person._id">
                        <div class="col-6">
                            <img 
                                v-if="medals[index]" 
                                :src="medals[index]"
                                style="width: 1.3em; position: absolute; padding-top: 5px; z-index: 99;"
                            >
                            <div v-else 
                                style="
                                    position: absolute; z-index: 10; font-size: 20px; font-weight: bold; padding-left: 2px;
                                    padding-top: 0px;color: blue;
                                "
                                class="col-1"
                            >
                                {{index + 1}}
                            </div>
                            <img 
                                :src="person.profile.picture" 
                                alt="Imagen usuario" 
                                width="60" height="60" 
                                class="rounded-circle mCS_img_loaded" 
                                style="margin-top: 10px; margin-bottom: 10px; position: absolute;"
                            >
                            <template v-if="person.profile.country">
                                <img 
                                    :src="`https://cdn.alibrate.com/flags/4x3/${(person.profile.country.code).toLocaleLowerCase()}.svg`" 
                                    alt="bandera usuario" 
                                    style="width: 25px; position: absolute; margin-top: 45px; margin-left: 50px;"
                                >
                            </template>
                            <label style="text-align:left;padding-left:35px;margin: 0px; margin-left: 70px; width: 100%; padding: 0px; padding-top: 15px;font-weight:bold; white-space: nowrap;  overflow: hidden;  text-overflow: ellipsis;">
                                {{person.username}}
                            </label>
                            <label style="color:#02a7e1;margin: 0px; margin-left: 70px; width: 60%; padding: 0px; padding-top: 5px; font-size:14px">
                            {{person.count || person.countReviews}} puntos
                            </label>
                        </div>
                        <div class="col-6" style="text-align:right">
                            <button type="button" style="margin-top:15px;font-size:12px;font-weight:bold" class="btn btn-primary">Seguir</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>



<script>
import axios from 'axios'
import medalGold from '../../assets/images/medal-pos-1.svg'
import medalBronze from '../../assets/images/medal-pos-2.svg'
import medalSilver from '../../assets/images/medal-pos-3.svg'

export default {
    mounted() {
        this.$root.$on("loadDataModal", (params) => {
            this.aPeople = []
            this.page = 0
            this.ws = params
            this.getDataFinish = false
            this.getData();
        });
       
    },
    data() {
        return {
            getDataFinish : false,
            ws : "",
            medals : [
                medalGold,
                medalBronze,
                medalSilver
            ],
            aPeople : [],
            page : 0,
            limit : 10
        }
    },
    methods : {
        
        getParamsToWs() {
            this.page += 1;
            let byScore = "";

            if (this.ws.params.byScore)
                byScore = "&byScore=true"

            return `?page=${this.page}&limit=20${byScore}`

        },
        getData() {
            let options = {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/x-www-form-urlencoded',
                    common : {'Authorization': "Bearer " + this.$store.state.token}
                }
            };

            axios.get(
                this.ws.url + this.getParamsToWs(),
                options
            ).then((rs) => {
               rs.data.forEach(p => {
                   this.aPeople.push(p)
               }); 

            }).then(() => {
                if(!jQuery("." + this.ws.classModal).hasClass('show')) {
                    jQuery("." + this.ws.classModal).modal("show")       
                    jQuery("." + this.ws.classModal).on('hide.bs.modal', () => { 
                        this.aPeople = []
                        this.page = 0
                        this.getDataFinish = false
                        jQuery("." + this.ws.classModal).find(".modal-body").html('')
                        jQuery("." + this.ws.classModal).find(".modal-body").scrollTop(0)
                    })             
                }
            }).then(() => {
                this.getDataFinish = true;
            })
            
            .catch((e) => {
                console.log(e)
            })
        },

        handleScroll(e)  {
            // Antes que llegue al fin el scroll pido mas personas
            if (
                ((e.target.scrollHeight - 600) <= e.target.scrollTop) && 
                this.getDataFinish &&
                this.aPeople.length >= 20 
            ) {
                this.getDataFinish = false;
                this.getData()
            }
		}
    }

}
</script>

<style scoped>
.modal-header { 
    border-radius: 0px;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
}

.modal-content { 
    border-radius: 0px;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
}

.modal-dialog {
    border: 0px !important;
}
</style>