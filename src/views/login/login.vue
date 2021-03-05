<template>
	<div class="Login">
		<el-row :gutter="20" style="margin-bottom: 20px;">
			<el-col :span="12" :offset="6">
				<div class="grid-content bg-purple">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="用户名" prop="Login">
							<el-input v-model="ruleForm.Login" placeholder="请输入手机号"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="pwd">
							<el-input v-model="ruleForm.pwd" placeholder="请输入密码"></el-input>
						</el-form-item>
						<el-form-item class="vInput" label="验证码" prop="yzm">
							<el-input v-model="ruleForm.yzm" placeholder="请输入验证码"></el-input>
							<div class="vCode" v-html="svgImg" @click="getSvg()"> </div>
							{{count}},{{$store.state.count}},{{ids}}
						</el-form-item>
						<el-form-item>
							<el-button style="width: 430px;" type="primary" @click="submitForm('ruleForm')">登录</el-button>
							<!-- 	<el-button @click="resetForm('ruleForm')">重置</el-button> -->
						</el-form-item>
						<div ><span class="reSw r"  @click="reSet()">注册</span></div>
					</el-form>
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
	// import { rootState } from '@store/index1.ts';

	import {
		Getter,
		Action
	} from "vuex-class";
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'

	@Component({
		components: {
			leftView
		},
		created() {

			this.getSvg()

		},
		computed: {

			// vuex使用对象展开运算符将 state 混入当前组件
			...mapState([ //mapState本是一个函数，在里面写一个数组，记得加...
				'count',
				'ids'
			])

		},

	})
	export default class Login extends Vue {
		// ts变量申明方法,同时也支持在data中申明变量，如适用ts方法需要在方法前加入:void，否则变量为空，会在console.log下报错
		svgImg: string = '';
		data() {
			return {
				// svgImg:'',
				ruleForm: {
					Login: '',
					pwd: '',
					yzm: '',
					delivery: false,

				},
				rules: {
					Login: [{
							required: true,
							message: '请输入正确的名称或手机号',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 11,
							message: '请输入正确的名称或手机号',
							trigger: 'blur'
						}
					],
					pwd: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							message: '密码长度在6个字符以上',
							trigger: 'blur'
						}
					],
					yzm: [{
							required: true,
							message: '请输入验证码',
							trigger: 'blur'
						},
						{
							min: 4,
							max: 4,
							message: '验证码长度在4个字符',
							trigger: 'blur'
						}
					],

				}
			}
		}

		// ...mapActions(['add', 'incrementIdStep'])
		reSet():void{
			this.$router.push('/setUser')
		}
		test() {
			// 以计算属性的形式使用 state
			console.log(this.count);
		}
		getLogin() {
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
				url: vm.$ajaxUrl.login,
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
					vm.$message.error(res.data.msg);
				}
				vm.getSvg()

			}, (error) => {
				vm.getSvg()
				console.log(error);
			});
		}
		getSvg(): void {
			let vm = this;
			let userId = ''

			let params = {}
			vm.$axios({
				url: vm.$ajaxUrl.svg,
				method: 'get',
			}).then((res) => {
				// console.log(res.data.img,'日志图片')
				// 内部使用可忽略
				vm.svgImg = res.data.img;
			}, (error) => {
				console.log(error);
			});
		}
		submitForm(formLogin) {
			// 同步调用
			this.$store.commit('increment', 22)
			// 异步调用
			this.$store.dispatch('incrementIdStep')



			// this.increment(11)
			this.$refs[formLogin].validate((valid) => {
				if (valid) {
					// alert('submit!');
					this.getLogin()
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
		resetForm(formLogin) {
			this.$refs[formLogin].resetFields();
		}
	}
</script>
<style scoped="scoped" lang="less">
	.Login {
		// border: 1px solid red;
		// background-color: #fff;

			.reSw{
				cursor: pointer;
			}

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

		.bg-purple {
			background: #fff;
			padding: 50px 100px 50px 80px;
		}

		.vInput {
			position: relative;

			.vCode {
				cursor: pointer;
				width: 160px;
				height: 38px;
				position: absolute;
				top: 1px;
				right: 1px;
				padding: 2px 5px;
				background: #eee;
			}
		}

	}
</style>
