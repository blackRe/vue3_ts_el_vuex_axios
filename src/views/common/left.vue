<template>

	<div class="leftView">
		<el-input
		  placeholder="输入关键字进行过滤"
		  v-model="filterText">
		</el-input>
		<el-tree
		  class="filter-tree"
		  :data="data"
		  :props="defaultProps"
		  default-expand-all
		  :filter-node-method="filterNode"
		  @node-click='handleNodeClick'
		  ref="tree">
		</el-tree>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue
	} from 'vue-property-decorator';
	// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

	@Component({
		components: {
			// HelloWorld,
		},
		// 生命周期,父子传值都在这里面
		watch: {
		      filterText(val) {
		        this.$refs.tree.filter(val);
		      }
		    }
	})
	
	
	
	export default class leftView extends Vue {
		
		data() {
			return {
				filterText: '',
				        data: [{
				          id: '1',
				          label: '系统管理',
				          children: [{
				            id: '1-1',
				            label: '菜单管理',
							url:'baidu.com'
				          },
						  {
						    id: '1-2',
						    label: '字典表',
						  	url:'baidu.com'
						  }
						  ]
				        }, {
				          id: '2',
				          label: '用户管理',
				          children: [{
				            id: '2-1',
				            label: '用户新增'
				          }, {
				            id: '2-2',
				            label: '用户列表'
				          }]
				        }, {
				          id: '3',
				          label: '统计汇总',
				          children: [{
				            id: '3-1',
				            label: '二级 3-1'
				          }, {
				            id: '3-2',
				            label: '二级 3-2'
				          }]
				        }],
				        defaultProps: {
				          children: 'children',
				          label: 'label'
				        }
			}
		}
		
		// 调用方法
		
		 filterNode(value, data):void {
		         if (!value) return true;
		         return data.label.indexOf(value) !== -1;
		       }
			   handleNodeClick(node,data,value):void{
				    console.log(node)
				     //          console.log(data)
							  // console.log(value)
			   }
	}
</script>
<style scoped="scoped" lang="less">
	.leftView {
		
		// background: #fff;
		margin-bottom: 20px;
	}
</style>
