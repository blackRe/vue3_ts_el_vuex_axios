<template>
	<div class="Menu">
		<imgUp></imgUp>
		<el-row :gutter="24" style="margin-bottom: 20px;">
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<leftView></leftView>
				</div>
			</el-col>

			<el-col :span="18">
				<div class="rightContent">
					<div class="rList">用户列表</div>
					<div class="grid-content bg-purple">
						<el-table :data="tableData" style="width: 100%">
							<el-table-column prop="date" label="日期">
							</el-table-column>
							<el-table-column prop="name" label="姓名">
							</el-table-column>
							<el-table-column prop="address" label="地址">
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-col>

		</el-row>

	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue
	} from 'vue-property-decorator';
	import leftView from '@/views/common/left.vue'; // @ is an alias to /src
	import imgUp from '@/views/common/imgUp.vue'; // @ is an alias to /src

	@Component({
		components: {
			leftView,
			imgUp
		},
		computed: {

			// vuex使用对象展开运算符将 state 混入当前组件
			...mapState([ //
				'userObj'
			])

		},
	})
	export default class Menu extends Vue {
		data() {

			return {

				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
		}


		getLogin(): void {
			let vm = this;
			let userId = ''
			let data = {
				name: vm.ruleForm.Login,
				pwd: vm.ruleForm.pwd,
				yzm: vm.ruleForm.yzm
			}
			// this.$axios({
			// 	url: vm.$ajaxUrl.login+'?'+qs.stringify(params),
			// 	method: 'get',
			vm.$axios({
				url: vm.$ajaxUrl.userList,
				method: 'post',
				data: qs.stringify(data)
			}).then((res) => {
				console.log(res.data.code, 'res')
				let code = res.data.code
				if (code == 200) {

					this.$store.commit('userSet', res.data.data)

					vm.$router.push('/')
					vm.$message({
						message: '登录成功',
						type: 'success'
					});

				} else {
					vm.$message.error('错了哦，这是一条错误消息');
				}
				vm.getSvg()

			}, (error) => {
				vm.getSvg()
				console.log(error);
			});
		}

	}
</script>
<style scoped="scoped" lang="less">
	.Menu {
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
