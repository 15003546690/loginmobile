<template>
  <div class="login-detail">
    <header>
      <div class="header-top">
        <div class="logo"></div>
        <div class="header-back" @click='back'>返回</div>
      </div>
    </header>
    <div class="loginD-detail">
      <div class="loginD-detail-box">
        <div>VEPAL视联信息系统请联系：</div>
        <div><span class="iconfont icon-wode1"></span>李桂林：779239280</div>
      </div>
      <div class="loginD-detail-box">
        <div>绩效考评系统请联系：</div>
        <div><span class="iconfont icon-wode1"></span>王立杰：545054774</div>
      </div>
      <div class="loginD-detail-box">
        <div>工时系统请联系：</div>
        <div><span class="iconfont icon-wode1"></span>宋丽雪：450137642</div>
      </div>
      <div class="loginD-detail-box">
        <div>套装系统请联系：</div>
        <div><span class="iconfont icon-wode1"></span>马小红：554349712</div>
      </div>
      <div class="loginD-detail-box">
        <div>需求和建议请联系：</div>
        <div><span class="iconfont icon-wode1"></span>曹淑云：407563292</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	created(){
	},
  data () {
    return {
    }
  },
  methods:{
    back(){
      this.$router.push({'path':'/home'})
    }
  }
}
</script>


<style scoped>
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
  .header-back{
    margin-left: 40px;
    display: flex;
    justify-content: flex-end;
    width: 70px;
    height: 40px;
    background: #fff;
    color: #26a2ff;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-weight: bold;
  }
  .loginD-detail-box{
    height: 50px;
    padding: 10px 20px;
  }
  .loginD-detail-box div:first-child{
    font-weight: bold;
  }
  .loginD-detail-box div:last-child{
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  .loginD-detail-box div:last-child span{
    margin-right: 10px;
  }
</style>
