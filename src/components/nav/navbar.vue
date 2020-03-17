<template>
    <div>
        <div class="wrapper">
            <!-- Page Content  -->
            <div id="content">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">

                        <button id="sidebarCollapse" class="btn btn-info" type="button">                       
                            <i class="fas fa-align-justify" style="font-size: 1.4rem;"></i>
                        </button>
                        <img class="logoAlibrate" :src="alibrateIcon" alt="Logo Alibrate" style="width:7em;">
       
                        <input type="search" id="search" placeholder="Buscar lectores y libros (título o autor)"  
                            style="width:30em;margin-left:15px"
                            class="form-control b-grey"
                        >
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="nav navbar-nav ml-auto">
                                <li class="nav-item" style="margin-right:15px">
                                    <a class="nav-link" href="#" data-toggle="tooltip" title="Actividad"><i class="fas fa-history fa-lg" style="color:white"></i></a>
                                </li>
                                <li class="nav-item" style="margin-right:15px">
                                    <a class="nav-link" href="#" data-toggle="tooltip" title="Mi Biblioteca"><i class="fas fa-address-book fa-lg" style="color:white"></i></a>
                                </li>
                                <li class="nav-item" style="margin-right:15px">
                                    <a class="nav-link" href="#" data-toggle="tooltip" title="eBooks"><i class="fas fa-book-open fa-lg" style="color:white"></i></a>
                                </li>
                                <li class="nav-item" style="margin-right:15px">
                                    <a class="nav-link" href="#"><i class="fas fa-user-friends fa-lg" style="color:white"></i></a>
                                </li>
                                <li class="nav-item" style="margin-right:15px">
                                    <router-link to="rankings" class="nav-link" data-toggle="tooltip" title="Rankings"> 
                                        <i class="fas fa-arrows-alt-v fa-lg" style="color:white"></i>
                                    </router-link>                                   
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-user-cog fa-lg" style="color:white"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" style="cursor:pointer">Editar Perfil</a>
                                        <a class="dropdown-item" style="cursor:pointer">Cambiar Contraseña</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" style="cursor:pointer" v-on:click="logout">Cerrar sesión</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
               <nav id="sidebar">
                <div id="dismiss">
                    <i class="fas fa-arrow-left"></i>
                </div>                   
                <div class="sidebar-header">
                    <div class="col-12" style="color: white;padding-bottom:10px">
                        <img 
                            :src="this.user.userInfo.profile.picture" 
                            alt="Imagen usuario" 
                            width="60" height="60" 
                            class="rounded-circle mCS_img_loaded" 
                            style="margin-top: 10px; margin-bottom: 10px; position: absolute;"
                        >
                        <h5 style="margin: 0px; margin-left: 70px; width: 60%; padding: 0px; padding-top: 15px;">
                            {{this.user.userInfo.profile.displayName}}
                        </h5>
                        <h5 style="margin: 0px; margin-left: 70px; width: 60%; padding: 0px; padding-top: 5px;">
                            {{this.getAge()}}
                        </h5>
                    </div>
                </div>
                <ul class="list-unstyled components">
                    <li>
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Home</a>
                        <ul class="collapse list-unstyled" id="homeSubmenu">
                            <li>
                                <a href="#">Home 1</a>
                            </li>
                            <li>
                                <a href="#">Home 2</a>
                            </li>
                            <li>
                                <a href="#">Home 3</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">About</a>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
                        <ul class="collapse list-unstyled" id="pageSubmenu">
                            <li>
                                <a href="#">Page 1</a>
                            </li>
                            <li>
                                <a href="#">Page 2</a>
                            </li>
                            <li>
                                <a href="#">Page 3</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Portfolio</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>

                <ul class="list-unstyled CTAs">
                    <li>
                        <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" class="download">Download source</a>
                    </li>
                    <li>
                        <a href="https://bootstrapious.com/p/bootstrap-sidebar" class="article">Back to article</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="overlay"></div>
    </div>
</template>

<script>
import alibrateIcon from '../../assets/images/AlibrateLogoWhite.svg'
import moment from 'moment'

export default {
    mounted() {
        /* Funciones para iniciar el sidebar */
       jQuery("#sidebar").mCustomScrollbar({
            theme: "minimal"
        });

        jQuery('#dismiss, .overlay').on('click', function () {
            jQuery('#sidebar').removeClass('active');
            jQuery('.overlay').removeClass('active');
        });

        jQuery('#sidebarCollapse').on('click', function () {
            jQuery('#sidebar').addClass('active');
            jQuery('.overlay').addClass('active');
            jQuery('.collapse.in').toggleClass('in');
            jQuery('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });

        
            
    },
    methods : {
        // Calculo la edad del usuario mostrado en el sidebar
        getAge() {
            return moment().diff(moment(this.user.userInfo.profile.birthday, 'YYYYMMDD'), 'years') + " años "

        },
        logout() {
            // Ejecuto el logout del user en el store de vuex limpio token y user info => mando a login
             this.$store.dispatch('logoutUser').then(() => {
                this.$router.push('/') 
            })

        },
    },
    data() {
        return {
            alibrateIcon,
            user : this.$store.state.data_user,
            frmLogin : {
                email : '',
                pass : ''
            }
        }
    }
}
</script>

<style>

@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

.dropdown-toggle::after{
    display: none !important;
}

#sidebarCollapse {
    display: none;
}

@media only screen and (max-width: 600px) {
    .logoAlibrate {
        display : none;
    }

    #sidebarCollapse {
        display: inline;
        
    }

    #search {
        width: 25em !important;
    }
}

.fa-align-justify {
  color: white;
  width: 20px;
}

.btn-info {
    background-color: #1c4865;
    border-color: #1c4865;
}

body {
    font-family: 'Poppins', sans-serif;
    background: #fafafa;
}

p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
}

a,
a:hover,
a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}

.navbar {
    padding: 15px 10px;
    background-color: #1c4865 !important;
    border: none;
    border-radius: 0;
    margin-bottom: 40px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
    box-shadow: none;
    outline: none !important;
    border: none;
}

.line {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #ddd;
    margin: 40px 0;
}

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

#sidebar {
    width: 325px;
    position: fixed;
    top: 0;
    left: -325px;
    height: 100vh;
    z-index: 999;
    background: white;
    color: #2c3e50;
    transition: all 0.3s;
    overflow-y: scroll;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
    text-align: left !important;
}

#sidebar.active {
    left: 0;
}

#dismiss {
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #7386D5;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    z-index: 9999;
}

#dismiss:hover {
    background: #fff;
    color: #7386D5;
}

.overlay {
    display: none;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 998;
    opacity: 0;
    transition: all 0.5s ease-in-out;
}
.overlay.active {
    display: block;
    opacity: 1;
}

#sidebar .sidebar-header {
    background: #2c3e50 !important;
}

#sidebar ul.components {
    border-bottom: 1px solid #47748b;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}

#sidebar ul li a:hover {
    color: #7386D5;
    background: #fff;
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
    color: #fff;
    background: #6d7fcc;
}

a[data-toggle="collapse"] {
    position: relative;
}

.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}

ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #6d7fcc;
}

ul.CTAs {
    padding: 20px;
}

ul.CTAs a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
}

a.download {
    background: #fff;
    color: #7386D5;
}
/*
a.article,
a.article:hover {
    background: #6d7fcc !important;
    color: #fff !important;
}
*/
/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

#content {
    width: 100%;
    height: 70px;
    transition: all 0.3s;
    /*position: absolute;*/
    top: 0;
    right: 0;
}
</style>