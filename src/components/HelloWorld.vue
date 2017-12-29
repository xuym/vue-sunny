<template>
  <div class="hello">
    <h1>{{ msg }}登录成功</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: this.$store.state.userName
    }
  }
}
</script>

<style scoped>

</style>
