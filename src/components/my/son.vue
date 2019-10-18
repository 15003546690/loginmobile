<template>
  <div class="son">
    <mt-header fixed title="子系统角色管理" style='z-index: 999'>
      <router-link to="/my" slot="left" style='font-size: 12px;'>
          <mt-button icon="back" style='color: #fff;'>返回</mt-button>
      </router-link>
    </mt-header>
    <div class="son-search">
      <el-button class='sonS-add' type='primary' @click='add'>新增</el-button>
      <div>
        <el-input v-model='searchInput'></el-input>
        <el-button @click='searchL()'>搜索</el-button>
      </div>
    </div>
    <div class="son-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div v-for='i in list'>
        <p><span>子系统名称：</span><span>{{i.menuName}}</span></p>
        <p><span>子系统角色：</span><span>{{i.roleName}}</span></p>
        <p><span>权限：</span><span class="sonL-type"><i v-for='j in i.menuTreeList'>{{j.title}}</i></span></p>
        <div class="sonL-btngroup"><span><i class="iconfont icon-anniuquanxian" @click='btnPer(i.menuId,i.roleId)'>按钮权限</i></span><span><i class="iconfont icon-caidanquanxian" @click='menuBtn(i.roleId,i.menuId)'>菜单权限</i></span><span style="color: red"><i class="iconfont icon-shanchu" @click='del(i.roleId)'>删除</i></span></div>
      </div>
      <div class="sonL-text" v-if='currentPage==total'>没有更多内容了</div>
    </div>
  </div>
</template>

<script>
import { InfiniteScroll,MessageBox } from 'mint-ui';
export default {
  created(){
     this.currentData(this.currentPage);
  },
  data () {
    return {
      list:[],
      total:'',
      currentPage:1,
      searchInput:''
    }
  },
  methods:{
    btnPer(menuId,roleId){
      this.$router.push({path:'/son/btnPer',query:{menuId,roleId}})
    },
    del(id){
      MessageBox.confirm('是否确认删除').then(action => {
        this.$CPOST('/role/delRole',{
          roleId:id
        },(res)=>{
          this.list=[];
          this.currentData(1);
        })
      });
    },
    menuBtn(roleId,menuId){
      this.$router.push({path:'/son/addSon',query:{roleId,menuId}})
    },
    add(){
      this.$router.push({path:'/son/addSon'})
    },
    searchL(){
      this.list=[];
      const loading = this.$loading(this.$store.state.loading);
      this.$CPOST('/role/findAll',{
        pageNo:1,
        pageSize:100000,
        menuName:this.searchInput
      },(res)=>{
        loading.close();
        this.total=res.data.lastPage;
        let data=res.data.list;
        for(let i=0;i<data.length;i++){
          this.list.push(data[i])
        }
      })
    },
    loadMore() {
      this.loading = true;
      if(this.currentPage<this.total){
        this.currentPage++;
        this.currentData(this.currentPage);
      }
    },
    currentData(currentPage){
      const loading = this.$loading(this.$store.state.loading);
      this.$CPOST('/role/findAll',{
        pageNo:currentPage,
        pageSize:5,
        menuName:this.searchInput
      },(res)=>{
        loading.close();
        this.total=res.data.lastPage;
        let data=res.data.list;
        for(let i=0;i<data.length;i++){
          this.list.push(data[i])
        }
      })
    }
  }
}
</script>


<style scoped>
  .sonL-text{
    line-height: 44px;
    text-align: center;
    color: #999;
  }
  .son-list div{
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .son-list div p{
    display: flex;
    
    margin-bottom: 10px;
  }
  .son-list div p span:first-child{
    display: inline-block;
    width: 100px;
  }
  .sonL-type i{
    font-style: normal;
    display: inline-block;
    margin-bottom: 5px;
    margin-right: 20px;
  }
  .son-list div p span:last-child{
    flex: 1;
    color: #999;
  }
  .sonL-btngroup{
    border-top: solid 1px #eee;
    border-bottom: none !important;
    display: flex;
  }
  .sonL-btngroup span{
    flex: 1;
    text-align: center;
  }
  .icon-anniuquanxian:before,.icon-caidanquanxian:before,.icon-shanchu:before{
    margin-right: 6px;
  }
  .son-search{
    padding: 10px;
  }
  .sonS-add{
    width: 100%;
    margin-bottom: 10px;
  }
  .son-search div{
    display: flex;
  }
  .son-search div .el-input{
    width: 80%;
    margin-right: 10px;
  }
</style>
