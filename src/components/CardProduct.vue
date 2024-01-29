<template>
  <div class="card shadow card-product">
    <div class="w-full flex justify-center">
      <img :src="product.imageUrl" class="card-img-top w-3/4 h-60" alt="..."  />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p
        class="card-text"
      >Harga : Rp. {{ product.price }}</p>
      <p
        class="card-text"
      >Kategori : {{ product.category }}</p>
      <router-link class="btn btn-success" :to="'/items/'+product._id"><b-icon-cart></b-icon-cart> Pesan</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["product"],
};
</script>

<style>
</style>