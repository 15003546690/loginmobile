<template>
  <div class="addUser">
    <mt-header fixed :title=title style='z-index: 999'>
      <router-link to="/userPer" slot="left" style='font-size: 12px;'>
          <mt-button icon="back" style='color: #fff;'>返回</mt-button>
      </router-link>
    </mt-header>
    <div class="addUser-List">
      <div><span><i>*</i>用户名：</span><el-input v-model='info.userName'></el-input></div>
      <div><span><i>*</i>工号：</span><el-input v-model='info.userNumber'></el-input></div>
      <div><span><i>*</i>登录名：</span><el-input v-model='info.loginName'></el-input></div>
      <div><span><i>*</i>手机号：</span><el-input v-model='info.phone' type='number'></el-input></div>
      <div><span><i>*</i>邮箱：</span><el-input v-model='info.email'></el-input></div>
      <div><span><i>*</i>密码：</span><el-input v-model='info.password' show-password></el-input></div>
      <div><span><i>*</i>权限选择：</span>
          <div style="flex: 1;flex-wrap: wrap;">
            <el-tree-select v-model="info.selected"
                :styles="styles"
                :selectParams="selectParams"
                :treeParams="treeParams"
                @searchFun="handleOrgSearchClick"
                ref="treeSelect">
            </el-tree-select>
            <el-select v-model="info.jobId" placeholder="请选择职位" filterable clearable>
                <el-option
                  v-for="(i,idx) in job"
                  :key="idx"
                  :label="i.name"
                  :value="i.id">
                </el-option>
            </el-select>
            <el-select v-model="info.userId" placeholder="请选择角色" filterable clearable>
                <el-option
                  v-for="(i,idx) in userList"
                  :key="idx"
                  :label="i.uroleDesc"
                  :value="i.uroleId">
                </el-option>
            </el-select>
          </div>
      </div>
    </div>
    <div class="commit" @click='commit'><el-button type='primary'>提交</el-button></div>
  </div>
</template>

<script>
import elTreeSelect from 'el-tree-select';
import { MessageBox} from 'mint-ui';
export default {
  components:{
     elTreeSelect
  },
	created(){
    this.currentData();
    if(this.$route.query.userId!=undefined){
      const loading = this.$loading(this.$store.state.loading);
      this.$CGET('/user/findUserByUserId',{
        userId:this.$route.query.userId
      },(res)=>{
        loading.close();
        let data=res.data;
        if(res.code==200){
          this.info.userName=data.userName;
          this.info.userNumber=data.userNumber;
          this.info.loginName=data.loginName;
          this.info.phone=data.mobile;
          this.info.email=data.email;
          this.info.password=data.password;
          this.info.selected=data.organizationPositions[0].orgId;
          this.info.jobId=data.organizationPositions[0].positionId;
          this.info.userId=data.uroles[0].uroleId;
        }else{
          MessageBox('提示',res.msg)
        }
      })
    }
	},
  data () {
    return {
      userList:[],
      styles: {
          width: '200px'
      },
      title:'用户新增',
      info:{
        userId:'',
        jobId:'',
        userName:'',
        userNumber:'',
        loginName:'',
        phone:'',
        email:'',
        password:'',
        selected:'',
        options:[],//部门的联级
      },
      job:[],
      selectParams: {
          multiple: false,
          clearable: true,
          placeholder: '请输入部门'
      },
      treeParams: {
          clickParent: false,
          filterable: true,
          'check-strictly': true,//就是那个多选
          'default-expand-all': true,
          'expand-on-click-node': false,
          'render-content': this._renderFun,
          // 'default-checked-keys': [],
          data: [],
          props: {
          children: 'children',
          label: 'orgName',
          disabled: 'disabled',
          value: 'orgId'
          }
      }
    }
  },
  methods:{
    commit(){
      if(this.$route.query.userId!=undefined){
        this.$CPOST('/user/updateUser',{
          user:JSON.stringify({
            userId:this.$route.query.userId,
            userName:this.info.userName,
            password:this.info.password,
            loginName:this.info.loginName,
            userNumber:this.info.userNumber,
            mobile:this.info.phone,
            email:this.info.email,
            uroles:[{
              uRoleId:this.info.userId
            }],
            organizationPositions:[{
              orgId:this.info.selected,
              positionId:this.info.jobId
            }]
          })
        },(res)=>{
          if(res.code==200){
              this.$router.push({path:'/userPer'})
            }else{
              MessageBox('提示',res.msg)
            }
        })
      }else{
        this.$CPOST('/user/addUser',{
          user:JSON.stringify({
            userName:this.info.userName,
            password:this.info.password,
            loginName:this.info.loginName,
            userNumber:this.info.userNumber,
            mobile:this.info.phone,
            email:this.info.email,
            uroles:[{
              uRoleId:this.info.userId
            }],
            organizationPositions:[{
              orgId:this.info.selected,
              positionId:this.info.jobId
            }]
          })
        },(res)=>{
          if(res.code==200){
              this.$router.push({path:'/userPer'})
            }else{
              MessageBox('提示',res.msg)
            }
        })
      }
      
    },
    currentData(){
      //部门绩效考评
      this.$CPOST('/orignization/findOrgTree',{},(res)=>{
          let data = res.data;
          this.info.options = data;
          this.treeParams.data = data;
          this.$refs.treeSelect.treeDataUpdateFun(data);
      })
      //职业渲染
      this.$CPOST('/position/findPositionAll',{

      },(res)=>{
          let data=res.data;
          for(let i=0;i<data.length;i++){
              this.job.push({
                  name:data[i].positionName,
                  id:data[i].positionId
              })
          }
          // this.surfaceList[0].personList[0].job=this.job;
      })
      //角色
      this.$CPOST('/urole/findAllUrole',{},(res)=>{
          let data = res.data;
          this.userList=data;
      })
    },
    handleOrgSearchClick (value) {
        this.$refs.treeSelect.$refs.tree.filter(value);
    },
  }
}
</script>

<style>
  .addUser-List div input{
    border:none !important;
  }
  .addUser-List div .el-select{
    width: 100%;
    padding: 0;
  }
  .addUser-List .el-input,.addUser-List .el-select{
    border-bottom:none !important;
  }
  .addUser-List div .el-input-number{
    padding: 0;
    margin-left: -30px;
  }
  .addUser-List div .el-input-number__decrease,.addUser-List div .el-input-number__increase{
    background: none;
    border: none;
  }
</style>
<style scoped>
  .addUser-List div{
    display: flex;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: solid 1px #e6e6e6;
  }
  .addUser-List div span{
    display: inline-block;
    width: 142px;
  }
  .addUser-List div span i,.upload span i{
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
