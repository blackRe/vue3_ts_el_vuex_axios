<template>
  <div class="footerView">
	  
   <el-row>
     <el-col :span="24">
		 <div class="grid-content bg-purple-dark">
	 项目联系电话：13162305067
	 </div></el-col>
   </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    // HelloWorld,
  },
})
export default class footerView extends Vue {
	
}
</script>
<style scoped="scoped" lang="less">
	.footerView{
		
		text-align: center;
		background: #fff;
		padding: 20px;
	}
</style>
