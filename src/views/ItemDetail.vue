<template>
  <div class="food-detail">
    <Navbar :fullName="fullName" :role="role" :accessToken="accessToken"/>
    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/items" class="text-dark">Items</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Item Order</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6 flex justify-center">
          <img :src=" product.imageUrl " class="img-fluid shadow w-2/3" />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ product.name }}</strong>
          </h2>
          <hr />
          <h4>
            Harga :
            <strong>Rp. {{ product.price }}</strong>
          </h4>
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="jumlah_pemesanan">Jumlah Pesan</label>
              <input type="number" class="form-control" v-model="jumlah" disabled/>
            </div>
            <div class="form-group">
              <label for="keterangan">Keterangan</label>
  
            </div>

            <button type="submit" class="btn btn-success" @click="pemesanan">
              <b-icon-cart></b-icon-cart>Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "ItemDetail",
  components: {
    Navbar,
  },
  data() {
    return {
      product: [],
      jumlah: '1',
    };
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },
    pemesanan() {
      if (this.jumlah) {
        const choosenProduct = {
            imageUrl: this.product.imageUrl,
            name : this.product.name,
            price: this.product.price
        }
        const config = {
          headers: {
                       access_token: `${localStorage.getItem('access_token')}`
                   }
        }
        axios
          .post("http://localhost:3000/carts", choosenProduct, config)
          .then((response) => {
            this.$router.push({ path: "/keranjang"})
            this.$toast.success("Sukses Masuk Keranjang", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });

            console.log(response)
          })
          .catch((err) => console.log(err));
      } 
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        let product = [...response.data]
        const findProduct = product.find(prod => prod._id == this.$route.params.id)
        this.setProduct(findProduct)
      })
      .catch((error) => console.log(error));
  },
  props: ['fullName', 'role', 'accessToken'],
};
</script>

<style>
</style>