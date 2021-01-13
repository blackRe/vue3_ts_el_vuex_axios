<template>
	<div class="haerderView">
		<div class="heContent">
			<el-row>
				<el-col :span="12">
					<div class="grid-content ">
						后台管理系统
					</div>
				</el-col>
				<el-col :span="12">
					<div class="grid-content textR">
						用户
					</div>
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
	// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

	@Component({
		components: {
			// HelloWorld,
		},
	})
	export default class haerderView extends Vue {

	}
</script>
<style scoped="scoped" lang="less">
	.haerderView {

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
			}

			.row-bg {
				padding: 10px 0;
				background-color: #f9fafc;
			}
		}
	}
</style>
