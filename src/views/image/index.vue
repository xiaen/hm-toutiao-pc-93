<template>
  <div class="image">
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>素材管理</my-bread>
      </div>
      <el-radio-group v-model="filterImage.collect" size="small" @change="collectChange">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button style="float: right" type="success" size="small" @click="addImage">添加素材</el-button>
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" />
          <div class="option">
            <span
              class="el-icon-star-off"
              :class="{red: item.is_collected}"
              @click="toggleCollect(item)"
            ></span>
            <span class="el-icon-delete" @click="delImage(item)"></span>
          </div>
        </div>
      </div>
      <el-pagination
        style="text-align: center"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="filterImage.per_page"
        :current-page="filterImage.page"
        @current-change="imageChange"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        name="image"
        :headers="imageHeaders"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import auth from '@/utils/auth'
export default {
  name: "app-image",
  data() {
    return {
      filterImage: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      // 对话框默认隐藏
      dialogVisible: false,
      // 设置上传请求头
      imageHeaders: {
        Authorization : `Bearer ${auth.getUser().token}`
      },
      imageUrl: null
    };
  },
  created() {
    this.getImage();
  },
  methods: {
    //上传成功
    handleSuccess(res) {
      this.imageUrl = res.data.url;
      this.$message.success('添加成功');
      window.setTimeout(() => {
        //关闭会话，渲染页面
        this.dialogVisible = false;
        this.getImage();
      }, 1000)
    },
    addImage() {
      this.dialogVisible = true
      this.imageUrl = null
    },
    //删除素材
    async delImage(item) {
      this.$confirm("此操作将永久删除该图片素材, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await this.$http.delete(`user/images/${item.id}`);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            //重新渲染页面
            this.getImage();
          } catch (e) {
            this.$message({
              type: "warning",
              message: "删除失败!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //切换是否收藏
    async toggleCollect(item) {
      //发请求修改是否收藏
      const res = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      });
      //提示收藏成功
      this.$message.success(res.data.data.collect ? "添加收藏" : "取消收藏");
      //改类名
      item.is_collected = res.data.data.collect;
    },
    //全部收藏切换
    collectChange() {
      this.getImage();
    },
    //页码切换
    imageChange(page) {
      this.filterImage.page = page;
      this.getImage();
    },
    //获取图片素材
    async getImage() {
      const res = await this.$http.get("user/images", {
        params: this.filterImage
      });
      this.images = res.data.data.results;
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style scoped lang="less">
.img-list {
  .img-item {
    width: 207px;
    height: 207px;
    margin: 20px 20px;
    display: inline-block;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .option {
      height: 30px;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      line-height: 30px;
      text-align: center;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      span {
        margin: 0 20px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>
