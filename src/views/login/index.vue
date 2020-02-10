<template>
  <!-- 网页容器盒子 -->
  <div class="login">
    <!-- 中间部分，卡片 -->
    <el-card class="login-card">
      <!-- logo图标 -->
      <img src="../../assets/logo_index.png" alt="">
      <!-- 表单部分 el-form 表单容器 :model 表单数据  :rules 验证规则 status-icon 图标提示  ref 获取组件实例-->
      <el-form :model="loginForm" :rules="loginRules" status-icon ref="loginForm">
        <!-- el-form-item 表单项 手机号  prop 手机号数据-->
        <el-form-item prop="mobile">
          <!-- el-input input表单 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号" ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width: 240px; margin-right: 8px;"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <!-- 我已阅读 -->
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录 -->
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  //导入token存储相关函数
  import auth from '@/utils/auth'
export default {
  name:'app-login',
  data() {
    //自定义验证  验证函数 三个参数 rule，value，callback 固定写法
    const checkMobile = (rule, value, callback) => {
      //如果不满足正则表达式的格式
      if (!/^1[3-9]\d{9}$/.test(value)) {
        //调用callback函数，并提示“手机号格式错误”
        callback(new Error('手机号格式错误'))
      } else {
        //如果正确，则直接调用callback
        callback()
      }
    }
    return {
      //表单数据
      loginForm: {
        mobile:'13911111111',
        code:'246810'
      },
      //表单规则
      loginRules: {
        //验证手机号，mobile和loginForm中的要对应
        mobile: [
          // required 是否必填  message 提示信息  trigger  触发条件
          { required: true, message: '请输入手机号', trigger: 'blur' },
          //validator 自定义验证，checkMobile函数，定义在return上面
          { validator: checkMobile, trigger: 'blur'}
        ],
        //验证验证码
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // len 长度
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      // 获取表单实例，调用validate方法，对整体表单进行校验
      this.$refs.loginForm.validate((valid) => {
        // valid 为 true 校验成功，如果失败不用管
        if (valid) {
          // 进行登录
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm).then((res) => {
            //res是响应报文，res.data是响应体，res.data.data是用户信息
            //存储用户信息 token
            auth.setUser(res.data.data)
            //跳转到首页地址
            this.$router.push('/')
          }).catch(() => {
            //有错误，提示手机号或验证码错误
            this.$message.error('手机号或验证码错误');
          })
        }
      })
    }
  },
  }
</script>
<style lang="less">
  .login {
    width: 100%;
    height: 100%;
    background: url(../../assets/login_bg.jpg) no-repeat;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
  }
  .login-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .login-card img {
    width: 250px;
    display: block;
    margin: 0 auto 20px;
  }
</style>
