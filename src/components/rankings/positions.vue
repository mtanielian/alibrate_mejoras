<template>
    <div class="row" style="background:white">
            <div class="col-4">
                <img 
                    :src="this.user.userInfo.profile.picture" 
                    alt="Imagen usuario" 
                    width="60" height="60" 
                    class="rounded-circle mCS_img_loaded" 
                    style="margin-top: 10px; margin-bottom: 10px; position: absolute;"
                >
                <label style="margin: 0px; margin-left: 70px; width: 60%; padding: 0px; padding-top: 15px;font-weight:bold;text-align:left">
                    {{this.user.userInfo.profile.displayName}}
                </label>
                <label style="margin: 0px; margin-left: 70px; width: 60%; padding: 0px; padding-top: 5px; font-size:14px">
                    Tus posiciones en los diferentes rankings
                </label>
            </div>
            <div class="col-8 container" style="padding-top:20px">
                <div class="row">
                    <div class="col-sm">
                        <p class="small" style="width: 70%;float: left;text-align: right;padding-right: 10px;">
                            Lectores <br>que más leen
                        </p>
                        <h3 style="width: 30%;float: right;">
                            {{this.positions.positionTopReaders}}
                        </h3>
                    </div>           
                    <div class="col-sm">
                        <p class="small" style="width: 70%;float: left;text-align: right;padding-right: 10px;">
                            Lectores <br>que más reseñan
                        </p>
                        <h3 style="width: 30%;float: right;">
                            {{this.positions.positionTopReviewers}}
                        </h3>
                    </div>
                    <div class="col-sm">
                        <p class="small" style="width: 70%;float: left;text-align: right;padding-right: 10px;">
                            Lectores <br>con más seguidores
                        </p>
                        <h3 style="width: 30%;float: right;">
                            {{this.positions.positionTopMoreFollowed || "-"}}
                        </h3>
                    </div>
                    <div class="col-sm">
                        <p class="small" style="width: 70%;float: left;text-align: right;padding-right: 10px;">
                            Los mejores <br>reseñadores
                        </p>
                        <h3 style="width: 30%;float: right;">
                            {{this.positions.positionTopLikeReviewers || "-"}}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
import { constants } from '../../../constants'

export default {
    created() {
        this.getPositions()
    },
    methods : {
        getPositions() {

            let options = {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/x-www-form-urlencoded',
                    common : {'Authorization': "Bearer " + this.$store.state.token}
                }
            };

            axios.get(
                constants.ALIBRATE.RANKINGS.POSITIONS.url, 
                options
            ).then((rs) => {
               this.positions = rs.data

            }).catch((e) => {
                console.log(e)
            })

        }
    },
    data() {
        return {
            user : this.$store.state.data_user,
            positions : []
        }
    }

}
</script>


<style scoped>

</style>