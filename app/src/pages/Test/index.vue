<template>
  <div>这是一个测试页</div>
</template>

<script>
export default {
    name:'',
    mounted(){
        this.$store.dispatch("getCategoryList")
    }
}
</script>

<style>

</style>