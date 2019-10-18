<template>
  <div class="addParent">
    <mt-header fixed :title="title" style='z-index: 999'>
      <router-link to="/parent" slot="left" style='font-size: 12px;'>
          <mt-button icon="back" style='color: #fff;'>返回</mt-button>
      </router-link>
    </mt-header>
    <div class="addmenu-list">
      <div style="height: '40xp'"><span><i>*</i>角色名称：</span><el-input v-model='info.name'></el-input></div>
      <div style="height: '40xp'"><span><i>*</i>角色描述：</span><el-input v-model='info.describe'></el-input></div>
      <div><span><i>*</i>关联系统：</span>
          <el-select v-model="info.relationName" placeholder="请选择" multiple>
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
    <div class="commit" @click='commit'><el-button type='primary'>提交</el-button></div>
  </div>
</template>

<script>
import { MessageBox} from 'mint-ui';
export default {
	created(){
    this.currentData();
    if(this.$route.query.uroleId!=undefined){
      const loading = this.$loading(this.$store.state.loading);
      this.$CPOST('/urole/findUrole',{
        uroleId:this.$route.query.uroleId
      },(res)=>{
        loading.close();
        let data=res.data;
        this.info.name=data.uroleName;
        this.info.describe=data.uroleDesc;
        for(let i=0;i<data.umenus.length;i++){
          this.info.relationName.push(data.umenus[i].menuId)
        }
      })
    }
	},
  data () {
    return {
      title:'角色新增',
      info:{
        name:'',
        describe:'',
        relationName:[],
        relationship:[]
      }
    }
  },
  methods:{
    commit(){
      const loading = this.$loading(this.$store.state.loading);
      let arr=[],_d=this.info.relationName;
      if(this.$route.query.uroleId!=undefined){
        for(let i=0;i<_d.length;i++){
          arr.push({
            menuId:_d[i]
          })
        }
        this.$CPOST('/urole/updateUrole',{
          urole:JSON.stringify({
            uRoleId:this.$route.query.uroleId,
            uRoleName:this.info.name,
            uRoleDesc:this.info.describe,
            umenus:this.info.relationship,
            umenus:arr
          })
        },(res)=>{
          loading.close();
          if(res.code==200){
            this.$router.push({path:'/parent'})
          }else{
            MessageBox('提示',res.msg)
          }
        })
      }else{
        // let arr=[],_d=this.info.relationName;
        for(let i=0;i<_d.length;i++){
          arr.push({
            menuId:_d[i]
          })
        }
        this.$CPOST('/urole/addUrole',{
          urole:JSON.stringify({
            uRoleName:this.info.name,
            uRoleDesc:this.info.describe,
            umenus:this.info.relationship,
            umenus:arr
          })
        },(res)=>{
          loading.close();
          if(res.code==200){
            this.$router.push({path:'/parent'})
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
  .avatar-uploader{
    margin-top: 10px;
    margin-left: 20px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .addmenu-list div input{
    border:none !important;
  }
  .addmenu-list div .el-select{
    width: 100%;
    padding: 0;
  }
  .addmenu-list .el-input,.addmenu-list .el-select{
    border-bottom:none !important;
  }
  .addmenu-list div .el-input-number{
    padding: 0;
    margin-left: -30px;
  }
  .addmenu-list div .el-input-number__decrease,.addmenu-list div .el-input-number__increase{
    background: none;
    border: none;
  }
</style>
<style scoped>
  .addmenu-list div{
    display: flex;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: solid 1px #e6e6e6;
  }
  .addmenu-list div span{
    display: inline-block;
    width: 142px;
  }
  .addmenu-list div span i,.upload span i{
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
