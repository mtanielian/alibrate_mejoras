<template>
<div>
    <div v-for="(person, index) in ws_data" class="row" style="background:white;margin-bottom:10px;height:90px;border: 1px solid hsla(0,0%,80%,.5);" :key="person._id">
        <div class="col-6">
            <img 
                :src="medals[index]"
                style="width: 1.3em; position: absolute; padding-top: 5px; z-index: 99;"
            >
            <img 
                :src="person.profile.picture" 
                alt="Imagen usuario" 
                width="60" height="60" 
                class="rounded-circle mCS_img_loaded" 
                style="margin-top: 10px; margin-bottom: 10px; position: absolute;"
            >
            <img 
                :src="`https://cdn.alibrate.com/flags/4x3/${(person.profile.country.code).toLocaleLowerCase()}.svg`" 
                alt="bandera usuario" 
                style="width: 25px; position: absolute; margin-top: 45px; margin-left: 50px;"

            >
            <label style="margin: 0px; margin-left: 70px; width: 60%; padding: 0px; padding-top: 15px;font-weight:bold">
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
</template>


<script>
export default {
    props : ['ws_data', 'medals'],
}
</script>

<style scoped>

</style>