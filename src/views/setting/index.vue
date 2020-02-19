<template>
  <div class="setting">
    <el-card>
      <div slot="header">
        <!-- 公共组件面包屑 -->
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px" :model="user">
            <el-form-item label="编号：">{{user.id}}</el-form-item>
            <el-form-item label="手机号：">{{user.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input type="textarea" :rows="5" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save">保存修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="updatePhoto"
          >
            <img v-if="user.photo" :src="user.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align: center;">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import auth from "@/utils/auth";
import eventBus from "@/eventBus";
export default {
  name: "app-setting",
  data() {
    return {
      user: {
        name: "",
        intro: "",
        email: "",
        photo: null
      }
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    //修改头像
    async updatePhoto({ file }) {
      try {
        const fd = new FormData();
        fd.append("photo", file);
        // 发请求
        const res = await this.$http.patch("user/photo", fd);
        //预览
        this.user.photo = res.data.data.photo;
        //修改本地信息
        const user = auth.getUser();
        user.photo = res.data.data.photo;
        auth.setUser(user);
        //同步到home
        eventBus.$emit("updateUserPhoto", this.user.photo);
        //提示
        this.$message.success("修改用户头像成功");
      } catch (e) {
        this.$message.error("修改失败");
      }
    },
    //保存修改
    async save() {
      try {
        const { name, intro, email } = this.user;
        const res = await this.$http.patch("user/profile", {
          name,
          intro,
          email
        });
        //修改本地信息
        const user = auth.getUser();
        user.name = name;
        auth.setUser(user);
        //同步home
        eventBus.$emit("updataUserDate", name);
        this.$message.success("修改成功");
        // this.$router.push('/')
      } catch (e) {
        this.$message.error("修改失败");
      }
    },
    //获取用户信息
    async getUser() {
      const res = await this.$http.get("user/profile");
      this.user = res.data.data;
    }
  }
};
</script>

<style lang="less" scpoed>
</style>