<template>
    <div>        
        <div class="login-wrap" :style="{ backgroundImage: `linear-gradient(#5b5b92, transparent) ,url(${backgroundLogin})` }">
            <!-- Formulario para el login (robado de bootsnip mejorado y aplicando la estetica de alibrate) -->    
            <div class="login-html">
                 <div class="group" style="margin:25px">
                    <a href="#">
                       <img :src="alibrateIcon" style="max-width: 132px;" alt="logo alibrate">
                    </a>
                </div>
                <div class="group">
                    <label class="lblIngresar uppercase">Ingresar</label>    
                </div>
                <div class="group">
                    <a href="#" style="font-size:1em;width:100%" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">
                       <img :src="faceIcon" class="uppercase" style="width:1em;margin-right: 7px;margin-top: -4px;"> registrarse con facebook
                    </a>
                </div>
                <div class="divider">
                    <div class="line"></div>
                    <div class="labelFromEmail uppercase">o con tu email</div>
                    <div class="line"></div>
                </div>
                <div class="login-form">
                    <div class="sign-in-htm">
                        <div class="group">
                            <label for="user" class="label">Email (o usuario si ya eres miembro)</label>
                            <input id="user" v-model="frmLogin.username" type="text" class="input color-black" placeholder="Ej flor@mail.com">
                             <div class="form-group" v-if="frmLogin.error_username" style="margin-bottom:0px !important;text-align:left">
                                <small class="text-danger" style="font-weight:bold">
                                    Email o Usuario Inválido.
                                </small>      
                            </div>
                        </div>
                        <div class="group">
                            <label for="pass" class="label">Contraseña</label>
                            <input id="pass" v-model="frmLogin.password" type="password" class="input color-black" 
                                data-type="password" placeholder="Ingresa tu contraseña"
                                v-on:keyup.enter="login"
                            >
                             <div class="form-group" v-if="frmLogin.error_password" style="margin-bottom:0px !important;text-align:left">
                                <small class="text-danger" style="font-weight:bold">
                                    Constraseña Incorrecta.
                                </small>      
                            </div>
                        </div>
                        <div class="group" style="margin-top:40px">
                            <label class="label forgot-password" style="cursor:pointer" v-on:click="recoverPass">¿Olvidaste tu contraseña?</label>
                        </div>
                        <div class="group" style="margin-top:25px">
                            <input type="submit" class="button" value="Ingresar" v-on:click="login">
                        </div>
                        <div class="group">
                            <label class="lblIngresar">¿No tenes una cuenta? <a style="color:#00daff">Registrate ahora</a></label>    
                        </div>
                    </div>
                    
                </div>
            </div>
            <!-- Fin formulario de login -->



            <!-- Modal para recupero de contraseña -->
            <div class="modal fade" id="recoverPass" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div v-if="!sendPass" class="modal-body container" style="text-align:left">
                            <p class="text-uppercase" style="color:#1c4865; font-weight:bold">Recuperar Contraseña</p>
                            <div style="height:50px;font-size:14px;color:black">
                                Ingresa tu usuario o e-mail de ALIBRATE. A continuación recibirás un enlace en tu e-mail para cambiar tu contraseña.
                            </div>
                            <hr>
                            <div class="form-group">
                                <label 
                                    class="dark-grey text-uppercase"
                                    style="margin-bottom: 0px; font-weight: bold; font-size: 14px;"
                                >
                                    Ingresa tu Usuario o e-mail
                                </label>
                                <input 
                                    type="text" placeholder="Ej. flor@mail.com o FlorT" v-model="frmRecover.username" 
                                    class="form-control"
                                    v-on:keyup.enter="sendRecoverPass"
                                >
                                <button 
                                    type="button" 
                                    class="btn btn-primary btn-block mtl text-uppercase hidden-xs"
                                    style="margin-top: 25px; color: white; font-size: 15px; font-weight: bold; background-color: #1c4865"
                                    v-on:click="sendRecoverPass"
                                >
                                    Recuperar Contraseña
                                </button>
                            </div>
                        </div>
                        <div v-if="sendPass" class="text-center ptxl pbxl pll prl">
                            <i class="fas fa-lock fa-5x" style="margin-top:15px"></i>
                            <h3 class="violet mbl">¡Enviado correctamente!</h3>
                            <p class="grey">Llegará a su correo un e-mail para resetear su contraseña.</p>
                            <p class="grey">El equipo de<span class="violet">&nbsp;ALIBRATE.</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Fin modal para recupero de contraseña -->


        </div>
    </div>
</template>


<script>
import backgroundLogin from '../../assets/images/background-login.png'
import faceIcon from '../../assets/images/facebook-square-brands.svg'
import alibrateIcon from '../../assets/images/AlibrateLogoWhite.svg'
import axios from 'axios'
import qs from 'qs'
import {constants} from '../../../constants'

export default {
    data() {
        return {
            // Flag envio de email para mostrar mensaje exitoso
            sendPass : false,

            // import imagenes
            backgroundLogin,
            faceIcon,
            alibrateIcon,

            // Variables necesarias para el form de login y recupero pass
            frmLogin : {
                username : '',
                password : '',
                error_username : false,
                error_password : false,
            },
            frmRecover : {
                username : ''
            }
        }
    },
    mounted () {
        // Checkeo si existe el pass lo redirecciono a rankings
        if (this.$store.state.token)
            this.$router.push('rankings')     
        
        // Una vez que reseteo el pass cuando cierra el mensaje exitoso reload
        jQuery("#recoverPass").on('hide.bs.modal', () => { 
            if(this.sendPass)
                window.location.reload();
        })

    },
    methods : {
        login() {
            this.frmLogin.error_username = false
            this.frmLogin.error_password  = false


            if (this.frmLogin.username && this.frmLogin.password) {
                // Si estan cargadas las variables del form de login request a la api para loguear
                let options = {
                    headers: {
                        'accept': 'application/json',
                        'content-type': 'application/x-www-form-urlencoded'
                    }
                };
                
                axios.post(
                    constants.ALIBRATE.USER.AUTH, 
                    qs.stringify({username : this.frmLogin.username, password : this.frmLogin.password}),
                    options
                ).then((rs) => {
                    // Si llega token seteo por vuex y persisto en window session
                    this.$store.dispatch('setToken', rs.data.access_token).then(() => {
                       this.$router.push('rankings') 
                    })
                }).catch((e) => {
                    switch (e.response.data.code) {
                        case "500003":
                            this.frmLogin.error_password = true;
                            break;
                        case "400001":
                            this.frmLogin.error_username = true;
                            break;
                    }
                })
            }

        },
        recoverPass() {
            // Ejecuto desde el link olvido contraseña => open modal con el form
            jQuery("#recoverPass").modal("show")
        },
        sendRecoverPass() {
            if (this.frmRecover.username) {
                // Si cargo el username o email envio el request a la api de alibrate
                let options = {
                    headers: {
                        'accept': 'application/json',
                        'content-type': 'application/x-www-form-urlencoded',
                        common : {'Authorization': "Bearer " + constants.ALIBRATE.USER.REST_PASSWORD_TOKEN}
                    }
                };
                
                axios.post(
                    constants.ALIBRATE.USER.REST_PASSWORD, 
                    qs.stringify({emailOrUsername : this.frmRecover.username}),
                    options
                ).then((rs) => {
                    console.log(rs);
                    // Flag donde seteo el mensaje de cambio exitoso
                    this.sendPass = true;
                   
                }).catch((e) => {
                    this.sendPass = false;
                    console.log(e.response.data.message)
                })

            }
        }
    }
}
</script>




<style scoped>


body {
    margin:0;
    color:#edf3ff;
    background:#c8c8c8;
    background:url(https://hdqwalls.com/download/material-design-4k-2048x1152.jpg) fixed;
    background-size: cover;
    font:600 16px/18px 'Open Sans',sans-serif;
}
:after,:before{box-sizing:border-box}
.clearfix:after,.clearfix:before{content:'';display:table}
.clearfix:after{clear:both;display:block}
a{color:inherit;text-decoration:none}

.login-wrap{
    width: 100%;
    margin:auto;
    max-width:510px;
    min-height:700px;
    position:relative;
    background-size: cover;
    box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
}
.login-html{
    width:100%;
    height:100%;
    position:absolute;
    padding:20px 70px 50px 70px;
    background:rgba(0,0,0,0.5);
}
.login-html .sign-in-htm{
    top:0;
    left:0;
    right:0;
    bottom:0;
    position:absolute;
    display: inline;
}

.login-html .tab {
    color: white;
}

.login-html .tab,
.login-form .group .label,
.login-form .group .button{
    text-transform:uppercase;
}
.login-html .tab{
    font-size:22px;
    margin-right:15px;
    padding-bottom:5px;
    margin:0 15px 10px 0;
    display:inline-block;
    border-bottom:2px solid transparent;
}
.login-html .sign-in:checked + .tab,
.login-html .for-pwd:checked + .tab{
    color:#fff;
    border-color:#1161ee;
}
.login-form{
    min-height:345px;
    position:relative;
    -webkit-perspective:1000px;
            perspective:1000px;
    -webkit-transform-style:preserve-3d;
            transform-style:preserve-3d;
}
.login-form .group{
    margin-bottom:15px;
}
.login-form .group .label,
.login-form .group .input,
.login-form .group .button{
    width:100%;
    color:#fff;
    display:block;
}
.login-form .group .input,
.login-form .group .button{
    border:none;
    padding:15px 20px;
    border-radius:5px;
    background:rgba(255,255,255, 1);
}
.login-form .group input[data-type="password"]{
    text-security:circle;
    -webkit-text-security:circle;
}
.login-form .group .label{
    color:white;
    font-size:12px;
    text-align: left;
}
.login-form .group .button{
    background:#1161ee;
}
.login-form .group label .icon{
    width:15px;
    height:15px;
    border-radius:2px;
    position:relative;
    display:inline-block;
    background:rgba(255,255,255,.1);
}
.login-form .group label .icon:before,
.login-form .group label .icon:after{
    content:'';
    width:10px;
    height:2px;
    background:#fff;
    position:absolute;
    -webkit-transition:all .2s ease-in-out 0s;
    transition:all .2s ease-in-out 0s;
}
.login-form .group label .icon:before{
    left:3px;
    width:5px;
    bottom:6px;
    -webkit-transform:scale(0) rotate(0);
            transform:scale(0) rotate(0);
}
.login-form .group label .icon:after{
    top:6px;
    right:0;
    -webkit-transform:scale(0) rotate(0);
            transform:scale(0) rotate(0);
}
.login-form .group .check:checked + label{
    color:#fff;
}
.login-form .group .check:checked + label .icon{
    background:#1161ee;
}
.login-form .group .check:checked + label .icon:before{
    -webkit-transform:scale(1) rotate(45deg);
            transform:scale(1) rotate(45deg);
}
.login-form .group .check:checked + label .icon:after{
    -webkit-transform:scale(1) rotate(-45deg);
            transform:scale(1) rotate(-45deg);
}
.login-html .sign-in:checked + .tab + .for-pwd + .tab + .login-form .sign-in-htm{
    -webkit-transform:rotate(0);
            transform:rotate(0);
}
.login-html .for-pwd:checked + .tab + .login-form .for-pwd-htm{
    -webkit-transform:rotate(0);
            transform:rotate(0);
}

.hr{
    height:2px;
    margin:60px 0 50px 0;
    background:rgba(255,255,255,.2);
}
.foot-lnk{
    text-align:center;
}


.divider {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.divider .line {
    background-color: #999;
    flex: 1;
    border: 0 solid;
    height: 1px;
}

.labelFromEmail {
    color: white;
    margin: 20px;
}

.forgot-password{
    font-size : 0.7em;
    text-align: center !important;
}

.lblIngresar {
    font-size : 1em;
    color: white;
    margin: 20px;
}

.uppercase{ 
    text-transform: uppercase;
}

.color-black {
    color:black !important;
}
</style>