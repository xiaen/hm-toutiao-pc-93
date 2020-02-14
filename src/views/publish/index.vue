<template>
  <div class="publish">
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articleData.title" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          富文本
        </el-form-item>
        <el-form-item label="封面：">
          封面
        </el-form-item>
        <el-form-item label="频道：">
          <!-- <my-channel :value="articleData.channel" @input="articleData.channel = $event"></my-channel> -->
          <my-channel v-model="articleData.channel"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发布文章</el-button>
          <el-button>存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "app-publish",
  data() {
    return {
      articleData: {
        title: '',
        channel: null
      }
    }
  },
};
</script>

<style></style>
