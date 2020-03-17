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
                    <div v-for="(book, index) in aBooks" class="row" style="background:white;margin-bottom:10px;height:90px" :key="book._id">
                        <div style="width: 1.3em;" class="col-1">
                            {{index + 1}}
                        </div>
                        <div class="col-2">
                            <img 
                                :src="`https://covers.alibrate.com/${book.cover}/small`" 
                                alt="Imagen libro" 
                                width="60" height="85" 
                            >
                        </div>
                        <div class="col-5" style="text-align: left;padding-top:10px;padding-left:30px;white-space:nowrap"> 
                            <div style="font-size:10px">
                                {{book.genre}}
                            </div>
                            <div style="font-size:12px;font-weight:bold;white-space: nowrap;  overflow: hidden;  text-overflow: ellipsis;">
                            {{book.title}}
                            </div>
                            <div style="font-size:12px;white-space: nowrap;  overflow: hidden;  text-overflow: ellipsis;">
                            {{book.author}}
                            </div>
                            <div style="font-size:10px;">
                            {{book.count}}
                            </div>
                        </div>
                        <div class="col-4" style="text-align:right;margin-top:15px">
                            <div class="btn-group">
                                <button type="button" class="btn btn-secondary" style="font-size:12px;font-weight:bold">
                                    {{lblBookStatus[book.libraryItem.status] || "Por Leer"}}
                                </button>
                                <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                    <span class="sr-only">Libro por leer {{book.title}} </span>
                                    <i class="fas fa-sort-down" style="margin-bottom: 3px;"></i>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuReference">                        
                                    <a v-for="(bStatus) in aBooksStatusFiltered(book.libraryItem.status)" 
                                        class="dropdown-item" style="cursor:pointer" :key="Object.values(bStatus)[0]"
                                    >
                                        {{Object.values(bStatus)[0]}}
                                    </a>                        
                                </div>
                            </div>

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

export default {
    mounted() {
        this.$root.$on("loadDataModalBooks", (params) => {
            this.aBooks = []
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
            aBooks : [],
            page : 0,
            limit : 10,
            lblBookStatus : {
                 wantToRead : "Por Leer" ,
                 reading : "Leyendo" ,
                 readed : "Leido" ,
                 abandoned : "Abandonado" , 
            },
            aBookStatus : [
                { wantToRead : "Por Leer" },
                { reading : "Leyendo" },
                { readed : "Leido" },
                { abandoned : "Abandonado" },
            ]
        }
    },

    methods : {
        aBooksStatusFiltered(status){
            return this.aBookStatus.filter( (e) => 
                !e[status]
            )
        },

        getParamsToWs() {
            this.page += 1;
            return `?page=${this.page}&limit=20`
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
                   this.aBooks.push(p)
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
                this.aBooks.length >= 20 
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