<template>
	<div class="loadingModel" v-if="loading">
		<div class="laoding"><i class="el-icon-loading"></i>{{parentValue}}</div>
		<div class="container">
		        <!-- 方法一: 直接调用@Emit -->
		        <button @click="handleToParent1">向父组件传值1</button>
		        <!-- 方法二: 直接调用@Emit -->
		        <button @click="handleToParent2">向父组件传值2</button>
		        <!-- 方法三: 间接调用 -->
		        <button @click="handleClickEvent">向父组件传值3</button>
		    </div>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Prop,//子组件需要引入，接受父组件传入的值
		Emit//将子组件的值传回父组件
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
		// 子传父
		@Prop(String)    // 括号里为父组件传来的值的类型
		    private parentValue: string; // 父组件传来的值用parentValue接收
			
			// 父传子
			private msgPath: string = "要传递给父组件的值(klp)";
			   // 方法一
			      @Emit()    
			      private handleToParent1() {
					  this.loading=false
			          return this.msgPath;    // return将要传递的值
			      }
			   
			      // 方法二: 注意，这时父组件接收值时是用@Emit("test")括号中的test接收的，test会把正面的方法名字覆盖。（test）是自定义的
			      @Emit("test")    
			      private handleToParent2() {
					   this.loading=false
			          return this.msgPath='要传递给父组件的值2';    // return将要传递的值
			      }
				// 方法三
				    // 先定义父组件接收的方法（同方法一、二）
				    @Emit() 
				    private handleToParent3() {
						 this.loading=false
				        return this.msgPath='要传递给父组件的值3';    // return将要传递的值
				    }
				    private handleClickEvent() {
				        // ... 一些其它的操作
				        // 然后手动调用传值
				        this.handleToParent3();
					}		
					
					
					
					
		// 控制loading显示与否
		loading: string = false
		data() {
			return {
				isCollapse: true
			}
		}

		// 调用方法
		handleOpen(key, keyPath): void {
			console.log(key, keyPath);
		}
		handleClose(key, keyPath): void {
			console.log(key, keyPath);
		}

	}
</script>
<style scoped="scoped" lang="less">
	.loadingModel {
		border: 1px solid green;
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 9999;

		.laoding {
			font-size: 14px;
			color: #409eff;
			width: 300px;
			height: 34px;
			line-height: 34px;
			text-align: center;
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			margin: auto;
		}
	}
</style>
