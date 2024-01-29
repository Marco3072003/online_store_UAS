<template>
  <div>
    <Navbar :fullName="fullName" :role="role" :accessToken="accessToken" />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h2>
            Daftar
            <strong >Produk</strong>
          </h2>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Cari Items.."
              aria-label="Cari"
              aria-describedby="basic-addon1"
            />
            
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-4 mt-4" v-for="product in searchProduct" :key="product._id">
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "Items",
  components: {
    Navbar,
    CardProduct,
  },
  data() {
    return {
      products: [],
      search: '',
    };
  },
  props: ['fullName', 'role', 'accessToken'],
  methods: {
    setProducts(data) {
      this.products = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products")
      .then((response) => this.setProducts(response.data))
      .catch((error) => console.log(error));
  },
  computed: {
    searchProduct(){
      console.log(this.search)
      console.log(this.products)
      return this.products.filter(product => product.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  }
};
</script>
<style>
</style>