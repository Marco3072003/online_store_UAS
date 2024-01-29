<template>
    <div>
      <Navbar :fullName="fullName" :role="role" :accessToken="accessToken" />
      <div class="container">
        
  
        <div class="row mt-3">
          <div class='w-3/4 flex  z-50 bg-opacity-75 bg-gray-200' id="myModal">
            <div class="w-full bg-white px-24 py-16 rounded-lg shadow-lg flex flex-col items-center gap-5 relative">
                <h1 class="font-bold text-5xl center">Tambah Product</h1>  
                <form @submit.prevent="submitProduct" class="flex flex-col w-full gap-7">
                    <div class="p-0 m-0 flex flex-1 flex-col gap-4">
                        <input v-model="name" name="nama" class="border border-solid border-black p-2 pr-10 rounded-lg" type='text' placeholder='Nama Produk'/>
                        <input v-model="imageUrl" name ="imageUrl" class="border border-solid border-black p-2 pr-10 rounded-lg" placeholder='Link Gambar' type="text">
                        <input v-model="price" name="harga" class="border border-solid border-black p-2 pr-10 rounded-lg" placeholder="Harga" type="number">
                        <select v-model="category" name="Category" class="border border-solid border-black p-2 pr-10 rounded-lg bg-transparent">
                            <option value="" disabled selected>---- Pilih Kategori ----</option>
                            <option value="Sayur-sayuran">Sayur-sayuran</option>
                            <option value="Buah-buahan">Buah-buahan</option>
                            <option value="Biji-bijian">Biji-bijian</option>
                        </select>
                    </div>
                    <span v-if="errorMessage.length > 0" class=" text-red-500 max-w-lg">{{ errorMessage }}</span>
                    <span v-if="successMessage.length > 0" class=" text-green-500 max-w-lg">{{ successMessage }}</span>
                    <input type="submit" value='Register' class="flex bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300" id="closeModal"/>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import Navbar from "../components/Navbar.vue";

  import axios from "axios";
  
  export default {
    name: "Add",
    components: {
      Navbar,
     
    },
    data() {
      return {
            name: '',
            imageUrl: '',
            price: '',
            category: '',
            errorMessage: '',
            successMessage: ''
      };
    },
    props: ['fullName', 'role', 'accessToken'],
    methods: {
        submitProduct(){
            if(this.name != '' && this.imageUrl != '' && this.price != '' && this.category != ''){
            const body = {
                name: this.name,
                imageUrl: this.imageUrl,
                price: this.price,
                category: this.category
            }
            const config ={
                        headers: {
                                      access_token: `${localStorage.getItem('access_token')}`
                                  }
                      }
            axios
                .post('http://localhost:3000/products/', body, config)
                .then(response => {
                  console.log(response.data.message)
                  this.successMessage = 'Successfully created a product'
                  this.name = ''
                  this.imageUrl = ''
                  this.price = ''
                  this.category = ''
                })
                
            }else{
              this.errorMessage = 'Please fill all the field'
            }

        }
    },
    
  };
  </script>
  <style>
  </style>