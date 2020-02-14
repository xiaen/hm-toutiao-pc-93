<template>
  <div class="article">
    <!-- 卡片 -->
    <el-card class="box-card" style="margin-bottom: 20px">
      <div slot="header">
        <!-- 公共组件面包屑 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- label-width 文字的宽度， size 整个form表单的大小，一共三种选择 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <!-- 这里的表单需要提交给后台，所以，用一个对象保存所有的v-model数据，键值和后台一一对应，看后台接口 -->
          <el-radio-group v-model="filterData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道组件 -->
        <el-form-item label="频道">
          <!-- <my-channel :value="filterData.channel_id" @input="filterData.channel_id = $event"></my-channel> -->
          <my-channel v-model="filterData.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="dateChange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <!-- 头部 -->
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果</div>
      <!-- :data 表格数据，prop每一列显示的数据 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:100%">
              <div slot="error">
                <img src="../../assets/error.gif" style="width:100%" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag type="info" plain v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag type="primary" plain v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag type="success" plain v-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag type="warning" plain v-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag type="danger" plain v-if="scope.row.status === 4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="toEditPage(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="delArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- total 总页数 current-change页数改变事件 page-size每页数据条数 current-page当前页 -->
      <el-pagination
        style="margin-top: 20px"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
        :page-size="filterData.per_page"
        :current-page="filterData.page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "app-article",
  data() {
    return {
      //总页数
      total: 0,
      // filterData传给后台的数据
      filterData: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 选择日期后的数组，[起始日期，结束日期]
      dateArr: [],
      // 筛选结果，表格数据
      tableData: []
    };
  },
  created() {
    //获取表格数据
    this.getTableData();
  },
  methods: {
    //删除文章
    delArticle(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await this.$http.delete(`articles/${id}`);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            //重新渲染页面
            this.getTableData();
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
    //跳转到编辑页面
    toEditPage(id) {
      this.$router.push(`/publish?id=${id}`);
    },
    //点击筛选
    search() {
      //筛选后，不确定有多少条数据，所以默认为第一页
      this.filterData.page = 1;
      this.getTableData();
    },
    //日期选择
    dateChange(dateArr) {
      if (dateArr) {
        this.filterData.begin_pubdate = dateArr[0];
        this.filterData.end_pubdate = dateArr[1];
      } else {
        this.filterData.begin_pubdate = null;
        this.filterData.end_pubdate = null;
      }
    },
    //分页切换
    currentChange(currentPage) {
      //当前页数赋值给filterData.page
      this.filterData.page = currentPage;
      //重新向服务器获取数据
      this.getTableData();
    },
    //获取表格数据
    async getTableData() {
      //得到服务器的返回数据
      const res = await this.$http.get("articles", { params: this.filterData });
      //对tableData进行赋值
      this.tableData = res.data.data.results;
      //获取总条数
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style scoped lang="less">
</style>
