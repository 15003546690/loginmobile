<template>
  <div class="my">
    <header>
      <div class="header-top">
        <img :src="picSrc" alt="">
      </div>
    </header>
    <div class="my-menu">
    	<!-- <p v-if='this.isLogin' @click="location('/menu')"><span class="iconfont icon-caidan"></span><span>菜单管理</span><span class="iconfont icon-arrow-right"></span></p>
      <p v-show='isList' @click="location('/parent')"><span class="iconfont icon-jiaosexiugai"></span><span>统一角色管理</span><span class="iconfont icon-arrow-right"></span></p>
      <p v-show='isList' @click="location('/son')"><span class="iconfont icon-yonghuguanli"></span><span>子系统角色管理</span><span class="iconfont icon-arrow-right"></span></p> -->
      <p v-if='this.isLogin' @click="location('/userInfo')"><span class="iconfont icon-gerenxinxi-copy-copy" style="color: #ffcc33"></span><span>个人信息</span><span class="iconfont icon-arrow-right"></span></p>
    	<p v-show='isList' @click="location('/userPer')"><span class="iconfont icon-wode1" style="color: #26a2ff"></span><span>用户管理</span><span class="iconfont icon-arrow-right"></span></p>
    	<!-- <p @click="location('/organization')"><span class="iconfont icon-zuzhijiagou"></span><span>组织架构管理</span><span class="iconfont icon-arrow-right"></span></p> -->
    	<p v-if='this.isLogin' @click="close()"><span style="color: red" class="iconfont icon-zhuxiao"></span><span>注销登录</span><span class="iconfont icon-arrow-right"></span></p>
    </div>
    <!-- <div class="my-close" @click='close'>
      <p v-show='this.isLogin'>退出当前账号</p>
      <p v-show='!this.isLogin' style="color: #26a2ff">登录</p>
    </div> -->
  </div>
</template>

<script>
export default {
  created(){
    if(this.GetCookie('token')==null){
      this.$router.push({'path':'/home'})
    }
  },
  mounted(){
  	if(this.GetCookie('uroleName')=='admin'){
    	this.isList=true;
    }else{
    	this.isList=false;
    }
  },
  data () {
    return {
      picSrc:this.GetCookie('pic'),
    	isLogin:this.GetCookie('token')?true:false,
    	isList:false,
    }
  },
  methods:{
  	location(href){
  		this.$router.push({path:href})
  	},
  	close(){
  		if(!this.isLogin){
  			this.$router.push({path:'/home'})
  		}else{
        this.DelCookie('pic');
  			this.DelCookie('token');
  			this.DelCookie('id');
  			this.DelCookie('menuId');
  			this.DelCookie('var1');
  			this.DelCookie('var2');
  			this.DelCookie('uroleName');
  			this.$router.push({path:'/'})
  		}
  	}
  }
}
</script>


<style scoped>
	.my-menu{
		height: 100%;
	}
	.my-menu p{
		height: 60px;
		line-height: 60px;
		padding: 0 10px;
		border-bottom: 1px solid #e6e6e6;
		color: #333;
	}
	.my-menu p span:first-child{
		margin-right: 15px;
	}
	.my-menu p span:last-child{
		float: right;
	}
	.my-close{
		margin-top: 40px;
		height: 44px;
		line-height: 44px;
		text-align: center;
		border-bottom: 1px solid #e6e6e6;
		border-top: 1px solid #e6e6e6;
		color: red;
	}
  header{
    height: 140px;
    width: 100%;
    background: url(../../assets/img/header.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-top{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: solid 2px #26A2A6;
    overflow: hidden;
  }
  .header-top img{
    width: 100px;
    height: 100px;
  }
</style>
