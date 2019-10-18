<template>
  <div class="usersSet">
    <mt-header fixed title="设置角色" style='z-index: 999'>
      <router-link to="/userPer" slot="left" style='font-size: 12px;'>
          <mt-button icon="back" style='color: #fff;'>返回</mt-button>
      </router-link>
    </mt-header>
     <div class="usersSet-list">
      <div><span><i>*</i>角色选择：</span>
          <el-select v-model="userName" placeholder="请选择" multiple>
            <el-option
              v-for="(i,idx) in list"
              :key="idx"
              :label="i.label"
              :value="i.value"
              >
            </el-option>
          </el-select>
      </div>
    </div>
    <div class="commit" @click='commit'><el-button type='primary'>提交</el-button></div>
  </div>
</template>

<script>
import { MessageBox} from 'mint-ui';
export default {
	created(){
    this.currentData();
	},
  data () {
    return {
      userName:[],
      list:[]
    }
  },
  methods:{
    commit(){
      const loading = this.$loading(this.$store.state.loading);
      //处理带过来的参数userIds
      let data=this.$route.query.id,str='',roleIds='';
      for(let i=0;i<data.length;i++){
        str+=data[i]+',';
      }
      str=str.substring(0,str.length-1);
      //处理userName
      for(let i=0;i<this.userName.length;i++){
        roleIds+=this.userName[i]+',';
      }
      roleIds=roleIds.substring(0,roleIds.length-1);
      this.$CPOST('/role/batchUserRoles',{
        userIds:str,
        roleIds:roleIds
      },(res)=>{
        loading.close();
        if(res.code==200){
          this.$router.push({path:'/userPer'})
        }else{
          MessageBox('提示',res.msg)
        }
      })
    },
    currentData(currentPage){
      const loading = this.$loading(this.$store.state.loading);
      this.$CPOST('/role/findAll',{
        pageNo:currentPage,
        pageSize:10000,
        menuName:this.searchInput
      },(res)=>{
        loading.close();
        this.total=res.data.lastPage;
        let data=res.data.list;
        for(let i=0;i<data.length;i++){
          this.list.push({
            label:'【'+data[i].menuName+'】'+data[i].var1,
            value:data[i].roleId
          })
        }
      })
    }
  }
}
</script>

<style>
  .usersSet-list div input{
    border:none !important;
  }
  .usersSet-list div .el-select{
    width: 100%;
    padding: 0;
  }
  .usersSet-list .el-input,.usersSet-list .el-select{
    border-bottom:none !important;
  }
  .usersSet-list div .el-input-number{
    padding: 0;
    margin-left: -30px;
  }
  .usersSet-list div .el-input-number__decrease,.usersSet-list div .el-input-number__increase{
    background: none;
    border: none;
  }
</style>
<style scoped>
.usersSet-list div{
    display: flex;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: solid 1px #e6e6e6;
  }
  .usersSet-list div span{
    display: inline-block;
    width: 142px;
  }
  .usersSet-list div span i,.upload span i{
    display: inline-block;
    width: 10px;
    margin-right: 5px;
    color: red;
    font-style: normal;
  }
  .commit{
    padding: 0 10px;
    margin-top: 30px;
  }
  .commit button{
    width: 100%;
  }
</style>
