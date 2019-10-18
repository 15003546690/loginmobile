<template>
  <div class="organization">
    <mt-header fixed title="组织架构管理" style='z-index: 999'>
      <router-link to="/my" slot="left" style='font-size: 12px;'>
          <mt-button icon="back" style='color: #fff;'>返回</mt-button>
      </router-link>
    </mt-header>
    <div class="organization-btnG">
      <el-button type='primary'>添加节点</el-button>
      <el-button type='primary'>修改节点</el-button>
      <el-button type='primary'>删除节点</el-button>
    </div>
  </div>
</template>

<script>
export default {
	created(){
	},
  data () {
    return {
    }
  },
  methods:{
  }
}
</script>


<style scoped>
  .organization-btnG{
    display: flex;
    padding:0 10px;
  }
  .organization-btnG button{
    flex: 1;
  }
</style>
