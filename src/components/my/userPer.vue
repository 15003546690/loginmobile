<template>
  <div class="userPer">
    <!-- <mt-header fixed title="用户管理" style='z-index: 999'>
      <router-link to="/my" slot="left" style='font-size: 12px;'>
          <mt-button icon="back" style='color: #fff;'>返回</mt-button>
      </router-link>
    </mt-header> -->
    <header>
      <div class="header-left header-bar iconfont icon-zuojiantou" @click='back'>
      </div>
      <div class="header-center">
        用户管理
      </div>
      <div class="header-right header-bar">
      </div>
    </header>
    <div class="userPer-search">
      <div class="userPS-bar">
        <el-input placeholder='请输入姓名' v-model='userName' prefix-icon="el-icon-search"></el-input>
        <el-button @click='searchL' type='primary'></el-button>
      </div>
      <!-- <div class="userPS-group">
        <div>
          <el-button type='primary' @click='add()'>新增</el-button>
          <el-button type='primary' @click='sync()'>同步ehr</el-button>
        </div>
        <div>
          <el-button type='primary' :disabled='disabled' @click='setting()'>多选设置角色</el-button>
          <el-button type='primary' :disabled='disabled' @click='del()'>删除</el-button>
        </div>
      </div> -->
    </div>
    <div class="userPer-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div v-for='i in list' style="position: relative;">
        <div class="list-check"><el-checkbox v-model='checkList' :label="i.userId"></el-checkbox></div>
        <p><span>登录名：</span><span>&nbsp{{i.loginName}}</span></p>
        <p><span>用户名：</span><span>&nbsp{{i.userName}}</span></p>
        <p><span>工号：</span><span>&nbsp{{i.userNumber}}</span></p>
        <p><span>岗位：</span><span>&nbsp{{i.positionName}}</span></p>
        <p><span>部门：</span><span>&nbsp{{i.orgName}}</span></p>
        <p><span>子系统角色：</span><span class="sonL-type"><i v-for='j in i.roles'>【{{j.menuName}}】{{j.var1}}</i></span></p>
        <div class="sonL-btngroup"><span><i class="iconfont icon-anniuquanxian" @click='upData(i.userId)'>编辑</i></span><span><i class="iconfont icon-caidanquanxian" @click='pwdReset(i.userId)'>密码重置</i></span></div>
      </div>
      <div class="sonL-text" v-if='currentPage==total'>没有更多内容了</div>
    </div>
  </div>
</template>

<script>
import { MessageBox} from 'mint-ui';
export default {
  watch:{
      'checkList': {
          deep: true,
          handler: function (val){
            if(val.length>0){
              this.disabled=false;
            }else{
              this.disabled=true;
            }
          }
      }
  },
	created(){
    this.currentData(this.currentPage);
	},
  data () {
    return {
      disabled:true,
      checkList:[],
      list:[],
      currentPage:1,
      total:'',
      userName:''
    }
  },
  methods:{
    back(){
      this.$router.push({'path':'/my'})
    },
    del(){
      if(this.checkList.length>1){
        MessageBox('提示','只能选择一个人进行删除');
      }else{
        MessageBox.confirm('是否确认删除').then(action => {
          this.$CPOST('/user/delUser',{
            userId:this.checkList[0]
          },(res)=>{
            this.list=[];
            this.currentPage=1;
            this.currentData(this.currentPage);
          })
        });
      }
    },
    sync(){
      this.$CPOST('/sync/syncEhr',{

      },(res)=>{
        MessageBox('提示',res.msg);
      })
    },
    setting(){
      this.$router.push({path:'/userPer/usersSet',query:{id:this.checkList}})
    },
    add(){
      this.$router.push({path:'/userPer/adduser'})
    },
    upData(id){
      this.$router.push({path:'/userPer/adduser',query:{userId:id}})
    },
    pwdReset(id){
      this.$CPOST('/user/resetPassword',{
        userId:id
      },(res)=>{
        MessageBox('提示',res.msg);
      })
    },
    searchL(){
      this.list=[];
      const loading = this.$loading(this.$store.state.loading);
      this.$CPOST('/user/findUserAllAndRole',{
        pageNo:1,
        pageSize: 10000,
        order: 'desc',
        sort: 'user_number',
        userName:this.userName
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
      if(this.currentPage<this.total){
        this.currentPage++;
        this.currentData(this.currentPage);
      }
    },
    currentData(currentPage){
      const loading = this.$loading(this.$store.state.loading);
      this.$CPOST('/user/findUserAllAndRole',{
        pageNo:currentPage,
        pageSize: 10,
        order: 'desc',
        sort: 'user_number'
      },(res)=>{
        loading.close();
        this.total=res.data.lastPage;
        let data=res.data.list;
        for(let i=0;i<data.length;i++){
          this.list.push(data[i])
        }
        
        this.total=res.data.total;
      })
    },
  }
}
</script>

<style>
  .list-check .el-checkbox__label{
    display: none;
  }
  .userPS-bar .el-input--prefix .el-input__inner{
        padding-left: 40px;
  }
  .userPS-bar .el-input__inner{
    border-radius: 20px
  }
</style>
<style scoped>
  header{
    height: 54px;
    width: 100%;
    background: url(../../assets/img/header.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
  }
  .header-bar{
    
    color: #fff;
  }
  .header-center{
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    color: #fff;
  }
  .header-right{
    width: 100px;
    display: flex;
    justify-content: center;
    color: #fff;
  }
  .header-left{
    width: 80px;
    color: #fff;
    padding-left: 20px;
  }
  .sonL-text{
    line-height: 44px;
    text-align: center;
    color: #999;
  }
  .userPer-search{
    margin-top: 14px;
  }
  .userPS-bar{
    padding:  0 10px;
    display: flex;
    position: relative;
  }
  .userPS-bar .el-button{
    opacity: 0;
    position: absolute;
    height: 100%;
  }
  .userPS-bar .el-input{
    width: 100%;
  }
  .userPS-group div{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .userPS-group div button{
    flex: 1
  }
  .userPer-list{
    margin-top: 20px;
  }
  .userPer-list div{
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .userPer-list div p{
    display: flex;
    
    margin-bottom: 10px;
  }
  .userPer-list div p span:first-child{
    display: inline-block;
    width: 100px;
  }
  .sonL-type i{
    font-style: normal;
    display: inline-block;
    margin-bottom: 5px;
    margin-right: 20px;
  }
  .userPer-list div p span:last-child{
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
  .list-check{
    border: none !important;
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
