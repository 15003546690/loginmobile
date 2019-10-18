<template>
  <div class="login" :style="{height: height}">
    <header>
      <div class="header-top">
        <div class="logo"></div>
      </div>
    </header>
    <div class='login-info'>
      <div class="login-info-title">账号登录</div>
      <el-input v-model="user" placeholder="手机号/工号" prefix-icon="el-icon-user"></el-input>
      <el-input v-model="password" placeholder="密码" prefix-icon="el-icon-lock" show-password></el-input>
      <el-button type='primary' @click='login' style='margin-top: 30px;border-radius: 20px;box-shadow: 0px 5px 5px #888888;'>登录</el-button>
    </div>
    <div class="login-bottom">
      <div @click='back'><p class="iconfont icon-xiaolian"></p>有问题？或者有需求反馈？请联系系统管理员</div>
      <div>当前版本：<span>V1.0.0</span></div>
    </div>
  </div>
</template>

<script>
import { MessageBox} from 'mint-ui';
export default {
  created(){
    if(this.GetCookie('token')!=null){
      this.$router.push({'path':'/my'})
    }
    this.height=document.documentElement.clientHeight+'px';
  },
  data () {
    return {
      height:'',
      user:'',
      password:''
    }
  },
  methods:{
    back(){
      this.$router.push({'path':'/login/detail'})
    },
    login(){
      this.SetCookie('var1',Base64.encode(this.user));
      this.SetCookie('var2',Base64.encode(this.password));
      const loading = this.$loading(this.$store.state.loading);
      this.$UPOST('/api/umc/signlogin',{
        loginName:this.user,
        password:this.Encrypt(this.password)
      },(res)=>{
        loading.close();
        if(res.code==200){
          this.SetCookie('pic',res.data.pictureBase64);
          this.SetCookie('id',Base64.encode(res.data.userId));
          this.SetCookie('uroleName',res.data.uroles[0].uroleName);
          this.$router.push({path:'/login',query:{isPwd:1}})
        }else{
          MessageBox('提示', res.msg);
        }
      })
      
    }
  }
}
</script>

<style>
  .el-input .el-input__clear{
    display: flex;
    align-items: center;
  }
  .login-info input{
    border:none;
    border-bottom: 1px solid #ccc !important;
    border-radius: 0;
  }
</style>
<style scoped>
  .login{
    width: 100%;
    height: 100%;
    /*background: url(../../assets/bg.jpg);*/
    overflow: hidden;
    background-size:100% 100%;
    background-attachment:fixed;
    position: relative;
  }
  .logo{
    background:url(../../assets/img/logo.png) no-repeat;
    width: 350px;
    height: 50px;
    background-size: 100%;
    margin: 100px 0 100px 13%;
  }
  .login-info{
    padding: 10px 55px;
    margin-top: 100px;
  }
  .login-info .el-input{
    margin-bottom: 10px;
    border-radius: 0;
  }
  .login-info button{
    width: 100%;
  }
  .hasLogin{
    display: flex !important;
    justify-content: flex-end;
    width: 100%;
    overflow: hidden;
    font-size: 12px;
    line-height: 30px;
    color: #000;
  }
  .login-info p{
    display: flex;
    justify-content: center;
  }
  .index-my{
  color: #fff;
  font-size: 40px;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
}
.header-top{
  height: 54px;
    display: flex;
    align-items: center;
}
.logo{
  width: 260px;
  height: 100%;
  background: url(../../assets/img/logo.png) no-repeat center;
  background-size: 100%;
  margin-left: 10px;
}
  header{
    height: 54px;
    width: 100%;
    background: url(../../assets/img/header.png) no-repeat;
    background-size: 100% 100%;
  }
  .login-info-title{
    display: flex;
    justify-content: center;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .login-bottom{
    width: 100%;
    position: absolute;
    bottom: 100px;
  }
  .login-bottom div{
    width: 100%;
    height: 40px;
    color: #409EFF;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-bottom div:first-child p{
    margin-right: 10px;
    margin-top: 2px;
  }
  .login-bottom div:first-child{
    border-bottom: solid 1px #eee;
    margin-bottom: 40px;
  }
</style>
