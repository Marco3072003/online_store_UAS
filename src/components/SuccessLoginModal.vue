<template>
      <div class="p-0 m-0 flex flex-col items-center gap-3">
        <span @click="handleSuccessLoginModal" class="absolute right-7 top-4 cursor-pointer font-extrabold text-lg">X</span>
        <h1 class="font-bold text-5xl center">Success Login  as {username}</h1>  
        <button @click="handleLoginModal" class=" bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300" id="closeModal">
            Close
        </button>
      </div>
</template>

<script>
export default {
    props: ['handleSuccessLoginModal', 'handleLoginModal', ]
}
</script>

<style>

</style>