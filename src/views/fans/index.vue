<template>
  <div class="fans">
    <el-card>
      <div slot="header">
        <!-- 公共组件面包屑 -->
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans-list" v-for="item in fansList" :key="item.id.toString()">
            <el-avatar :size="80" :src="item.photo"></el-avatar>
            <p>{{item.name}}</p>
            <el-button type="primary" plain size="small">+ 关注</el-button>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="fansData.per_page"
            :current-page="fansData.page"
            @current-change="currentChange"
            style="text-align: center;"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="photo">
          <div ref="main" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
//导入echarts
import echarts from "echarts";
export default {
  name: "app-fans",
  data() {
    return {
      activeName: "list",
      fansList: [],
      fansData: {
        page: 1,
        per_page: 24
      },
      total: 0
    };
  },
  mounted() {
    //dom挂载完毕后，绘制echarts
    //初始化echarts实例
    const myChart = echarts.init(this.$refs.main);
    //指定图标的配置和数据
    const option = {
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };
    //使用配置好的图表
    myChart.setOption(option);
  },
  created() {
    this.getFansList();
  },
  methods: {
    //切换页码
    currentChange(page) {
      this.fansData.page = page;
      this.getFansList();
    },
    //获取粉丝列表
    async getFansList() {
      const res = await this.$http.get("followers", { params: this.fansData });
      this.fansList = res.data.data.results;
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style lang="less" scoped>
.fans {
  .fans-list {
    display: inline-block;
    width: 160px;
    height: 210px;
    border: 1px dashed #ddd;
    text-align: center;
    margin: 20px;
    padding-top: 20px;
    p {
      margin: 20px 0;
    }
  }
}
</style>