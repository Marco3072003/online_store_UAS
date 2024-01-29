<template>
        <div class='fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-800' id="myModal">
                <div class="bg-white px-24 py-16 rounded-lg shadow-lg flex flex-col items-center gap-5 relative">   
                    <slot></slot>
                </div>
        </div>
</template>

<script>
export default {

}
</script>

