<template>
  <div class="addmenu">
    <mt-header fixed :title="title" style='z-index: 999'>
		<router-link to="/menu" slot="left" style='font-size: 12px;'>
		    <mt-button icon="back" style='color: #fff;'>返回</mt-button>
		</router-link>
	</mt-header>
	<div class="addmenu-list">
		<div><span><i>*</i>系统名称：</span><el-input v-model='info.name'></el-input></div>
		<div v-if='id==1'><span style="width: 220px"><i>*</i>个人系统状态：</span>
			 <el-select v-model="info.userStateName" placeholder="请选择">
			    <el-option
			      v-for="(i,idx) in userState"
			      :key="idx"
			      :label="i.label"
			      :value="i.value"
			      >
			    </el-option>
			  </el-select>
		</div>
		<div><span><i>*</i>系统状态：</span>
			 <el-select v-model="info.systemStateName" placeholder="请选择">
			    <el-option
			      v-for="(i,idx) in systemState"
			      :key="idx"
			      :label="i.label"
			      :value="i.value"
			      >
			    </el-option>
			  </el-select>
		</div>
		<div v-if='id==1'><span><i></i>排序：</span>
			<el-input-number v-model="info.userNum" :min="1" :max="99"></el-input-number>
		</div>
		<div  v-if='id==0'><span><i></i>排序：</span>
			<el-input-number v-model="info.num" :min="1" :max="99"></el-input-number>
		</div>
		<div><span><i>*</i>系统地址：</span><el-input v-model='info.href'></el-input></div>
	</div>
	<div class="upload">
		<span><i></i>上传图标：</span>
		<el-upload
			  class="avatar-uploader"
			  action=""
			  :http-request='httpRequest'
			  accept=".jpg"
			  :show-file-list="false"
			  :before-upload="fileBefore"
			  >
			  <img v-if="info.imageUrl" :src="info.imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
	</div>
	<div class="commit" @click='commit'><el-button type='primary'>提交</el-button></div>
  </div>
</template>

<script>
import { MessageBox} from 'mint-ui';
export default {
	created(){
		if(this.$route.query.data!=undefined){
			const loading = this.$loading(this.$store.state.loading);
			let data=this.$route.query.data;
			this.menuId=data.id,
			this.info.name=data.name,
			this.info.systemStateName=data.menuStatus,
			this.info.userStateName=data.oneSelfStatus,
			this.info.num=data.menuSort,
			this.info.userNum=data.oneSelfSort,
			this.info.href=data.url,
			this.info.imageUrl=data.img
			loading.close();
		}
	},
  data () {
    return {
    	id:this.$route.query.activeName,//判断公共还是个人
    	menuId:'',//回显当前id
    	info:{
    		name:'',
    		systemStateName:'',
    		href:'http://',
    		imageUrl:'',
    		num:'',
    		userStateName:'',
    		userNum:'',
    	},
    	title:'菜单新增',
    	systemState:[{
    		label:'显示',
    		value:0
    	},{
    		label:'隐藏',
    		value:1
    	}],
    	userState:[{
    		label:'显示',
    		value:0
    	},{
    		label:'隐藏',
    		value:1
    	}],
    	fileUpload:{   //附件上传
          file:null
        },
    }
  },
  methods:{
  	commit(){
  		const loading = this.$loading(this.$store.state.loading);
  		let id=Base64.decode(this.GetCookie('id'));
  		if(this.$route.query.data!=undefined){//数据回显提交
  			this.$CPOST('/menu/updateUmenu',{
  				menuId:this.menuId,
  				menuName:this.info.name,
  				menuStatus:this.info.systemStateName,
  				menuUrl:this.info.href,
  				userId:id,
  				extend1:id==1?1:2,
  				extend2:this.id,//0公共区域，1个人区域
  				extend3:id,
  				menuSort:this.info.num,
  				menuPictureUrl:this.info.imageUrl,
  				oneSelfStatus:this.info.userStateName,//个人系统菜单
  				oneSelfSort:this.info.userNum
  			},(res)=>{
  				loading.close();
  				if(res.code==200){
  					this.$router.push({path:'/menu'})
  				}else{
  					MessageBox('提示',res.msg)
  				}
  			})
  		}else{//普通提交
  			this.$CPOST('/menu/addUmenu',{
  				menuName:this.info.name,
  				menuStatus:this.info.systemStateName,
  				menuUrl:this.info.href,
  				userId:id,
  				extend1:id==1?1:2,
  				extend2:this.id,//0公共区域，1个人区域
  				extend3:id,
  				menuSort:this.info.num,
  				menuPictureUrl:this.info.imageUrl,
  				oneSelfStatus:this.info.userStateName,//个人系统菜单
  				oneSelfSort:this.info.userNum
  			},(res)=>{
  				loading.close();
  				if(res.code==200){
  					this.$router.push({path:'/menu'})
  				}else{
  					MessageBox('提示',res.msg)
  				}
  			})
  		}
  		
  	},
  	httpRequest(){
  	  let fd = new FormData();
  	  fd.append('file', this.fileUpload.file)
  	  this.$CZC('/file/upload',fd,(res)=>{
  	    this.info.imageUrl=res.data;
  	  })
  	},
  	fileBefore (file) {
      this.fileUpload.file=file;
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
	      MessageBox('提示', '上传图片大小不能超过 1MB!');
	    }
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
	.upload{
		display: flex;
		padding: 0 10px;
	}
	.upload span{
		display: inline-block;
		height: 40px;
		line-height: 40px;
	}
	.addmenu-list div{
		display: flex;
		height: 40px;
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
	/*#DCDFE6*/
	.addmenu-list div input{
		border:none !important;
	}
	.commit{
		padding: 0 10px;
		margin-top: 30px;
	}
	.commit button{
		width: 100%;
	}
</style>
