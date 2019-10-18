<template>
  <div class="index">
  
    <header>
      <div class="header-top">
        <div class="logo"></div>
        <div class="index-my iconfont icon-wode1" @click='login'></div>
      </div>
      <div class="header-bottom">
        <!-- <p v-for='i in listData'>{{i.title}}</p> -->
        <el-carousel height="50px" direction="vertical" :autoplay="true">
          <el-carousel-item v-for="i in listData" :key="item">
            <h3 class="medium">{{ i.title}}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </header>
    <div class='index-menu' v-if='list.groups'>
      <!-- <div v-for='i in list' @click='href(i.url)'>
        <dl>
          <dt><img :src="i.img" alt=""></dt>
          <dd>{{i.name}}</dd>
        </dl>
      </div> -->
      <el-tabs  v-model="activeName" @tab-click="handleClick" style='width: 100%'>
        <el-tab-pane label="研发管理" name="0">
          <div class='index-menu'>
          <div v-for='(i,idx) in list.groups[0].umenus' @click='iconChange(idx)' :class="active==idx?'active':''" class="zc-box">
                <dl @click='href(i.menuUrl)'>
                  <dt><img :src="i.menuPictureUrl" alt=""></dt>
                  <dd>{{i.menuName}}</dd>
                </dl>
              </div>
           </div>
        </el-tab-pane>
        <el-tab-pane label="学习类" name="1">
        <div class='index-menu'>
          <div v-for='(i,idx) in list.groups[1].umenus' @click='iconChange(idx)' :class="active==idx?'active':''"  class="zc-box">
                <dl @click='href(i.menuUrl)'>
                  <dt><img :src="i.menuPictureUrl" alt=""></dt>
                  <dd>{{i.menuName}}</dd>
                </dl>
              </div>
           </div>
        </el-tab-pane>
        <el-tab-pane label="办公常用" name="2">
        <div class='index-menu'>
          <div v-for='(i,idx) in list.groups[2].umenus' @click='iconChange(idx)' :class="active==idx?'active':''"  class="zc-box">
                <dl @click='href(i.menuUrl)'>
                  <dt><img :src="i.menuPictureUrl" alt=""></dt>
                  <dd>{{i.menuName}}</dd>
                </dl>
              </div>
           </div>
        </el-tab-pane>
        <el-tab-pane label="未分组" name="3">
        <div class='index-menu'>
          <div v-for='(i,idx) in list.umenus' @click='iconChange(idx)' :class="active==idx?'active':''"  class="zc-box">
                <dl @click='href(i.menuUrl)'>
                  <dt><img :src="i.menuPictureUrl" alt=""></dt>
                  <dd>{{i.menuName}}</dd>
                </dl>
              </div>
           </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    this.zcD();
    if(this.GetCookie('token')!=null){
      this.currentData(1);
      /*const loading = this.$loading(this.$store.state.loading);
      this.$UPOST('/api/umc/signlogin',{
          loginName:Base64.decode(this.GetCookie('var1')),
          password:this.Encrypt(Base64.decode(this.GetCookie('var2')))
        },(res)=>{
          loading.close();
          let data=res.data.uroles[0].umenus;
          for(let i=0;i<data.length;i++){
            this.list.unshift({
              img:data[i].menuPictureUrl,
              id:data[i].menuId,
              url:data[i].menuUrl,
              name:data[i].menuName
            })
          }
        })*/
    }else{
      this.currentData(0);
    }
  },
  data () {
    return {
      list:[],
      active:8888,
      activeName:'0',
      listData:[],
    }
  },
  methods:{
    zcD(){
      this.$UPOST('/api/fmc/noAuth/findDocByCategory',{
          updateTime:'desc',
          categoryId:'9f2d8500623a48fd95d2383695370ed4'
        },(res)=>{
          let _d=res.data.list;
          for(let i=0;i<_d.length;i++){
            this.listData.push({
              title:_d[i].docName
            })
          }
        })
    },
    iconChange(){
      console.log(1)
    },
    login(){
      this.$router.push({'path':'/home'})
    },
    handleClick(tab, event){
      this.active=8888;
    },
    currentData(type){
      this.$UPOST('/api/umc/group/findAllPublishGroup',{
        type:type
      },(res)=>{
        let data=res.data;
        this.list=data;
      })
    },
    href(href){
      window.location.href=href+'/?token='+this.GetCookie('token');
    }
  }
}
</script>
<style>
  .index-menu .el-tabs__nav{
    width: 100%;
    margin-left: 20px;
  }
  .index .el-carousel__indicators--vertical{
    display: none;
  }
   .index .el-carousel--vertical{
    width: 100%;
  } 
</style>
<style scoped>
.header-bottom{
  display: flex;
  align-items: center;
  color: #fff;
  margin-top: 5px;
  width: 100%;
  overflow: hidden;
  height: 50px;
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
    height: 94px;
    width: 100%;
    background: url(../../assets/img/header.png) no-repeat;
    background-size: 100% 100%;
  }
  .index-menu{
    display: flex;
    flex-wrap: wrap;
    /*justify-content: space-around; */
  }

  .menu-tab{
    padding: 0 10px;
  }
  .menu-btnGroup{
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
  }
  .menu-btnGroup button{
    /*height: 30px;*/
    border-radius: 0;
    
  }
  .zc-box{
    width: 33.33%;
    height: 100px;
    margin-bottom: 10px;
  }
  .active{
    box-shadow: 10px 10px 5px #888888;
        background: #f2f2f2;
  }
  .index-menu div dl{
    width: 100%;
  }
  .index-menu div dl dt{
    width: 100%;
    height: 65px;
    display: flex;
    justify-content: center;
    margin-bottom: 3px;
  }
  .index-menu div dl dd{
    text-align: center;
  }
  .index-menu div dl dt img{
    width: 50%;
  }
  .el-carousel__item h3 {
    color: #fff;
    font-size: 14px;
    line-height: 40px;
    margin: 0;
    padding-left: 15px;
  }
</style>
