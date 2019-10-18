<template>
  <div class="parent">
    <mt-header fixed title="统一角色管理" style='z-index: 999'>
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
    <div class='parent-menu'>
      <div v-for='(i,idx) in list' @click='iconChange(idx,i)' :class="active==idx?'active':''">{{i.name}}</div>
    </div>
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
      bGroup:0,
      active:8888,
      list:[],
      listName:'',
    }
  },
  methods:{
    iconChange(idx,i){
      this.active=idx;
      this.listName=i.name;
    },
    currentData(){
      this.list=[];
      const loading = this.$loading(this.$store.state.loading);
      this.$CPOST('/urole/findAllUrole',{
      },(res)=>{
        loading.close();
        let data=res.data;
        for(let i=0;i<data.length;i++){
          this.list.push({
            id:data[i].uroleId,
            name:data[i].uroleName
          })
        }
      })
    },
    btnGroup(id){
      if(id==0){
        this.bGroup=0;
        this.$router.push({path:'/parent/addparent'})
      }else if(id==1){
        this.bGroup=1;
        this.$router.push({path:'/parent/addparent',query:{uroleId:this.list[this.active].id}})
      }else{
        this.bGroup=2;
        if(this.listName=='admin'||this.listName=='user'){
          MessageBox('提示','系统默认角色无法删除')
        }else{
          MessageBox.confirm('是否确认删除').then(action => {
            this.$CPOST('/urole/delUrole',{
              uroleId:this.list[this.active].id
            },(res)=>{
              this.currentData();
              this.active=8888;
              this.bGroup=0;
            })
          });
        }
      }
    },
  }
}
</script>
<style scoped>
  .menu-btnGroup{
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
  }
  .menu-btnGroup button{
    border-radius: 0;
    
  }
  .parent-menu{
    display: flex;
    flex-wrap: wrap;
  }
  .parent-menu div{
    margin: 10px 4.5%;
    width: 40%;
    height: 50px;
    border:solid 1px #ccc;
    text-align: center;
    line-height: 50px;
  }
  .active{
    box-shadow: 10px 10px 5px #888888;
        background: #f2f2f2;
  }
</style>
