<template>
  <div class="menu">
    <mt-header fixed title="菜单管理" style='z-index: 999'>
		<router-link to="/my" slot="left" style='font-size: 12px;'>
		    <mt-button icon="back" style='color: #fff;'>返回</mt-button>
		</router-link>
	</mt-header>
	<div class="menu-btnGroup">
		<el-button-group>
		  <el-button :type="bGroup==0?'primary':''" icon="el-icon-circle-plus" @click='btnGroup(0)'></el-button>
		  <el-button :type="bGroup==1?'primary':''" icon="el-icon-edit" @click='btnGroup(1)' :disabled="active==8888?true:false"></el-button>
		  <el-button :type="bGroup==2?'primary':''" icon="el-icon-delete" @click='btnGroup(2)' :disabled="active==8888?true:false"></el-button>
		</el-button-group>
	</div>
	<div class="menu-tab">
    <div class='index-menu' v-if='!isAdmin' style="margin-top: 30px;">
      <div v-for='(i,idx) in userList' @click='iconChange(idx)' :class="active==idx?'active':''">
        <dl>
          <dt><img :src="i.img" alt=""></dt>
          <dd>{{i.name}}</dd>
        </dl>
      </div>
    </div>
		<el-tabs  v-model="activeName" @tab-click="handleClick" v-if='isAdmin'>
		    <el-tab-pane label="公共菜单" name="0">
		    	<div class='index-menu'>
					<div v-for='(i,idx) in list' @click='iconChange(idx)' :class="active==idx?'active':''">
				        <dl>
				          <dt><img :src="i.img" alt=""></dt>
				          <dd>{{i.name}}</dd>
				        </dl>
				      </div>
			     </div>
		    </el-tab-pane>
		    <el-tab-pane label="个人菜单" name="1">
				<div class='index-menu'>
					<div v-for='(i,idx) in userList' @click='iconChange(idx)' :class="active==idx?'active':''">
				        <dl>
				          <dt><img :src="i.img" alt=""></dt>
				          <dd>{{i.name}}</dd>
				        </dl>
				      </div>
			     </div>
		    </el-tab-pane>
		</el-tabs>
	</div>
  </div>
</template>

<script>
import { MessageBox} from 'mint-ui';
export default {
	created(){
		this.currentData();
    if(this.GetCookie('uroleName')=='admin'){
      this.isAdmin=true;
    }else{
      this.isAdmin=false;
      this.activeName=1;
    }
	},
  data () {
    return {
      isAdmin:true,
    	active:8888,
    	activeName:'0',
    	bGroup:0,
    	list:[],
    	userList:[],
    }
  },
  methods:{
  	iconChange(idx){
  		this.active=idx;
  	},
  	currentData(){
  		const loading = this.$loading(this.$store.state.loading);
  		//公共菜单
  		this.$CGET('/menu/findPublishMenu',{
  			fromType:'1'
  		},(res)=>{
  			this.list=[];
  			loading.close();
  			let data=res.data;
  			if(res.code==200){
  				for(let i=0;i<data.length;i++){
  					this.list.push({
  						id:data[i].menuId,
  						name:data[i].menuName,
  						img:data[i].menuPictureUrl,
  						url:data[i].menuUrl,
  						extend1:data[i].extend1,//1管理员2用户
  						extend2:data[i].extend2,//0公共区域1个人区域
  						extend3:data[i].extend3,//userId
  						menuSort:data[i].menuSort,
  						oneSelfSort:data[i].oneSelfSort,
  						menuStatus:data[i].menuStatus,
  						oneSelfStatus:data[i].oneSelfStatus
  					})
  				}
  				
  			}else{
  				MessageBox('提示', res.msg);
  			}
  		})
  		//个人菜单
  		this.$CGET('/menu/findOneselfMenu',{
  			fromType:'1'
  		},(res)=>{
  			this.userList=[];
  			loading.close();
  			let data=res.data;
  			if(res.code==200){
  				for(let i=0;i<data.length;i++){
  					this.userList.push({
  						id:data[i].menuId,
  						name:data[i].menuName,
  						img:data[i].menuPictureUrl,
  						url:data[i].menuUrl,
  						extend1:data[i].extend1,//1管理员2用户
  						extend2:data[i].extend2,//0公共区域1个人区域
  						extend3:data[i].extend3,//userId
  						menuSort:data[i].menuSort,
  						oneSelfSort:data[i].oneSelfSort,
  						menuStatus:data[i].menuStatus,
  						oneSelfStatus:data[i].oneSelfStatus
  					})
  				}
  				
  			}else{
  				MessageBox('提示', res.msg);
  			}
  		})
  	},
  	btnGroup(id){
  		if(id==0){
  			this.bGroup=0;
  			this.$router.push({path:'/menu/addmenu',query:{activeName:this.activeName}})
  		}else if(id==1){
  			this.bGroup=1;
  			if(this.activeName==0){
  				this.$router.push({path:'/menu/addmenu',query:{activeName:this.activeName,data:this.list[this.active]}})
  			}else if(this.activeName==1){
  				this.$router.push({path:'/menu/addmenu',query:{activeName:this.activeName,data:this.userList[this.active]}})
  			}
  			
  		}else{
  			this.bGroup=2;
  			if(this.activeName==0){
  				MessageBox.confirm('是否确认删除').then(action => {
  				  this.$CPOST('/menu/delUmenu',{
  				  	menuId:this.list[this.active].id
  				  },(res)=>{
  				  	this.currentData();
  				  	this.active=8888;
  				  })
  				});
  			}else if(this.activeName==1){
  				MessageBox.confirm('是否确认删除').then(action => {
  				  this.$CPOST('/menu/delUmenu',{
  				  	menuId:this.userList[this.active].id
  				  },(res)=>{
  				  	this.currentData();
  				  	this.active=8888;
  				  })
  				});
  			}
  		}
  	},
  	handleClick(tab, event){
  		this.active=8888;
  	}
  }
}
</script>


<style scoped>
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
	.index-menu{
    display: flex;
    flex-wrap: wrap;
    /*justify-content: space-around; */
  }
  .index-menu div{

    width: 33.3333%;
    height: 100px;
    margin-bottom: 0px;
    margin-bottom: 5px;
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
</style>
