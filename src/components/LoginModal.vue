<template>
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-800" id="myModal">
            <div class="bg-white px-24 py-16 rounded-lg shadow-lg flex flex-col items-center gap-5 relative">
            <span class="absolute right-7 top-4 cursor-pointer font-extrabold text-lg" @click="handleLoginModal">X</span>
            <h1 class="font-bold text-5xl center">LOGIN</h1>  
                <form @submit.prevent='handleLogin' class="flex flex-col items-center gap-5">
                    <input v-model="email"  name="email" class="border border-solid border-black p-2 pr-10 rounded-lg" type='text' placeholder='email'/>
                    <input v-model="password" name ="password" class="border border-solid border-black p-2 pr-10 rounded-lg" placeholder='password' type="password">
                    <input type="submit" value='Login' class="btn btn-success px-4 py-2 text-xl" id="closeModal"/>
                </form>
                <h5 class="inline-block text-gray-400">Doesn't have account? <button @click="handleRegisterModal" class="border-none bg-transparent underline text-green-400">register</button></h5> 
            </div>
    </div>
</template>

<script>
export default {
    props: ['handleLoginModal', 'handleRegisterModal'],
    methods: {
        handleLogin(){
            this.$emit('submitLogin', this.email, this.password)
        }
    },
    data(){
        return{
            email:'',
            password:''
        }
    }
}
</script>

<style>

</style>