<template>
  <div class="userInfo">
    <header>
      <div class="header-left header-bar iconfont icon-zuojiantou" @click='back'>
      </div>
      <div class="header-center">
        资料编辑
      </div>
      <div class="header-right header-bar" @click='commit'>
        保存
      </div>
    </header>
    <div class="userI-info">
      <div><span><i></i>头像：</span>
        <div class="cancel-upload">
          <el-upload
            class="avatar-uploader"
            action="https://192.168.112.168:9007/api/fmc/file/upload"
            accept=".jpg,.png,.gif"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div><span><i></i>用户名：</span><el-input v-model='info.userName' disabled></el-input></div>
      <div><span><i></i>工号：</span><el-input v-model='info.userNumber' disabled></el-input></div>
      <div><span><i>*</i>邮箱：</span><el-input v-model='info.email'></el-input></div>
      <div><span><i>*</i>手机：</span><el-input v-model='info.phone' maxlength='11'></el-input></div>
      <div><span><i>*</i>新密码：</span><el-input v-model='info.password' show-password></el-input></div>
    </div>
    <!-- <div class="commit" @click='commit'><el-button type='primary'>提交</el-button></div> -->
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
      info:{
        userName:'',
        userNumber:'',
        email:'',
        phone:'',
        password:'',
      },
      imageUrl: this.GetCookie('pic')
    }
  },
  methods:{
    back(){
      this.$router.push({'path':'/my'})
    },
    //上传相关
    handleAvatarSuccess(res, file) {
      this.SetCookie('pic',res.data);
      this.imageUrl=res.data;
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    commit(){
      this.$CPOST('/user/updatePinfo',{
        userId:Base64.decode(this.GetCookie('id')),
        password:this.info.password,
        loginName:this.info.userName,
        mobile:this.info.phone,
        email:this.info.email,
        pictureBase64:this.imageUrl
      },(res)=>{
          MessageBox('提示',res.msg);
      })
    },
    currentData(){
      this.$CPOST('/user/findUserByUserId',{
        userId:Base64.decode(this.GetCookie('id'))
      },(res)=>{
        let data=res.data;
        this.info.userName=data.userName;
        this.info.userNumber=data.userNumber;
        this.info.email=data.email;
        this.info.phone=data.mobile;
      })
    }
  }
}
</script>
<style>
  .avatar-uploader{
    border-bottom: none !important;
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
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
  .userI-info div input{
    border:none !important;
    text-align: right;
  }
  .userI-info div .el-input__inner{
    background: none !important;
  }
  .userI-info div .el-select{
    width: 100%;
    padding: 0;
  }
  .userI-info .el-input,.userI-info .el-select{
    border-bottom:none !important;
  }
  .userI-info div .el-input-number{
    padding: 0;
    margin-left: -30px;
  }
  .userI-info div .el-input-number__decrease,.userI-info div .el-input-number__increase{
    background: none;
    border: none;
  }
</style>
<style scoped>
.cancel-upload{
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
  .userI-info .cancel-upload{
    border:none !important;
  }
  .userI-info div{
    display: flex;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: solid 1px #e6e6e6;
  }
  .userI-info div span{
    display: inline-block;
    width: 142px;
  }
  .userI-info div span i,.upload span i{
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
  .header-left{
    width: 80px;
    color: #fff;
    padding-left: 20px;
  }
  .header-right{
    width: 100px;
    display: flex;
    justify-content: center;
    color: #fff;
  }
</style>
