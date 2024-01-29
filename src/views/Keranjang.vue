<template>
  <div class="keranjang">
    <Navbar :updateKeranjang="keranjangs" :fullName="fullName" :role="role" :accessToken="accessToken" />
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
              <li class="breadcrumb-item active" aria-current="page">Keranjang</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>
            Keranjang
            <strong>Saya</strong>
          </h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Items</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total Harga</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(keranjang, index) in keranjangs" :key="keranjang._id">
                  <th>{{index+1}}</th>
                  <td>
                    <img
                      :src="keranjang.imageUrl"
                      class="img-fluid shadow"
                      width="250"
                    />
                  </td>
                  <td>
                    <strong>{{ keranjang.name }}</strong>
                  </td>
                  <td><span class="pr-3">{{ keranjang.quantity }}</span> <button @click="tambahItem(keranjang._id)" class="border-none rounded-md bg-green-400 text-white">+</button></td>
                  <td align="right">Rp. {{ keranjang.price }}</td>
                  <td align="right">
                    <strong>Rp. {{ keranjang.price*keranjang.quantity }}</strong>
                  </td>
                  <td align="center" class="text-danger">
                    <b-icon-trash @click="hapusItem(keranjang._id)"></b-icon-trash>
                  </td>
                </tr>
                <tr>
                  <td colspan="6" align="right">
                    <strong>Total Harga :</strong>
                  </td>
                  <td align="right">
                    <strong>{{ totalHarga }}</strong>
                  </td>
                </tr>
                <tr class=" border-t-0">
                  <td colspan="6" align="right"><strong>Pembayaran Setelah Checkout <br> Transfer Bank ke Rekening BBA:</strong></td>
                  <td align="right"><strong>751234242342</strong></td>
                </tr>
                <tr>
                  <td colspan="6" align="right"><strong>Bukti Transfer bisa dikirim ke WA:</strong></td>
                  <td align="right"><strong>0812234234</strong></td>
                </tr>
                <tr>
                  <td colspan="6" align="right"><strong>Barang akan dikirim ketika <br> sudah ada bukti Transfer</strong></td>
                  <td align="right"><strong>*Biaya Ongkir <br> Dibayarkan COD</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Form Checkout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
            <button type="submit" class="btn btn-success float-right" @click="checkout">
              <b-icon-cart></b-icon-cart>Checkout
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "Keranjang",
  components: {
    Navbar,
  },
  data() {
    return {
      keranjangs: [],
      keterangan_pengiriman:'',
      totalDefaultHarga: ''
    };
  },
  methods: {
    setKeranjangs(data) {
      this.keranjangs = data;
    },
    hapusItem(id) {
      const body ={
        type: 'Remove'
      }

      const config ={
      headers: {
                    access_token: `${localStorage.getItem('access_token')}`
                }
      }
      axios
        .put("http://localhost:3000/carts/" + id, body, config)
        .then(response => {
          this.$toast.error("Sukses Hapus Satu Item", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
          console.log(response)
          // Update Data keranjang
          axios
            .get("http://localhost:3000/carts", config)
            .then((response) => {

              this.setKeranjangs(response.data) 
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    checkout() {
      const price = this.keranjangs.reduce(function (items, data) {
        return items + data.price * data.quantity;
      }, 0);
      
       const cartId = [...this.keranjangs].map(cart => cart._id);

       if(this.keranjangs.length > 0){
        const body = {
          price,
          cartId
        }
        const config ={
                        headers: {
                                      access_token: `${localStorage.getItem('access_token')}`
                                  }
                      }
         axios
          .post("http://localhost:3000/transactions", body, config)
          .then(response => {
              this.$toast.success("Sukses Checkout Keranjang", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
            console.log(response.data)
            
            axios
            .get("http://localhost:3000/carts", config)
            .then((response) => {

              this.setKeranjangs(response.data) 
            })
            .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error))
       }
      
      /* if (this.pesan.nama && this.pesan.noMeja) {
        this.pesan.keranjangs = this.keranjangs;
        axios
          .post("http://localhost:3000/pesanans", this.pesan)
          .then(() => {

            // Hapus Semua Keranjang 
            this.keranjangs.map(function (item) {
              return axios
                .delete("http://localhost:3000/keranjangs/" + item.id)
                .catch((error) => console.log(error));
            });

            this.$router.push({ path: "/pesanan-sukses" });
            this.$toast.success("Sukses Dipesan", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.error("Nama dan Nomor Meja Harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      } */
    },
    tambahItem(id){
      const body ={
        type: 'Add'
      }

      const config ={
      headers: {
                    access_token: `${localStorage.getItem('access_token')}`
                }
      }
      axios
        .put("http://localhost:3000/carts/" + id, body, config)
        .then(response => {
          this.$toast.success("Sukses Tambah Item", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
          console.log(response)
          // Update Data keranjang
          axios
            .get("http://localhost:3000/carts", config)
            .then((response) => {
              this.setKeranjangs(response.data) 
              console.log(response.data)
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  },
  mounted() {
    const config ={
      headers: {
                    access_token: `${localStorage.getItem('access_token')}`
                }
    }
    axios
      .get("http://localhost:3000/carts", config)
      .then((response) => {
        console.log(response.data)
        this.setKeranjangs(response.data)
      })
      .catch((error) => console.log(error));
  },
  props: ['fullName', 'role', 'accessToken'],
  computed: {
    totalHarga() {
      const total = this.keranjangs.reduce(function (items, data) {
        return items + data.price * data.quantity;
      }, 0);
      const formattedTotal = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(total);
      return formattedTotal;
    },
  },
  
};
</script>

<style>
</style>