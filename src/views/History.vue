<template>
  <div class="pesanan-sukses">
    <Navbar :fullName="fullName" :role="role" :accessToken="accessToken" />
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
              <li class="breadcrumb-item active" aria-current="page">History</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>
            History
            <strong>Saya</strong>
          </h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Id Transaksi</th>
                  <th scope="col">Total Pengeluaran</th>
                  <th scope="col">Tanggal Checkout</th>
                  <th scope="col">Status</th>
                 
                </tr>
              </thead>
              <tbody>
                <tr v-for="(history, index) in updatedHistories" :key="history._id">
                  <th>{{index+1}}</th>
                  <td>{{ history._id }}</td>
                  <td>
                    <strong>{{ history.price }}</strong>
                  </td>
                  <td>{{ history.createdAt }}</td>
                  <td>Terpesan</td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "History",
  components: {
    Navbar,
  },
  props: ['fullName', 'role', 'accessToken'],
  data(){
    return{
      histories: []
    }
  },
  mounted(){
    this.getHistory();
  },
  methods: {
    setHistory(data){
        this.histories = data
    },
    getHistory(){
      const config ={
      headers: {
                    access_token: `${localStorage.getItem('access_token')}`
                }
    }
    axios
      .get("http://localhost:3000/transactions", config)
      .then((response) => {
        console.log(response.data)
        this.setHistory(response.data)
      })
      .catch((error) => console.log(error));
    }
  },
  computed: {
    updatedHistories(){
      return this.histories.map(history => {
        const dateString = history.createdAt;
        const dateObject = new Date(dateString);

        const jakartaTimeOptions = {
          timeZone: "Asia/Jakarta",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false, // Use 24-hour format
        };

        const formattedDate = dateObject.toLocaleString("en-ID", jakartaTimeOptions);
        const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(history.price);
        return {...history, createdAt: formattedDate, price: formattedPrice}
      })
    }
  }
};
</script>

<style>
</style>