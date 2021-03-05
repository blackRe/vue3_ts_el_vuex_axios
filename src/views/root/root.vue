<template>
	<div class="Root">
		<!-- 子组件 -->
		<!-- :parent-value="msg"父传子 -->
		<!-- @handle-to-parent1="handleChildValue" 子传父，接收 -->
		<loading :parent-value="msg" @handle-to-parent1="handleChildValue" @test="handleChildValue" @handle-to-parent3="handleChildValue"></loading>
		<!-- 接收到子级传值 -->
		<div>子传父的值：{{childValue}}</div>
		<!-- <imgUp></imgUp> -->
		<el-row :gutter="24" style="margin-bottom: 20px;">
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<leftView></leftView>
				</div>
			</el-col>

			<el-col :span="18">
				<div class="rightContent">
					<div class="rList">权限列表</div>
					<div class="grid-content bg-purple">
						<el-table :data="tableData" style="width: 100%">
							<el-table-column prop="name" label="姓名">
							</el-table-column>
							<el-table-column prop="phone" label="电话">
							</el-table-column>
							<el-table-column prop="email" label="邮箱">
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-col>

		</el-row>

	</div>
</template>

<script lang="ts">
	import qs from 'qs'
	import {
		Component,
		Vue
	} from 'vue-property-decorator';
	import leftView from '@/views/common/left.vue'; // @ is an alias to /src
	import imgUp from '@/views/common/imgUp.vue'; // @ is an alias to /src
	import loading from '@/views/common/loading.vue'; // @ is an alias to /src
	import commonFun from '../../assets/js/commonFun'
	 @Component({
		components: {
			leftView,
			imgUp,
			loading
		},
		created() {

			this.getLogin()

		}
	})
	export default class Root extends Vue {
		
		
		//传给子组件的值
		private msg: string = "没看错，我在加载中....（传给子组件的值）"
		tableData: object = []
		data() {
			return {


			}
		}
		// 子传父,接收
		// 处理子组件传过来的值 val：是自定义的
		/*
		public 公共的，public表明该数据成员、成员函数是对所有用户开放的，所有用户都可以直接进行调用，在程序的任何其它地方访问。
		private  私有的，
		private表示私有，私有的意思就是除了class自己之外，其他都不可以使用。和public相反，加上这个修饰的属性和方法，只允许在自己本身这个类里访问，程序的任何其它地方都不能访问
		protected  受保护的*/
		private childValue: string = "";
		private handleChildValue(val: string) {
			// val: 子组件传过来的值
			this.childValue = val;
			alert('接收到数据')
		}

		getLogin(): void {
			let vm = this;
			let userId = ''
			let data = {
				id: '',
			}
			// this.$axios({
			// 	url: vm.$ajaxUrl.login+'?'+qs.stringify(params),
			// 	method: 'get',
			vm.$axios({
				url: vm.$ajaxUrl.userList,
				method: 'post',
				data: qs.stringify(data)
			}).then((res) => {
				console.log(res.data.data, 'res')
				let code = res.data.code
				if (code == 200) {
					vm.tableData = res.data.data
					// 			this.$store.commit('userSet', res.data.data)
					// 			vm.$message({
					// 				message: '登录成功',
					// 				type: 'success'
					// 			});

				} else {
					vm.$message.error(res.data.msg);
				}


			}, (error) => {

				console.log(error);
			});
		}




	}
</script>
<style scoped="scoped" lang="less">
	.Root {
		// border: 1px solid red;
		// background-color: #fff;



		// width: 1200px;
		// height: 200px;
		// border: 10px solid orange;
		.el-header {
			background-color: #B3C0D1;
			color: #333;
			line-height: 60px;
		}

		.el-aside {
			color: #333;
		}

		.rightContent {
			padding: 20px;
			background: #fff;

			.rList {
				background: #fff;
				padding-left: 10px;
			}
		}

	}
</style>
