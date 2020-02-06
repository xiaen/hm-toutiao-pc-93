<template>
  <div class="box">
    {{msg}}
  </div>
</template>
<script>
export default {
  name:'login',
  data() {
    return {
      msg:'登录'
    }
  },
}
</script>
<style>
.box {
  background-color: red;
}
</style>
