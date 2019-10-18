<template>
  <div class="addSon">
    <mt-header fixed :title="title" style='z-index: 999'>
      <router-link to="/son" slot="left" style='font-size: 12px;'>
          <mt-button icon="back" style='color: #fff;'>返回</mt-button>
      </router-link>
    </mt-header>
    <div class="addSon-list">
      <div style="height: '40xp'"><span><i>*</i>角色名称：</span><el-input v-model='info.name'></el-input></div>
      <div style="height: '40xp'"><span><i>*</i>角色描述：</span><el-input v-model='info.describe'></el-input></div>
      <div><span><i>*</i>权限选择：</span>
          <el-select v-model="info.relationName" placeholder="请选择" @change='seleChange' :disabled=disabled>
            <el-option
              v-for="(i,idx) in info.relationship"
              :key="idx"
              :label="i.label"
              :value="i.value"
              >
            </el-option>
          </el-select>
      </div>
    </div>
    <div style="padding-top: 10px;">
      <el-tree
        :data="treeData"
        node-key="id"
        :default-checked-keys="treeArr"
        @check-change="getChecked"
        ref="tree"
        show-checkbox>
      </el-tree>
    </div>
    <div class="commit" @click='commit'><el-button type='primary'>提交</el-button></div>
  </div>
</template>

<script>
import { MessageBox} from 'mint-ui';
export default {
  created(){
    this.currentData();
    if(this.$route.query.roleId!=undefined){
      const loading = this.$loading(this.$store.state.loading);
      this.$CPOST('/role/findRoleByRoleId',{
        menuId: this.$route.query.menuId,
        roleId:this.$route.query.roleId
      },(res)=>{
        let data=res.data;
        this.disabled=true;
        this.info.relationName=data.var2;
        this.info.name=data.roleName;
        this.info.describe=data.var1;
        this.seleChange(data.var2);
        setTimeout(()=>{
          let arr=[];
          for(let i=0;i<data.permissions.length;i++){
            arr.push(data.permissions[i].permissionId);
            this.treeArr = arr;
          }
          loading.close();
        },500)
      })
    }
  },
  data () {
    return {
      treeArr:[],
      disabled:false,
      title:'子系统角色新增',
      treeData:[],
      info:{
        name:'',
        describe:'',
        relationName:[],
        relationship:[]
      },
      treeSelect:[]
    }
  },
  methods:{
    getChecked(){
      this.treeSelect=[];
      let data=this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
      for(let i=0;i<data.length;i++){
        this.treeSelect.push({
          permissionId:data[i]
        })
      }
    },
    seleChange(val){
      this.treeData=[];
      this.$CPOST('/permission/findPermissionByMenuId',{
        menuId:val
      },(res)=>{
        let data=res.data;
        for(let i=0;i<data.length;i++){
          let child=data[i].subs;
          this.treeData.push({
            label:data[i].title,
            id:data[i].index,
            children:[]
          })
          for(let j=0;j<child.length;j++){
            this.treeData[i].children.push({
              label:child[j].title,
              id:child[j].index
            })
          }
        }
      })
    },
    commit(){
      if(this.$route.query.roleId!=undefined){
        this.$CPOST('/role/updateRole',{
          role:JSON.stringify({
            roleId:this.$route.query.roleId,
            roleName:this.info.name,
            var1:this.info.describe,
            menuId:this.info.relationName,
            permissions:this.treeSelect
            })
          },(res)=>{
            if(res.code==200){
                this.$router.push({path:'/son'})
              }else{
                MessageBox('提示',res.msg)
              }
          })
      }else{
        this.$CPOST('/role/addRole',{
          role:JSON.stringify({
            roleName:this.info.name,
            var1:this.info.describe,
            menuId:this.info.relationName,
            permissions:this.treeSelect
          })
        },(res)=>{
          if(res.code==200){
              this.$router.push({path:'/son'})
            }else{
              MessageBox('提示',res.msg)
            }
        })
      }
      
    },
    currentData(){
      this.$CPOST('/menu/findAllMenu',{

      },(res)=>{
        let data=res.data;
        for(let i=0;i<data.length;i++){
          if(data[i].extend2==1){
            this.info.relationship.push({
              label:data[i].menuName,
              value:data[i].menuId
            })
          }
          
        }
      })
    }
  }
}
</script>

<style>
  .addSon-list div input{
    border:none !important;
  }
  .addSon-list div .el-select{
    width: 100%;
    padding: 0;
  }
  .addSon-list .el-input,.addSon-list .el-select{
    border-bottom:none !important;
  }
  .addSon-list div .el-input-number{
    padding: 0;
    margin-left: -30px;
  }
  .addSon-list div .el-input-number__decrease,.addSon-list div .el-input-number__increase{
    background: none;
    border: none;
  }
</style>
<style scoped>
  .addSon-list div{
    display: flex;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: solid 1px #e6e6e6;
  }
  .addSon-list div span{
    display: inline-block;
    width: 142px;
  }
  .addSon-list div span i,.upload span i{
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
