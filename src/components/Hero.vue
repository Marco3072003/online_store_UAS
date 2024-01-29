<template>
  <div class="hero">
    <!-- Desktop -->
    <div class="d-none d-md-block">
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="flex h-100 ">
            <div class="justify-content-center align-self-center pl-5">
              <h2>
                <strong>Kualitas Terbaik Part PC </strong>
                <br /> di Indonesia
              </h2>
              <p>Ayo segera pilih dan pesan produk Anda</p>
              <router-link class="btn btn-lg btn-success" to="/items">
                <b-icon-arrow-right></b-icon-arrow-right>Pesan
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6 ">
          <img src="../assets/images/hero.png" width="90%" />
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="d-sm-block d-md-none">
      <div class="row mt-4">
        <div class="col-md-6 mb-3">
          <img src="../assets/images/hero.jpg" width="80%" />
        </div>
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2>
                <strong>Best Quality PC Item,</strong>
                <br />in Your Gadget
              </h2>
              <p>Ayo segera pilih dan item pc favorit Anda</p>
              <button class="btn btn-lg btn-success">
                <b-icon-arrow-right></b-icon-arrow-right>Pesan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
};
</script>

<style>
</style>