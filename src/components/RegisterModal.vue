<template>
      <div class='fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-800' id="myModal">
          <div class="bg-white px-24 py-16 rounded-lg shadow-lg flex flex-col items-center gap-5 relative">
            <span @click="handleRegisterCloseModal" class="absolute right-7 top-4 cursor-pointer font-extrabold text-lg">X</span>
            <h1 class="font-bold text-5xl center">Register</h1>  
              <form @submit.prevent="submitHandle" class="flex flex-col gap-7">
                <div class="flex flex-row  items-center gap-5">
                  <div class="p-0 m-0 flex flex-col gap-4">
                    <input v-model="email" name="email" class="border border-solid border-black p-2 pr-10 rounded-lg" type='text' placeholder='email'/>
                    <input v-model="password" name ="password" class="border border-solid border-black p-2 pr-10 rounded-lg" placeholder='password' type="password">
                    <input v-model="phoneNumber" name="phoneNumber" class="border border-solid border-black p-2 pr-10 rounded-lg" placeholder="Phone Number (08*********)" type="text">
                    <input v-model="fullName" name="fullName" class="border border-solid border-black p-2 pr-10 rounded-lg" placeholder="Full Name" type="text">
                  </div>
                  <div class="p-0 m-0 flex flex-col gap-4">
                    <input v-model="province" name="province" class="border border-solid border-black p-2 pr-10 rounded-lg" placeholder="Province" type="text">
                    <input v-model="city" name="city" class="border border-solid border-black p-2 pr-10 rounded-lg" placeholder="City" type="text">
                    <input v-model="detail" name="Detail" class="border border-solid border-black p-2 pr-10 rounded-lg" placeholder="Detail" type="text">
                    <input v-model="postalCode" name="Postal Code" class="border border-solid border-black p-2 pr-10 rounded-lg" placeholder="Postal Code" type="text">
                  </div>
                </div>
                <span v-if="errorMessage.length > 0" class=" text-red-500 max-w-lg">{{ errorMessage }}</span>
                <input type="submit" value='Register' class="flex bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300" id="closeModal"/>
              </form>
          </div>
      </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['handleRegisterModal', 'handleRegisterCloseModal', 'handleSuccessRegisterModal'],
  methods: {
    submitHandle(){
      const data = {
          email: this.email,
          password: this.password,
          phoneNumber: this.phoneNumber,
          fullName: this.fullName,
          province: this.province,
          city: this.city,
          detail: this.detail,
          postalCode: this.postalCode
      }
    
      axios.post('http://localhost:3000/users/register', data)
        .then(() => {this.handleSuccessRegisterModal()})
        .catch(error => this.errorMessage = error.response.data.message)
    },
    
  },
  data(){
    return{
        email: '',
        password: '',
        phoneNumber: '',
        fullName: '',
        province: '',
        city: '',
        detail: '',
        postalCode: '',
        errorMessage: ''
    }
  }
}
</script>

<style>

</style>