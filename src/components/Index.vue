<template>
  <div class="index">
    <div class="content">
      <router-view class='routerV'></router-view>
    </div>
    <div class="nav-bar">
      <mt-tabbar v-model="selected">
        <mt-tab-item id="index">
          <router-link to='/login' class='locationH'>
          <p class="iconfont icon-shouye"></p>
          首页
          </router-link>
        </mt-tab-item>
        <mt-tab-item id="my">
          <router-link to='/my' class='locationH'>
            <p class="iconfont icon-wode"></p>
            我的
        </router-link>
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  watch:{
    $route(to,from){
      if(to.path=='/login'){
        this.selected='index';
      }else if(to.path=='/my'){
        this.selected='my';
      }
    }
  },
  created(){
    
  },
  data () {
    return {
      selected:'index'
    }
  }
}
</script>


<style scoped>
.content{
  /*padding:50px 0;*/
}
.nav-bar{
  position: fixed;
  width: 100%;
  bottom: 0;
}
.nav-bar a{
  display: inline-block;
  width: 100%;
}
.iconfont{
  margin-bottom: 5px;
}
.locationH{
  text-decoration: none;
  color: #000;
}
.is-selected .locationH{
  color: #26a2ff !important;
}
</style>
