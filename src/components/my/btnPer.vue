<template>
  <div class="btnPer">
    <mt-header fixed title="按钮权限" style='z-index: 999'>
      <router-link to="/son" slot="left" style='font-size: 12px;'>
          <mt-button icon="back" style='color: #fff;'>返回</mt-button>
      </router-link>
    </mt-header>
    <div class="btnPer-list">
        <div v-for='(i,idx) in list' class="btnPerL-list">
          <p>{{i.name}}</p>
          <div>
            <el-checkbox :label="j.user" v-for='(j,jdx) in i.child' @change='checkChange(idx,jdx)' v-model='j.isCheck' :key='j'></el-checkbox>
          </div>
        </div>
    </div>
    <div class="commit" @click='commit' v-if='list.length!=0'><el-button type='primary'>提交</el-button></div>
    <div class="btnPer-none" v-else>
      暂无按钮权限
    </div>
  </div>
</template>

<script>
import { MessageBox} from 'mint-ui';
export default {
	created(){
    this.upData();
	},
  data () {
    return {
      checkList:[],
      menuId:this.$route.query.menuId,
      roleId:this.$route.query.roleId,
      list:[]
    }
  },
  methods:{
    commit(){
      let arr=[];
      for(let i=0;i<this.list.length;i++){
        let child=this.list[i].child;
        for(let j=0;j<child.length;j++){
          arr.push({
            zcUser:child[j].user,
            zcName:this.list[i].name,
            type:child[j].type,
            name:child[j].name,
            ischeck:child[j].isCheck
          })
        }
      }
      this.$CPOST('/roleSub/addRoleSubperRef',{
        roleId:this.roleId,
        content:JSON.stringify(arr)
      },(res)=>{
        if(res.code==200){
          this.$router.push({path:'/son'})
        }else{
          MessageBox('提示',res.msg)
        }
      })
    },
    checkChange(i,j){
      // this.list[i].child[j].isCheck=!this.list[i].child[j].isCheck;
    },
    currentData(){
      this.$CPOST('/roleSub/findSubPerByMenuId',{
        menuId:this.menuId
      },(res)=>{
        let data=res.data,arr=[];
        for(let i=0;i<data.length;i++){
          arr.push(data[i].extend2)
        }
        let r = arr.filter(function(element,index,self){
           return self.indexOf(element) === index;
        });
        for(let i=0;i<r.length;i++){
          this.list.push({
            name:r[i],
            child:[]
          })
        }
        for(let j=0;j<data.length;j++){
          for(let z=0;z<this.list.length;z++){
            if(data[j].extend2==this.list[z].name){
              this.list[z].child.push({
                user:data[j].subPermissionName,
                type:data[j].extend1,
                name:data[j].subPermissionCode,
                isCheck:false
              })
            }
          }
        }
      })
    },
    upData(){
      const loading = this.$loading(this.$store.state.loading);
      this.$CPOST('/roleSub/findRoleSubperRef',{
        roleId:this.roleId
      },(res)=>{
        loading.close();
        if(res.data[0].content!='add,del'){
          this.list=[];
          let data=JSON.parse(res.data[0].content),arr=[];
          for(let i=0;i<data.length;i++){
            arr.push(data[i].zcName)
          }
          let r = arr.filter(function(element,index,self){
             return self.indexOf(element) === index;
          });
          for(let i=0;i<r.length;i++){
            this.list.push({
              name:r[i],
              child:[]
            })
          }
          for(let j=0;j<data.length;j++){
            for(let z=0;z<this.list.length;z++){
              if(data[j].zcName==this.list[z].name){
                this.list[z].child.push({
                  user:data[j].zcUser,
                  type:data[j].type,
                  name:data[j].name,
                  isCheck:data[j].ischeck
                })
              }
            }
          }
        }else{
          this.currentData();
        }
      })
    }
  }
}
</script>


<style scoped>
  .btnPer-list{
    padding:10px;
  }
  .btnPerL-list{
    margin-bottom: 10px;
  }
  .btnPerL-list p{
    line-height: 26px;
  }
  .commit{
    padding: 0 10px;
    margin-top: 30px;
  }
  .commit button{
    width: 100%;
  }
  .btnPer-none{
    color: #ccc;
    position: absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%)
  }
</style>
