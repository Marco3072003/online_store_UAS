<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <div class="container">
        <b-navbar-brand href="#"><span class="text-green-500 font-bold text-3xl">DesaAgro Mart</span></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/items">Items</router-link>
            </li>
            <li v-if="role == 'User'" class="nav-item">
              <router-link class="nav-link" to="/history">history</router-link>
            </li>
            <li v-if="role == 'Admin'" class="nav-item">
              <router-link class="nav-link" to="/add">Add Product</router-link>
            </li>
            
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/keranjang">
                Keranjang
                <b-icon-bag></b-icon-bag>
                <span
                  class="badge badge-success ml-2"
                >{{ jumlah_pesanans }}
              </span>
              </router-link>
            </li>
            <li class="nav-item flex items-center">
              <button v-if="fullName.length == 0" class="btn btn-lg btn-success py-1 px-2 text-sm mx-2" @click="handleLoginModal" >Login</button>
              <span v-if="fullName.length > 0" @click="handleLogout"  class="cursor-pointer px-2 py-1 bg-green-400 rounded-xl text-white" >{{ fullName }}</span>
            </li>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <RegisterModal v-if="isOpenRegister" :handle-register-modal="handleRegisterModal" :handleRegisterCloseModal="handleRegisterCloseModal" :handleSuccessRegisterModal="handleSuccessRegisterModal"/>
    <LoginModal v-if="isOpenLogin" :handleLoginModal="handleLoginModal" :handle-register-modal="handleRegisterModal" @submitLogin="submitLogin"/>
    <SuccessModal v-if="isOpenSuccessLoginModal">
      <SuccessLoginModal />
    </SuccessModal>
    <SuccessModal v-if="isOpenSuccessRegisterModal" >
      <SuccessRegisterModal :handleLoginModal="handleLoginModal" :handleCloseSuccessRegisterModal="handleCloseSuccessRegisterModal"/>
    </SuccessModal>
  </div>
  
</template>

<script >
import axios from "axios";
import LoginModal from "./LoginModal.vue";
import RegisterModal from "./RegisterModal.vue";
import SuccessModal from "./SuccessModal.vue";
import SuccessRegisterModal from "./SuccessRegisterModal.vue";
import SuccessLoginModal from './SuccessLoginModal.vue';

export default {
  name: "Navbar",
  data() {
    return {
      jumlah_pesanans: 0,
      isOpenLogin: false,
      isOpenRegister: false,
      isOpenSuccessRegisterModal: false,
      isOpenSuccessLoginModal: false,
      isLogin: false, 
    };
  },
  methods: {
    setJumlah(data) {
      this.jumlah_pesanans = data;
    },
    handleLoginModal(){
      this.isOpenLogin  = !this.isOpenLogin // open login modal
    },
    handleRegisterModal(){
      this.isOpenRegister = !this.isOpenRegister // open register modal
      this.isOpenLogin =  !this.isOpenLogin; // close login modal
    },
    handleRegisterCloseModal(){
      this.isOpenRegister = !this.isOpenRegister // close register modal
    }, 
    handleSuccessRegisterModal(){
      this.isOpenSuccessRegisterModal = !this.isOpenSuccessRegisterModal //open register success modal
      this.isOpenRegister = !this.isOpenRegister // close register modal
    },
    handleCloseSuccessRegisterModal(){
      this.isOpenSuccessRegisterModal = !this.isOpenSuccessRegisterModal // close register modal
    },
    handleSuccessLoginModal(){
      this.isOpenSuccessLoginModal = !this.isOpenSuccessLoginModal // close login success modal
    },
    handleLogout(){
      localStorage.removeItem('access_token')
      localStorage.removeItem('fullName')
      localStorage.removeItem('role')
      this.checkToken();
      this.setJumlah(0);
      this.$router.replace('/')

    },
    submitLogin(email, password){
      const body = {
        email,
        password
      }
      axios.post("http://localhost:3000/users/login", body)
        .then(response => {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('fullName', response.data.fullName);
                localStorage.setItem('role', response.data.role);
                this.checkToken();
                this.getKeranjang();
        })
        .catch(error => console.error(error.response.data))

        this.handleLoginModal()
    },
    getKeranjang(){
      const config ={
      headers: {
                    access_token: `${localStorage.getItem('access_token')}`
                }
    }
    axios
      .get("http://localhost:3000/carts", config)
      .then((response) => {
        this.setJumlah(response.data.reduce((accumulator, keranjang)=>{
          return accumulator + keranjang.quantity;
      }, 0))
      })
      .catch((error) => console.log(error));
    },
  },
  
  props: ["updateKeranjang", 'fullName', 'role', 'accessToken'],
  inject: ['checkToken'],
  async mounted() {
    this.getKeranjang();
    await this.checkToken();
  },
  components: {
      LoginModal,
      RegisterModal, 
      SuccessModal,
      SuccessRegisterModal,
      SuccessLoginModal
  },  
  computed: {
    updateJumlahItem(){
      return this.jumlah_pesanans.reduce((accumulator, keranjang)=>{
          return accumulator + keranjang.quantity;
      }, 0)
    }
  }
 
};
</script>


