<template>
    <div class="p-0 m-0 flex flex-col items-center gap-3">
        <span @click='handleCloseSuccessRegisterModal' class="absolute right-7 top-4 cursor-pointer font-extrabold text-lg">X</span>
        <h1 class="font-bold text-5xl center">Success Register Account</h1>  
        <button @click='handleLoginModalAfterRegister' class=" bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300" id="closeModal">
            Login
        </button>
    </div>
</template>

<script>
export default {
    props: ['handleLoginModal', 'handleCloseSuccessRegisterModal'],
    methods: {
        handleLoginModalAfterRegister(){
            this.handleLoginModal();
            this.handleCloseSuccessRegisterModal();
        }
    }
}
</script>

<style>

</style>