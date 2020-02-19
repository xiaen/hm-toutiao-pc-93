<template>
  <el-container class="home">
    <!-- 侧边栏 -->
    <!-- 动态绑定width，用三元表达式判断 -->
    <el-aside :width="isOpen ? '200px' : '64px'" class="home-aside">
      <!-- logo -->
      <!-- 动态绑定class，通过isOpen判断是否添加.min类 -->
      <div class="logo" :class="{min: !isOpen}"></div>
      <!-- 导航栏 -->
      <!-- element-ui自带导航栏折叠属性collapse，动态绑定 ，折叠动画关闭-->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right: none;"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header class="home-header">
        <span class="el-icon-s-fold icon" @click="toggleMenu"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="home-dropdown" @command="myHandle">
          <span class="el-dropdown-link">
            <!-- 头像 -->
            <img class="head" :src="photo" alt />
            <!-- 用户名 -->
            <b class="user">{{name}}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="home-main">
        <!-- 子路由，欢迎页面 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from "@/eventBus";
//引入auth模块，获取用户信息
import auth from "@/utils/auth";
export default {
  name: "app-home",
  data() {
    return {
      isOpen: true,
      name: "",
      photo: ""
    };
  },
  created() {
    const user = auth.getUser();
    this.name = user.name;
    this.photo = user.photo;
    eventBus.$on('updataUserDate', (name) => {
      this.name = name
    })
    eventBus.$on('updateUserPhoto', (photo) => {
      this.photo = photo
    })
    
  },
  methods: {
    // 点击折叠之间，通过切换数据
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    myHandle(command) {
      if (command === "setting") {
        //跳转到个人设置页面
        this.$router.push("/setting");
      }
      if (command === "logout") {
        //清除本地信息
        auth.delUser();
        //跳转到登录页面
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style lang="less">
.home {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.home-aside {
  background-color: #002033;
}
.home-header {
  border-bottom: 1px solid #ddd;
}
.el-icon-s-fold {
  font-size: 24px;
}
.home-header .icon {
  vertical-align: middle;
}
.text {
  line-height: 60px;
  padding-left: 8px;
  vertical-align: middle;
}
.home-dropdown {
  float: right;
  line-height: 60px;
}
.head {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.user {
  vertical-align: middle;
  margin-left: 5px;
}
.logo {
  width: 100%;
  height: 60px;
  background: #002044 url(../../assets/logo_admin.png) no-repeat center / 140px
    auto;
}
/* 当数据变化时，是否添加.min ，必须写在.logo下面*/
.min {
  background-image: url(../../assets/logo_admin_01.png);
  background-size: 36px;
}
</style>
