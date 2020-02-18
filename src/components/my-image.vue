<template>
  <div class="my-image">
    <div class="img" @click="openDialog">
      <img :src="value || confirmImageUrl" />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="素材库" name="image">
          <div v-loading="load">
            <el-radio-group v-model="reqParams.collect" size="small" @change="collectChange">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <div class="img-list">
              <div
                class="img-item"
                v-for="item in images"
                :key="item.id"
                :class="{selected: selectedImageUrl === item.url}"
                @click="selectedImage(item)"
              >
                <img :src="item.url" />
              </div>
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              style="text-align: center"
              :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              @current-change="imageChange"
              hide-on-single-page
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
            :headers="imageHeaders"
          >
            <img v-if="uploadIimageUrl" :src="uploadIimageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import auth from "@/utils/auth";
import defaultUrl from '@/assets/default.png'
export default {
  name: "my-image",
  data() {
    return {
      dialogVisible: false,
      activeName: "image",
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: null,
      load: false,
      //素材选择的图片地址
      selectedImageUrl: null,
      //上传的图片地址
      uploadIimageUrl: null,
      // 设置上传请求头
      imageHeaders: {
        Authorization: `Bearer ${auth.getUser().token}`
      },
      // 图片按钮的预览图片
      confirmImageUrl: defaultUrl
    };
  },
  props: ['value'],
  methods: {
    //确认图片
    confirmImage() {
      if(this.activeName === 'image') {
        if (!this.selectedImageUrl) return this.$message.warning('请选择一张图片')
        //素材的图片
        // this.confirmImageUrl = this.selectedImageUrl;
        //实现双向绑定
        this.$emit('input', this.selectedImageUrl)
      } else if (this.activeName === 'upload') {
        if (!this.uploadIimageUrl) return this.$message.warning('请上传一张图片')
        //上传的图片
        // this.confirmImageUrl = this.uploadIimageUrl;
        this.$emit('input', this.uploadIimageUrl)
      }
      //关闭对话框
      this.dialogVisible = false;
    },
    //上传成功事件
    handleSuccess(res) {
      this.uploadIimageUrl = res.data.url;
      this.$message.success("添加成功");
    },
    //选中素材图片
    selectedImage(item) {
      //把唯一标识url赋值给，selectedImage
      this.selectedImageUrl = item.url;
    },
    // 收藏切换
    collectChange(flag) {
      this.reqParams.page = 1;
      if (flag) this.reqParams.collect = true;
      this.getImage();
    },
    // 切换页码
    imageChange(page) {
      this.reqParams.page = page;
      this.getImage();
    },
    // 打开会话框
    openDialog() {
      this.dialogVisible = !this.dialogVisible;
      this.getImage();
      this.activeName = 'image';
      this.selectedImageUrl = null;
      this.uploadIimageUrl = null;
    },
    // 获取素材数据
    async getImage() {
      this.load = true;
      const res = await this.$http.get("user/images", {
        params: this.reqParams
      });
      this.load = false;
      this.images = res.data.data.results;
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style scoped lang="less">
.my-image {
  display: inline-block;
  margin-right: 20px;
  .img {
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .img-list {
    .img-item {
      width: 135px;
      height: 135px;
      margin: 20px 20px;
      display: inline-block;
      border: 1px dashed #ddd;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      &.selected::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
          center / 50px auto;
      }
    }
  }
}
</style>
