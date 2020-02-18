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
          <quill-editor v-model="articleData.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleData.cover.type" @change="articleData.cover.images = []">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="articleData.cover.type === 1">
            <my-image v-model="articleData.cover.images[0]"></my-image>
          </div>
          <div v-if="articleData.cover.type === 3">
            <my-image v-for="i in 3" :key="i" v-model="articleData.cover.images[i-1]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- <my-channel :value="articleData.channel_id" @input="articleData.channel_id = $event"></my-channel> -->
          <my-channel v-model="articleData.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit(false)">发布文章</el-button>
          <el-button @click="submit(true)">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "app-publish",
  data() {
    return {
      articleData: {
        title: null,
        channel_id: null,
        content: null,
        cover: {
          type: 1,
          images: []
        }
      },
      editorOption: {
        placeholder: "",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["image"]
          ]
        }
      }
    };
  },
  components: { quillEditor },
  methods: {
    async submit(draft) {
      try {
          await this.$http.post(`articles?draft=${draft}`, this.articleData)
          this.$message.success(draft ? '存入草稿成功' : '发布文章成功')
          this.$router.push('/article')
      } catch(e) {
        this.$message.error('操作失败')
      }
    }
  },
};
</script>

<style></style>
