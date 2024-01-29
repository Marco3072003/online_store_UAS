<template>
  <div class="home">
    <Navbar :fullName="fullName" :role="role" :accessToken="accessToken"/>
    <div class="container">
      <Hero />

      <div class="row mt-4">
        <div class="col">
          <h2>
            <strong class="text-4xl">Produk Terbaik Kami</strong>
          </h2>
        </div>
        <div class="col">
          <router-link to="/items" class="btn btn-success float-right">
            <b-icon-eye></b-icon-eye>Lihat Semua
          </router-link>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-4 mt-4" v-for="product in firstThreeProducts" :key="product._id">
          <CardProduct :product="product"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Hero from "@/components/Hero.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";


export default {
  name: "Home",
  components: {
    Navbar,
    Hero,
    CardProduct,
  },
  props: ['fullName', 'role', 'accessToken'],
  data() {
    return {
      products: [],
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products")
      .then((response) => this.setProducts(response.data))
      .catch((error) => console.log(error))
  },
  computed: {
    firstThreeProducts() {
      const firstThree = [...this.products].slice(0, 3)
      console.log(firstThree)
      return firstThree;
    },
  },
};
</script>
