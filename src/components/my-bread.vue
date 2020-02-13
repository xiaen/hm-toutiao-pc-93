<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <!-- :to="{ path: '/' }" 相当于 router-link to -->
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <slot></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: 'my-bread'
  }
</script>

<style>
</style>
