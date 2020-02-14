<template>
  <el-select :value="value" placeholder="请选择" clearable @change="channelChange">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "my-channel",
  data() {
    return {
      // 频道下拉选框的数据
      channelOptions: []
    };
  },
  props: ["value"],
  methods: {
    //频道数据改变事件
    channelChange(value) {
      if (value === "") value = null;
      this.$emit("input", value);
    },
    //获取频道数据
    async getChannelOptions() {
      //得到服务器的返回数据
      const res = await this.$http.get("channels");
      // 对channleOptions进行赋值
      this.channelOptions = res.data.data.channels;
    }
  },
  created() {
    //获取频道数据
    this.getChannelOptions();
  }
};
</script>

<style></style>
