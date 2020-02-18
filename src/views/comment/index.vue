<template>
  <div class="comment">
    <el-card>
      <div slot="header">
        <!-- 公共组件面包屑 -->
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="commentTable" style="width: 100%">
        <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status ? '正常' : '关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.comment_status"
              type="success"
              size="small"
              @click="toggleStatus(scope.row)"
            >打开评论</el-button>
            <el-button v-else type="danger" size="small" @click="toggleStatus(scope.row)">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="this.commentData.per_page"
        :current-page="this.commentData.page"
        @current-change="currentChange"
        style="text-align: center; margin-top: 20px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "app-comment",
  data() {
    return {
      commentData: {
        response_type: "comment",
        page: 1,
        per_page: 20
      },
      total: 0,
      commentTable: []
    };
  },
  created() {
    this.getCommentData();
  },
  methods: {
    //切换评论功能状态
    toggleStatus(row) {
      //定义两个常量，用于提示
      const text1 = "您确定要关闭评论功能？关闭后，用户无法评论！";
      const text2 = "您确定要打开评论功能？";
      this.$confirm(row.comment_status ? text1 : text2, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            const res = await this.$http.put(
              `comments/status?article_id=${row.id}`,
              { allow_comment: !row.comment_status }
            );
            row.comment_status = res.data.data.allow_comment;
            this.$message.success(row.comment_status ? '打开成功' : '关闭成功');
          } catch (e) {
            this.$message({
              type: "error",
              message: "操作失败!"
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
    //页码切换
    currentChange(page) {
      this.commentData.page = page;
      this.getCommentData();
    },
    //获取评论列表
    async getCommentData() {
      const res = await this.$http.get("articles", {
        params: this.commentData
      });
      this.commentTable = res.data.data.results;
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style lang="less" scoped>
</style>