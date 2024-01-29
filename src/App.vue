<template>
  <div id="app">
    <router-view :fullName="fullName" :role="role" :accessToken="accessToken"/>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue"

export default {
  components: {
    Footer
  },
  data() {
    return{
        fullName: '',
        role: '',
        accessToken: '',
    }
  },  
  provide() {
      return {
        checkToken: this.checkToken
    }
  },
  methods: {
   async checkToken(){
      const token = localStorage.getItem('access_token');
      if(token){ 
        const fullName = localStorage.getItem('fullName');
        const role = localStorage.getItem('role');
        this.fullName = fullName;
        this.role = role;
        this.accessToken = token;
      } else{
        this.fullName = '';
        this.role = '';
        this.accessToken = '';
      }
    }
  }
}
</script>
