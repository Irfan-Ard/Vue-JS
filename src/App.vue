<template>
  <v-app>
    <toolbar/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import toolbar from '../src/components/toolbar'
export default {
  name: 'App',
  components:{
    toolbar
  },
  data(){
    return{

    }
  }
};
</script>
