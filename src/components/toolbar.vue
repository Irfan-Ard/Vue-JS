<template>
    <div class="main">

        <!-- top-navbar -->
        <v-toolbar flat class="indigo darken-1">
            <span class="font-weight-light display-1  white--text">easy</span>
            <span class="display-1 white--text">Remote</span>
            <span><v-icon large color="white">mdi-dialpad</v-icon></span>
            <v-spacer></v-spacer>
            <v-icon large color="white">mdi-account</v-icon>
            <v-icon large color="white">mdi-email</v-icon>
        </v-toolbar>

        <!-- Drawer -->
        <v-navigation-drawer v-model="drawer" class="indigo" absolute bottom temporary>
            
            <!-- images -->
            <v-img :aspect-ratio="16/10" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
                <v-avatar>
                    <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                    >
                </v-avatar>
            </v-img>

        </v-navigation-drawer>


        <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
    </div>
</template>

<script>
export default {
    data(){
        return{
            drawer:false,
        }
    },

    methods:{
        openDrawer(){
            if(this.drawer == false){
                this.drawer = true
            }
        }
    }
}
</script>

<style scoped>

</style>