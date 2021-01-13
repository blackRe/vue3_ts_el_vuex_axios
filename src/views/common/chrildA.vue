<template>
	<div class="chrildA">
		<div class="v_search_form">
			<el-input :value="formInline.date" placeholder="请输入内容"></el-input>
			<el-input :value="formInline.user" placeholder="请输入内容"></el-input>
			<!-- <el-input :value="formInline.age" placeholder="请输入内容"></el-input> -->
			
		
		</div>
	</div>
</template>
<script lang="ts">
	import {
		Component,
		Vue,
		Watch
	} from "vue-property-decorator";
	import {
		Getter,
		Action
	} from "vuex-class";

	@Component
	export default class chrildA extends Vue {
		// 默认data数据
		formInline: Object = {
			date: [],
			user: "",
			age:''
		};
		// ruleInline: Object = {
		// 	user: [{
		// 		required: true,
		// 		message: "Please fill in the user name",
		// 		trigger: "blur"
		// 	}]
		// };
		setDateOptions = {
			disabledDate(date: Date) {
				return date && date.valueOf() > Date.now();
			}
		};

		// 原computed中的...mapGetters ; @Getter 和 @Action 对应的值都需要非空
		@Getter("date") public date!: Date[];
		@Getter("name") public name!: string;
		@Getter("name") public age!: number;
		// 原methods中的...mapActions
		@Action("setStateData") public setStateData!: Function;

		// // 原watch
		// @Watch('date', { immediate: true, deep: true })
		// watchDateChange(newVal, oldVal): void {
		//   console.log('==============watchDateChange======================');
		//   console.log(newVal, oldVal);
		//   console.log('====================================');
		// }

		// 默认生命周期
		private created(): void {
			this.initDateAndOther();
		}

		// 默认methods
		public handleSearch(formName: string): void {
			console.log("====================================");
			console.log(this.$refs[formName]);
			console.log(this.$refs[formName].model);
			console.log("====================================");
		}

		/**
		 * 修改input输入框user时
		 */
		public inputChange($val: any): void {
			console.log('==============inputChange======================');
			console.log(this.formInline.user, $val, arguments);
			console.log('====================================');
			this.setStateData({
				key: 'name',
				value: this.formInline.user
			})
			console.log('this.name---------', this.name)
		}

		/**
		 * 修改日期数据时
		 */
		public dateChange($val: Date[]): void {
			console.log('================dateChange====================');
			console.log(this.formInline.date, $val, arguments);
			console.log('====================================');
			this.setStateData({
				key: 'date',
				value: $val
			})
			console.log('this.date---------', this.date)
		}

		/**
		 * 初始化数据，根据store的state数据变化
		 */
		public initDateAndOther(): void {
			console.log('initDateAndOther---------', this.name)
			console.log('initDateAndOther---------', this.date)
			if (this.name) {
				this.formInline.user = this.name;
			}
			if (this.date && this.date.length) {
				this.formInline.date = this.date;
			}
		}

	}
</script>
<style lang="less" scoped="scoped">
	
	.v_search_form {
		padding-left: 10px;
		margin-bottom: 5px;

		.ivu-date-picker-editor {
			width: 206px;
		}
	}
</style>
