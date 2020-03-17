<template>
    <div class="container">
        <div v-if="ws_data !=''">
            <div v-for="(book, index) in ws_data" class="row" style="background:white;margin-bottom:10px;height:90px" :key="book._id">
                
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
                    <div style="font-size:12px;font-weight:bold">
                    {{book.title}}
                    </div>
                    <div style="font-size:12px;">
                    {{book.author}}
                    </div>
                    <div style="font-size:10px;">
                    {{book.count}}
                    </div>
                </div>

                <div class="col-4" style="text-align:right;margin-top:15px">
                
                    <div class="btn-group">
                        <button type="button" class="btn btn-secondary" style="font-size:12px;font-weight:bold">
                            {{getBookStatus(book.libraryItem.status)}}
                        </button>
                        <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                            <span class="sr-only">Libro por leer {{book.title}} </span>
                            <i class="fas fa-sort-down" style="margin-bottom: 3px;"></i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuReference">                        
                            <a v-for="(bStatus) in aBooksStatusFiltered(book.libraryItem.status)" 
                                class="dropdown-item" style="cursor:pointer" :key="bStatus.id"
                            >
                                {{bStatus.lbl}}
                            </a>                        
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div v-else>
            <img :src="loading" style="width:5em">
        </div>

    </div>    
</template>


<script>
import loading from '../../assets/images/loading.gif'

export default {
    props : ['ws_data'],
    data () {
        return {
            loading,
            aBookStatus : [
                { id : "wantToRead", lbl : "Por Leer" },
                { id : "reading", lbl : "Leyendo" },
                { id : "readed", lbl : "Leido" },
                { id : "abandoned", lbl : "Abandonado" },
            ]
        }
    },
    methods : {
        getBookStatus(status) {
            let book = this.aBookStatus.find((b) => b.id == status)
            return book.lbl

        },
        aBooksStatusFiltered(status) {
            return this.aBookStatus.filter((b) =>  b.id != status)
        },
    }

}
</script>

<style scoped>
.label {
    margin-bottom: .3rem;
    clear: both;
}

.btn {
        padding: .15rem .5rem !important;
}
</style>