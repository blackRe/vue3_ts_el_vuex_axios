<template>
	<div class="setUser">
		<el-row :gutter="20" style="margin-bottom: 20px;">
			<el-col :span="12" :offset="6">
				<div class="grid-content bg-purple">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="用户名" prop="Login">
							<el-input v-model="ruleForm.Login" placeholder="请输入用户名"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="phone">
							<el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="pwd">
							<el-input v-model="ruleForm.pwd" placeholder="请输入密码"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="pwd1">
							<el-input v-model="ruleForm.pwd1" placeholder="请再次输入密码"></el-input>
						</el-form-item>
						<el-form-item label="上传头像">
							<el-upload class="avatar-uploader" name='avatar' :action="$ajaxUrl.profile1" 
							:show-file-list="false"
							
							 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>

						<el-form-item class="vInput" label="验证码" prop="yzm">
							<el-input v-model="ruleForm.yzm" placeholder="请输入验证码"></el-input>
							<div class="vCode" v-html="svgImg" @click="getSvg()"> </div>
							{{count}},{{$store.state.count}},{{ids}}
						</el-form-item>
						<el-form-item>
							<el-button style="width: 290px;" type="primary" @click="submitForm('ruleForm')">登录</el-button>
							<!-- 	<el-button @click="resetForm('ruleForm')">重置</el-button> -->
						</el-form-item>
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
	import imgUp from '@/views/common/imgUp.vue';
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
			leftView,
			imgUp
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
	export default class setUser extends Vue {
		// ts变量申明方法,同时也支持在data中申明变量，如适用ts方法需要在方法前加入:void，否则变量为空，会在console.log下报错
		svgImg: string = '';
		imageUrl: string = ''
		data() {
			return {
				// svgImg:'',
				ruleForm: {
					Login: '',
					pwd: '',
					yzm: '',
					pwd1: '',
					email: '',
					delivery: false,

				},
				rules: {
					Login: [{
							required: true,
							message: '请输入正确的名称或手机号',
							trigger: 'change'
						},
						{
							min: 2,
							max: 11,
							message: '请输入正确的名称或手机号',
							trigger: 'change'
						}
					],
					pwd: [{
							required: true,
							message: '请输入密码',
							trigger: 'change'
						},
						{
							min: 6,
							message: '密码长度在6个字符以上',
							trigger: 'change'
						}
					],
					pwd1: [{
							required: true,
							message: '请输入密码',
							trigger: 'change'
						},
						{
							min: 6,
							message: '密码长度在6个字符以上',
							trigger: 'change'
						}
					],
					pwd1: [{
							required: true,
							message: '请输入密码',
							trigger: 'change'
						},
						{
							min: 6,
							message: '密码长度在6个字符以上',
							trigger: 'blur'
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							min: 1,
							message: '邮箱格式不正确',
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


		handleAvatarSuccess(res, file): void {
			console.log(file.raw,res,'file.raw')
			// this.imageUrl = URL.createObjectURL(file.raw);
			if(res.code==200){
				// 线上图片
				this.imageUrl=res.fileUrl
			}else{
				// 路径加bold
				//this.imageUrl = URL.createObjectURL(file.raw);
			}
			
		}
		beforeAvatarUpload(file): void {
			
			const isJPG = (file.type === 'image/jpeg'||file.type === 'image/png');
			const isLt2M = file.size / 1024 / 1024 < 8;

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 8MB!');
			}
			return isJPG && isLt2M;
		}

		// ...mapActions(['add', 'incrementIdStep'])
		test() {
			// 以计算属性的形式使用 state
			console.log(this.count);
		}
		getLogin(): void {
			let vm = this;
			let userId = ''
			let data = {
				name: vm.ruleForm.Login,
				pwd: vm.ruleForm.pwd,
				phone: vm.ruleForm.phone,
				email: vm.ruleForm.email,
				imageUrl:vm.imageUrl,
				yzm: vm.ruleForm.yzm
			}
			// this.$axios({
			// 	url: vm.$ajaxUrl.login+'?'+qs.stringify(params),
			// 	method: 'get',
			vm.$axios({
				url: vm.$ajaxUrl.setUser,
				method: 'post',
				data: qs.stringify(data)
			}).then((res) => {
				console.log(res.data.code, 'res')
				let code = res.data.code
				if (code == 200) {

					vm.$store.commit('userSet', res.data.data)
					vm.$message({
						message: '注册成功',
						type: 'success'
					});
					vm.$router.push('/')
					

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
			let vm = this;
			this.$store.commit('increment', 22)
			// 异步调用
			this.$store.dispatch('incrementIdStep')

			if (vm.ruleForm.pwd != vm.ruleForm.pwd1) {
				vm.$message.error('两次输入的密码不一致');
				return false;
			}

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
	.setUser {
		// border: 1px solid red;
		// background-color: #fff;

		/deep/.avatar-uploader .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}
		
		/deep/.avatar-uploader .el-upload:hover {
			border-color: #409EFF;
		}
		
		/deep/.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 178px;
			height: 178px;
			line-height: 178px;
			text-align: center;
		}
		
		/deep/.avatar {
			width: 178px;
			height: 178px;
			display: block;
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
