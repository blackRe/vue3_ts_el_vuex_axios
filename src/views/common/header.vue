<template>
	<div class="haerderView">
		<div class="heContent">
			<el-row>
				<el-col :span="12">
					<div class="grid-content ">
						后台管理系统
					</div>
				</el-col>
				<el-col :span="12" v-if="userObj.name">
					<div class="grid-content textR">
						</div> 欢迎您:{{userObj.name}}
						<div class="userImg r" :style="{backgroundImage: 'url(' +userObj.imageUrl + ')'}"></div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue
	} from 'vue-property-decorator';
	import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
	
	// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

	@Component({
		components: {
			// HelloWorld,
		},
		computed: {
		   
		   // vuex使用对象展开运算符将 state 混入当前组件
		     ...mapState([        //
		     'userObj'
		     ])
					 
		 },
		created() {
			console.log()
			// this.getSvg()
			// this.userData=this.userObj
		},
	})
	export default class haerderView extends Vue {
		userData:Any='';
	}
</script>
<style scoped="scoped" lang="less">
	.haerderView {
			.userImg{
				width: 36px;
				height: 36px;
				border-radius: 50%;
				overflow: hidden;
				border: 1px solid #e5e5e5;
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center center;
			}
		width: 100%;
		background: #fff;
		.heContent {
			width: 100%;
			border-bottom: 1px solid #eee;
			margin-bottom: 20px;

			.el-row {
				margin-bottom: 20px;

				&:last-child {
					margin-bottom: 0;
				}
			}

			.el-col {
				border-radius: 4px;
			}

			.bg-purple-dark {
				background: #99a9bf;
			}

			.bg-purple {
				background: #d3dce6;
			}

			.bg-purple-light {
				background: #e5e9f2;
			}

			.grid-content {
				border-radius: 4px;
				min-height: 36px;
				line-height: 36px;
			}

			.textR {
				text-align: right;
				padding-right: 20px;
			}

			.row-bg {
				padding: 10px 0;
				background-color: #f9fafc;
			}
		}
	}
</style>
