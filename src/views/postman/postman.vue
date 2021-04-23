<template>
	<div class="postman">
		<!-- {{contentAjax}} -->
		<div class="pContent">
			<ul class="leftHeaer l">
				<li class="hl">历史记录</li>
				<li class="hostList" v-for="(pdata,index) in contentAjax">
					<span class="hostherder l">{{pdata.ajaxType}}</span>
					<div class="hostAll l">{{pdata.httpUrl}} <i @click="delHAjax(index,pdata)"
							class="delHUrl el-icon-close"></i></div>
				</li>
			</ul>
			<div class="rightContent">
				<ul class="urlTitle">
					<li class="urlList  l" :class="{urlAct:indexs==setIndex}" v-for="(pt,indexs) in contentAjax"
						@click="setContent(indexs)">
						<div v-if="pt.ajaxType=='GET'" class="aType getRequest l">{{pt.ajaxType}}</div>
						<div v-else class="aType postRequest l">{{pt.ajaxType}}</div>
						<div class="aType text1 l">{{pt.httpUrl}}</div>
						<i @click="delUrl(indexs)" class="delBtnAll  el-icon-close"></i>

					</li>
					<li class="urlList l" @click="addUrl"><i class="el-icon-plus"></i></li>
				</ul>
				<div v-for="(pdata,index) in contentAjax" v-if="setIndex==index">
					
					<div style="margin-top: 15px;">
						<!-- @change="setContentAjax" -->
						<el-input style="width: 92%;margin-right: 1%;" placeholder="请输入内容"
							@change="changeUrl(pdata.radioBody)" v-model="pdata.httpUrl" class="input-with-select">
							<el-select v-model="pdata.ajaxType" slot="prepend" placeholder="请选择">
								<el-option label="POST" value="POST"></el-option>
								<el-option label="GET" value="GET"></el-option>
								<el-option label="PUA" value="PUA"></el-option>
							</el-select>
							<el-button slot="append" @click='saveAjax'>发送
							</el-button>

							<!-- <el-button slot="append" v-if="pdata.contentType!='form-data'" @click='saveAjax'>发送
							</el-button>
							<el-button slot="append" v-else @click='saveAjaxChange'>1发送</el-button> -->

						</el-input>
						<el-button style="width: 7%;" slot="append" @click='saveAjax'>保存</el-button>
					</div>
					<!-- {{pdata}} -->
					<ul class="hearderParams">
						<li class="l" @click="actType(data,index)" :class="{paActive:data==pdata.radioBody}"
							v-for=" data in radioData">{{data}}</li>
					</ul>
					<div class="contentPos">
						<div class="contentSetType" v-if="pdata.radioBody=='Body'">
							<el-radio v-model="pdata.contentType" label="none">none</el-radio>
							<el-radio v-model="pdata.contentType" label="form-data">form-data</el-radio>
							<el-radio v-model="pdata.contentType" label="x-www-form-urlencoded">x-www-form-urlencoded
							</el-radio>
							<el-radio v-model="pdata.contentType" label="raw">raw</el-radio>
							<el-radio v-model="pdata.contentType" label="binary">binary</el-radio>
							<el-radio v-model="pdata.contentType" label="GraphQL">GraphQL</el-radio>
						</div>
						<ul class="addVal">
							<li class="addTitle">
								<div class="addKey addOne  l">select</div>
								<div class="addKey vPl  l">KEY</div>
								<div class="addKey vPl l">VALUE</div>
								<div class="addKey vPl l">DESCRIPTION</div>
							</li>

							<!-- Params -->
							<li v-if="pdata.radioBody=='Params'" class="addTitle"
								v-for="(data,indexItem) in pdata.paramsAct">
								<div class="addKey addOne l" @click="setAddData(pdata.radioBody)">
									<el-checkbox v-model="data.actVal"><span v-if="data.actVal==true">启用</span><span
											v-else>禁用</span></el-checkbox>
								</div>
								<div class="addKey l" :class="{addKeyDisble:data.actVal==false}">
									<el-input v-if="data.valueType=='text'"
										@change="setAddData(pdata.radioBody,'paramsAct')" v-model="data.KEY"
										placeholder="KEY"></el-input>
									<el-input v-else v-model="data.KEY"
										@change="setAddData(pdata.radioBody,'paramsAct')" placeholder="输入文件的上传的name">
									</el-input>

									<!-- <div class="addSelect">
										<el-select v-model="data.valueType" placeholder="请选择" @change="setAddData(pdata.radioBody)">
											<el-option v-for="item in optionsType" :key="item.value" :label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</div> -->
								</div>
								<div class="addKey l" :class="{addKeyDisble:data.actVal==false}">
									<el-input v-if="data.valueType=='text'"
										@change="setAddData(pdata.radioBody,'paramsAct')" v-model="data.VALUE"
										placeholder="VALUE"></el-input>
									<!-- <input v-if="data.valueType=='file'&&pdata.contentType=='form-data'" ref='fleImg' class="up_input l" type="file" multiple="multiple"
										@change="imgValidation5($event,index)" />
									<div class="fName l" v-if="data.filesName.length>0"
										v-for='(fname,indexFna) in data.filesName' @click="delFiName(index,indexFna)">
										{{fname}}
										<i class="delName el-icon-close"></i>
									</div> -->

								</div>
								<div class="addKey l">
									<el-input v-model="data.DESCRIPTION"
										@change="setAddData(pdata.radioBody,'paramsAct')" placeholder="DESCRIPTION">
									</el-input>
									<i v-if="indexItem <(pdata.paramsAct.length-1)"
										@click="delAjax(index,indexItem,'paramsAct')" class="delBtn el-icon-close"></i>
								</div>


							</li>
							<!-- Headers -->
							<li v-if="pdata.radioBody=='Headers'" class="addTitle"
								v-for="(data,indexItem) in pdata.headersAct">
								<div class="addKey addOne l">
									<el-checkbox v-model="data.actVal"><span v-if="data.actVal==true">启用</span><span
											v-else>禁用</span></el-checkbox>
								</div>
								<div class="addKey l" :class="{addKeyDisble:data.actVal==false}">
									<el-input v-if="data.valueType=='text'" @change="setAddData(pdata.radioBody)"
										v-model="data.KEY" placeholder="KEY"></el-input>
									<el-input v-else v-model="data.KEY" @change="setAddData(pdata.radioBody)"
										placeholder="输入文件的上传的name">
									</el-input>

									<!-- <div class="addSelect">
										<el-select v-model="data.valueType" placeholder="请选择" @change="setAddData(pdata.radioBody)">
											<el-option v-for="item in optionsType" :key="item.value" :label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</div> -->
								</div>
								<div class="addKey l" :class="{addKeyDisble:data.actVal==false}">
									<el-input v-if="data.valueType=='text'" @change="setAddData(pdata.radioBody)"
										v-model="data.VALUE" placeholder="VALUE"></el-input>
									<!-- <input v-else ref='fleImg' class="up_input l" type="file" multiple="multiple"
										@change="imgValidation5($event,index)" />
									<div class="fName l" v-if="data.filesName.length>0"
										v-for='(fname,indexFna) in data.filesName' @click="delFiName(index,indexFna)">
										{{fname}}
										<i class="delName el-icon-close"></i>
									</div> -->

								</div>
								<div class="addKey l">
									<el-input v-model="data.DESCRIPTION" @change="setAddData(pdata.radioBody)"
										placeholder="DESCRIPTION">
									</el-input>
									<i v-if="indexItem <(pdata.headersAct.length-1)"
										@click="delAjax(index,indexItem,'headersAct')" class="delBtn el-icon-close"></i>
								</div>


							</li>
							<!-- Body -->
							<li v-if="pdata.radioBody=='Body'" class="addTitle"
								v-for="(data,indexItem) in pdata.addData">
								<div class="addKey addOne l">
									<el-checkbox v-model="data.actVal"><span v-if="data.actVal==true">启用</span><span
											v-else>禁用</span></el-checkbox>
								</div>
								<div class="addKey l" :class="{addKeyDisble:data.actVal==false}">
									<el-input v-if="data.valueType=='text'" @change="setAddData(pdata.radioBody)"
										v-model="data.KEY" placeholder="KEY"></el-input>
									<el-input v-else v-model="data.KEY" @change="setAddData(pdata.radioBody)"
										placeholder="输入文件的上传的name">
									</el-input>

									<div class="addSelect" v-if="pdata.contentType=='form-data'">
										<el-select v-model="data.valueType" placeholder="请选择"
											@change="setAddData(pdata.radioBody)">
											<el-option v-for="item in optionsType" :key="item.value" :label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</div>
								</div>
								<div class="addKey l" :class="{addKeyDisble:data.actVal==false}">
									<el-input v-if="data.valueType=='text'" @change="setAddData(pdata.radioBody)"
										v-model="data.VALUE" placeholder="VALUE"></el-input>
									<input v-if="data.valueType=='file'&&pdata.contentType=='form-data'" ref='fleImg'
										class="up_input l" type="file" multiple="multiple"
										@change="imgValidation5($event,indexItem)" />
									<!-- 显示上传文件的名成年 -->
									
									<div class="fName l" v-if="data.filesName.length>0"
										v-for='(fname,indexFna) in data.filesName' @click="delFiName(index,indexFna)">
										<span v-if="data.filesName.length==1"> {{fname}}</span>
										<span v-else> {{data.filesName.length}}个files</span>
										<i class="delName el-icon-close"></i>
									</div>

								</div>
								<div class="addKey l">
									<el-input v-model="data.DESCRIPTION" @change="setAddData(pdata.radioBody)"
										placeholder="DESCRIPTION">
									</el-input>
									<i v-if="indexItem <(pdata.addData.length-1)"
										@click="delAjax(index,indexItem,'addData')" class="delBtn el-icon-close"></i>
								</div>


							</li>




						</ul>

						<!-- <div >
							<el-input type="textarea" :rows="8" placeholder="请输入内容"   ></el-input>
						</div> -->
					</div>

					<!-- 子组件 -->
					<!-- :parent-value="msg"父传子 -->
					<!-- @handle-to-parent1="handleChildValue" 子传父，接收 -->
				</div>




				<div class="resAll">
					<ul class="resTab">
						<li class="resTabLi l" :class="{resTabAct:rIndex==resIndex}" @click="rescIndex(rIndex)"
							v-for="(data,rIndex) in resList">{{data}}</li>

					</ul>
					<div class="resDContent" v-if="getData">
						<div class="resContent" v-if="resIndex==0">
							<json-viewer :value="getData.data" :expand-depth='4' sort></json-viewer>
						</div>
						<div class="resContent" v-if="resIndex==1">
							暂无数据
							<!-- <json-viewer :value="getData.headers" :expand-depth='4' sort></json-viewer> -->
						</div>
						<div class="resContent" v-if="resIndex==2">
							<json-viewer :value="getData.config.headers" :expand-depth='4' sort></json-viewer>
						</div>
						<div class="resContent" v-if="resIndex==3">
							<json-viewer :value="getData" :expand-depth='4' sort></json-viewer>
						</div>
					</div>

				</div>
			</div>

		</div>
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
	import commonFun from '../../assets/js/commonFun.ts'




	@Component({
		components: {
			leftView,
			imgUp,
			loading
		},
		created() {

			this.getLogin()
			if (localStorage.getItem('contentAjax')) {

				this.contentAjax = JSON.parse(localStorage.getItem('contentAjax'))
			}
			if (localStorage.getItem('setIndex')) {
				this.setIndex = localStorage.getItem('setIndex')
				if(this.setIndex >(this.contentAjax.length-1)){
					this.setIndex =0
				}

			}

		}
	})
	export default class Root extends Vue {


		//传给子组件的值
		private msg: string = "没看错，我在加载中....（传给子组件的值）"
		tableData: object = []
		setIndex: number = 0 //选中的下标
		resIndex: number = 0
		resList: Array = ['body', 'cookie', 'Headers', 'all']
		getData: string = ''
		// 设置请求方式
		contentAjax: Array = [{
			httpUrl: 'http://127.0.0.1:7000/profile',
			ajaxType: 'POST',
			radioBody: 'Params',
			fileType: 'file',
			contentType: 'form-data',

			paramsAct: [{
				valueType: 'text', //判断显示输入框还是其他类型
				params: [], //处理好的图片或者文件类型
				filesName: [], //上传文件的名字
				actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
				KEY: 'avatar', //输入框的key
				VALUE: '', //输入的内容
				ESCRIPTION: '' //输入的描述
			}],


			headersAct: [{ //请求头的信息
				valueType: 'text', //判断显示输入框还是其他类型
				params: [], //处理好的图片或者文件类型
				filesName: [], //上传文件的名字
				actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
				KEY: 'Accept', //输入框的key
				VALUE: 'application/json, text/plain, */*', //输入的内容
				ESCRIPTION: '' //输入的描述
			}, { //请求头的信息
				valueType: 'text', //判断显示输入框还是其他类型
				actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
				KEY: 'Content-Type', //输入框的key
				VALUE: 'application/json;charset=utf-8', //输入的内容
				ESCRIPTION: '' //输入的描述
			}],
			addData: [{
				valueType: 'file', //判断显示输入框还是其他类型
				params: [], //处理好的图片或者文件类型
				filesName: [], //上传文件的名字
				actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
				KEY: 'avatar', //输入框的key
				VALUE: '', //输入的内容
				ESCRIPTION: '' //输入的描述
			}]

		}]
		radioData: Array = ['Params', 'Headers', 'Body']
		optionsType: Array = [{
			value: 'text',
			label: 'text'
		}, {
			value: 'file',
			label: 'file'
		}]
		data() {
			return {

			}
		}

		private actType(val: string, index: number) {
			// val: 子组件传过来的值
			this.contentAjax[index].radioBody = val;

		}
		private delAjax(index: number, indexItem: number, tl: string) {
			// val: 子组件传过来的值
			if (tl == 'paramsAct') {
				this.contentAjax[index].paramsAct.splice(indexItem, 1)
			}
			if (tl == 'headersAct') {

				this.contentAjax[index].headersAct.splice(indexItem, 1)
			}
			if (tl == 'addData') {
				this.contentAjax[index].addData.splice(indexItem, 1)
			}
			this.setContentAjax()
		}
		rescIndex(index: number): void {
			this.resIndex = index
		}
		setContentAjax(): void {
			// 存储变动的值

			if (this.contentAjax) {
				//console.log(JSON.stringify(this.contentAjax) )
				localStorage.setItem('contentAjax', JSON.stringify(this.contentAjax))
			}


		}
		delHAjax(index: number): void {

			// this.contentAjax.splice(index, 1)

			// this.setIndex = (this.contentAjax.length - 1)
			// this.setContentAjax()
		}
		delUrl(index: number): void {
			let vm=this;
			vm.contentAjax.splice(index, 1)
			setTimeout(function(){
				vm.setIndex = (index- 1)
			},50)
			vm.setContent(vm.setIndex)
			vm.setContentAjax()
			
		}
		setContent(index: number): void {
			this.setIndex = index
			localStorage.setItem('setIndex', JSON.stringify(index))

		}
		GetRequestAll(url: string): void {
			//var url = url; //获取url中"?"符后的字串  
			var theRequest = new Object();
			if (url.indexOf("?") != -1) {
				var str = url.substr((url.indexOf("?") + 1), (url.length));
				console.log(str, 'str')
				var strs = str.split("&");
				for (var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
				}
			}
			return theRequest;
		}
		changeUrl(val: string): void {
			let vm = this;
			let obj = {}
			if (val == 'Params') {
				console.log(vm.contentAjax[vm.setIndex], 'vm.contentAjax[vm.setIndex]')

				let urlObj = '';
				let sl;
				if (vm.contentAjax[vm.setIndex].httpUrl) {
					if(vm.contentAjax[vm.setIndex].httpUrl.indexOf("?") != -1){
						this.contentAjax[vm.setIndex].paramsAct = []
						urlObj = vm.GetRequestAll(vm.contentAjax[vm.setIndex].httpUrl)
						for (let j in urlObj) {
							console.log(urlObj[j], 'jjjj')
							obj = {
								valueType: 'text', //判断显示输入框还是其他类型
								params: [], //处理好的图片或者文件类型
								filesName: [], //上传文件的名字
								actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
								KEY: j, //输入框的key
								VALUE: urlObj[j], //输入的内容
								ESCRIPTION: '' //输入的描述
							}
							console.log(this.contentAjax[vm.setIndex].paramsAct)
							this.contentAjax[vm.setIndex].paramsAct.unshift(obj)
							console.log(this.contentAjax[vm.setIndex].paramsAct.length)
						}
						sl = (vm.contentAjax[vm.setIndex].paramsAct.length - 1)
						if (vm.contentAjax[vm.setIndex].paramsAct[sl].KEY || vm.contentAjax[vm.setIndex].paramsAct[sl]
							.VALUE || vm.contentAjax[vm.setIndex].paramsAct[sl].ESCRIPTION) {

							obj = {
								valueType: 'text', //判断显示输入框还是其他类型
								params: [], //处理好的图片或者文件类型
								filesName: [], //上传文件的名字
								actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
								KEY: '', //输入框的key
								VALUE: '', //输入的内容
								ESCRIPTION: '' //输入的描述
							}
							this.contentAjax[vm.setIndex].paramsAct.push(obj)
						}
					}else{
						this.contentAjax[vm.setIndex].paramsAct = []
						obj = {
							valueType: 'text', //判断显示输入框还是其他类型
							params: [], //处理好的图片或者文件类型
							filesName: [], //上传文件的名字
							actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
							KEY: '', //输入框的key
							VALUE: '', //输入的内容
							ESCRIPTION: '' //输入的描述
						}
						this.contentAjax[vm.setIndex].paramsAct.push(obj)
					}
				}


			}
		}

		setAddData(val: string): void {
			let vm = this;
			let obj = {}


			if (val == 'Params') {
				console.log(vm.contentAjax[vm.setIndex], 'vm.contentAjax[vm.setIndex]')
				let sl = vm.contentAjax[vm.setIndex].paramsAct.length - 1
				let urlObj = '';


				let urlGet = []
				for (let i = 0; i < vm.contentAjax[vm.setIndex].paramsAct.length; i++) {
					if (vm.contentAjax[vm.setIndex].paramsAct[i].actVal == true) {
						if (vm.contentAjax[vm.setIndex].paramsAct[i].KEY) {
							urlGet.push((vm.contentAjax[vm.setIndex].paramsAct[i].KEY + '=' + vm.contentAjax[vm
								.setIndex].paramsAct[i].VALUE))

						}
					}
				}
				var urlSet = ''
				if (vm.contentAjax[vm.setIndex].httpUrl.indexOf("?") != -1) {
					let ends = vm.contentAjax[vm.setIndex].httpUrl.indexOf("?")

					urlSet = vm.contentAjax[vm.setIndex].httpUrl.substr(0, ends);

				}else{
					urlSet=vm.contentAjax[vm.setIndex].httpUrl
				}
				console.log(urlGet,urlSet, 'strpppp')

				vm.contentAjax[vm.setIndex].httpUrl = urlSet + '?' + urlGet.join('&')
				if (vm.contentAjax[vm.setIndex].paramsAct[sl].KEY || vm.contentAjax[vm.setIndex].paramsAct[sl].VALUE ||
					vm.contentAjax[vm.setIndex].paramsAct[sl].ESCRIPTION) {





					//vm.contentAjax[vm.setIndex].httpUrl
					obj = {
						valueType: 'text', //判断显示输入框还是其他类型
						params: [], //处理好的图片或者文件类型
						filesName: [], //上传文件的名字
						actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
						KEY: '', //输入框的key
						VALUE: '', //输入的内容
						ESCRIPTION: '' //输入的描述
					}
					this.contentAjax[vm.setIndex].paramsAct.push(obj)


				}








			} else if (val == 'Headers') {
				let sl = vm.contentAjax[vm.setIndex].headersAct.length - 1
				console.log(vm.contentAjax[vm.setIndex], 'vm.contentAjax[vm.setIndex]')
				// alert('pppp')
				if (vm.contentAjax[vm.setIndex].headersAct[sl].KEY || vm.contentAjax[vm.setIndex].headersAct[sl]
					.VALUE || vm.contentAjax[vm.setIndex].headersAct[sl].ESCRIPTION) {

					obj = {
						valueType: 'text', //判断显示输入框还是其他类型
						params: [], //处理好的图片或者文件类型
						filesName: [], //上传文件的名字
						actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
						KEY: '', //输入框的key
						VALUE: '', //输入的内容
						ESCRIPTION: '' //输入的描述
					}
					this.contentAjax[vm.setIndex].headersAct.push(obj)
				}
			} else if (val == 'Body') {
				let sl = vm.contentAjax[vm.setIndex].addData.length - 1
				if (vm.contentAjax[vm.setIndex].addData[sl].KEY || vm.contentAjax[vm.setIndex].addData[sl].VALUE || vm
					.contentAjax[vm.setIndex].addData[sl].ESCRIPTION) {

					obj = {
						valueType: 'text', //判断显示输入框还是其他类型
						params: [], //处理好的图片或者文件类型
						filesName: [], //上传文件的名字
						actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
						KEY: '', //输入框的key
						VALUE: '', //输入的内容
						ESCRIPTION: '' //输入的描述
					}
					this.contentAjax[vm.setIndex].addData.push(obj)
					// for(let i=0;i<vm.contentAjax[vm.setIndex].addData.length;i++){
					// 	if(!vm.contentAjax[vm.setIndex].addData.KEY){
					// 		a++
					// 		if(a<=1){
					// 			console.log(this.contentAjax[vm.setIndex].addData.KEY,'this.contentAjax[vm.setIndex].addData')
					// 			this.contentAjax[vm.setIndex].addData.push(obj)
					// 		}
					// 		console.log(vm.contentAjax[vm.setIndex].addData.KEY,a)
					// 	}

					// }

				}
			}




			vm.setContentAjax()

			// console.log(this.contentAjax[vm.setIndex],'this.contentAjax[vm.setIndex].addData.push(obj)')
		}
		addUrl(): void {
			let vm = this;
			let obj = {
				httpUrl: '',
				ajaxType: 'GET',
				radioBody: 'Params',
				fileType: 'text',
				contentType: 'form-data',


				paramsAct: [{
					valueType: 'text', //判断显示输入框还是其他类型
					params: [], //处理好的图片或者文件类型
					filesName: [], //上传文件的名字
					actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
					KEY: '', //输入框的key
					VALUE: '', //输入的内容
					ESCRIPTION: '' //输入的描述
				}],


				headersAct: [{ //请求头的信息
						valueType: 'text', //判断显示输入框还是其他类型
						params: [], //处理好的图片或者文件类型
						filesName: [], //上传文件的名字
						actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
						KEY: 'Accept', //输入框的key
						VALUE: 'application/json, text/plain, */*', //输入的内容
						ESCRIPTION: '' //输入的描述
					}, { //请求头的信息
						valueType: 'text', //判断显示输入框还是其他类型
						actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
						KEY: 'Content-Type', //输入框的key
						VALUE: 'application/json;charset=utf-8', //输入的内容
						ESCRIPTION: '' //输入的描述
					},
					{ //请求头的信息
						valueType: 'text', //判断显示输入框还是其他类型
						actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
						KEY: '', //输入框的key
						VALUE: '', //输入的内容
						ESCRIPTION: '' //输入的描述
					}
				],

				addData: [{
					valueType: 'text', //判断显示输入框还是其他类型
					params: '', //处理好的图片或者文件类型
					filesName: [], //上传文件的名字
					actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
					KEY: '', //输入框的key
					VALUE: '', //输入的内容
					ESCRIPTION: '' //输入的描述
				}],
			}
			this.contentAjax.push(obj)

			// alert(this.contentAjax.length)
			// this.setIndex=this.contentAjax.length
			vm.setIndex = (vm.contentAjax.length - 1)
			vm.setContent((vm.setIndex-0))
			vm.setContentAjax()
			// contentAjax:Array=[
		}
		saveAjaxChange(index, cIndex): void {
			let vm = this;


			let data = {} //所有参数
			// let params=new FormData();
			let paramsData = [] //携带的data
			let headerData = {} //携带请求头

			// 做数据判断,循环重构数据结构
			if (vm.contentAjax[vm.setIndex].radioBody == 'Body') {
				paramsData = vm.contentAjax[vm.setIndex].addData
			} else if (vm.contentAjax[vm.setIndex].radioBody == 'Params') {
				paramsData = vm.contentAjax[vm.setIndex].paramsAct
			}
			// 生成headers

			for (let i = 0; i < vm.contentAjax[vm.setIndex].headersAct.length; i++) {
				if (vm.contentAjax[vm.setIndex].headersAct[i].actVal == true) {
					if (vm.contentAjax[vm.setIndex].headersAct[i].KEY) {

						headerData[vm.contentAjax[vm.setIndex].headersAct[i].KEY] = vm.contentAjax[vm.setIndex]
							.headersAct[i].VALUE
					}
				}
			}

			//生成data
			// alert(paramsData.length)
			if (paramsData.length > 0) {
				for (let j = 0; j < paramsData.length; j++) {
					if (paramsData[j].actVal == true) {
						if (paramsData[j].KEY) {

							data[paramsData[j].KEY] = paramsData[j].VALUE
						}
						if (paramsData[j].DESCRIPTION) {
							data.DESCRIPTION = paramsData[j].DESCRIPTION
						}
					}
				}
			}



			//传给后台的参数请勿修改
			vm.contentAjax[vm.setIndex].dataAjax = data //传递的value所有参数
			vm.contentAjax[vm.setIndex].headerData = headerData //传递的header

			vm.$axios({
				// url: vm.contentAjax[vm.setIndex].httpUrl,
				url: vm.$ajaxUrl.postSave, //前端固定接口，调用后台服务
				method: 'POST',
				data: '',
				// data: vm.contentAjax[vm.setIndex],
				// headers: {
				// 	'Content-Type': vm.contentType
				// },
				// withCreadentials:true
			}).then((res) => {
				console.log(res, 'res')
				let code = res.data.code

				vm.getData = res
				if (code == 200) {

					//vm.$store.commit('userSet', res.data.data)
					// vm.$message({
					// 	message: '注册成功',
					// 	type: 'success'
					// });


				} else {
					vm.$message.error(res.data.msg);
				}


			}, (error) => {

				console.log(error);
			});
		}

		saveAjax(index, cIndex): void {
			let vm = this;


			let data = {} //所有参数
			// let params=new FormData();
			let paramsData = [] //携带的data
			let headerData = {} //携带请求头

			// 做数据判断,循环重构数据结构
			if (vm.contentAjax[vm.setIndex].radioBody == 'Body') {
				paramsData = vm.contentAjax[vm.setIndex].addData
			} else if (vm.contentAjax[vm.setIndex].radioBody == 'Params') {
				paramsData = vm.contentAjax[vm.setIndex].paramsAct
			}
			// 生成headers

			for (let i = 0; i < vm.contentAjax[vm.setIndex].headersAct.length; i++) {
				if (vm.contentAjax[vm.setIndex].headersAct[i].actVal == true) {
					if (vm.contentAjax[vm.setIndex].headersAct[i].KEY) {

						headerData[vm.contentAjax[vm.setIndex].headersAct[i].KEY] = vm.contentAjax[vm.setIndex]
							.headersAct[i].VALUE
					}
				}
			}

			//生成data
			// alert(paramsData.length)
			if (paramsData.length > 0) {
				for (let j = 0; j < paramsData.length; j++) {
					if (paramsData[j].actVal == true) {
						if (paramsData[j].KEY) {

							data[paramsData[j].KEY] = paramsData[j].VALUE
						}
						if (paramsData[j].DESCRIPTION) {
							data.DESCRIPTION = paramsData[j].DESCRIPTION
						}
					}
				}
			}



			//传给后台的参数请勿修改
			vm.contentAjax[vm.setIndex].dataAjax = data //传递的value所有参数
			vm.contentAjax[vm.setIndex].headerData = headerData //传递的header

			vm.$axios({
				// url: vm.contentAjax[vm.setIndex].httpUrl,
				url: vm.$ajaxUrl.postManAjax, //前端固定接口，调用后台服务
				method: 'POST',
				data: vm.contentAjax[vm.setIndex],
				// headers: {
				// 	'Content-Type': vm.contentType
				// },
				// withCreadentials:true
			}).then((res) => {
				console.log(res, 'res')
				let code = res.data.code

				vm.getData = res
				if (code == 200) {

					//vm.$store.commit('userSet', res.data.data)
					// vm.$message({
					// 	message: '注册成功',
					// 	type: 'success'
					// });


				} else {
					vm.$message.error(res.data.msg);
				}


			}, (error) => {

				console.log(error);
			});
		}
		delFiName(index, cIndex): void {
			let vm = this;
			//this.contentAjax[vm.setIndex].addData[index].filesName.splice(cIndex, 1)
			this.contentAjax[vm.setIndex].addData[index].filesName = [];
			let el: any = this.$refs.fleImg;
			el.value = ''
			console.log(vm.$refs.fleImg.value, 'vm.$refs.fleImg.value')
			//console.log(this.addData[index].params, 'this.addData[index].params')
			// this.contentAjax[vm.setIndex].addData[index].params = ''
			// params
			// vm.contentAjax[vm.setIndex].addData[index].params
			// this.contentAjax[vm.setIndex].addData[index].filesName=[]
			// this.addData[vm.setIndex].params.splice(cIndex, 1)



			vm.setContentAjax()
		}
		imgValidation5(file, index): void {
			//	vue图片上传

			let vm = this;
			
			let fileContent = file.target.files
			let paramsFile = new FormData();
			console.log(fileContent, 'vm.$refs.fleImg.value')
			//vm.contentAjax[vm.setIndex].addData[index].params = JSON.stringify(file)
			// 获取动态的from参数
			console.log(vm.contentAjax[vm.setIndex].ajaxType, vm.setIndex, '测试数据')
			let obj = {}
			let strObj = []
			for (let i = 0; i < vm.contentAjax[vm.setIndex].addData.length; i++) {
				if (vm.contentAjax[vm.setIndex].addData[i].actVal == true) {
					if (vm.contentAjax[vm.setIndex].addData[i].KEY && vm.contentAjax[vm.setIndex].addData[i].VALUE) {
						strObj.push((vm.contentAjax[vm.setIndex].addData[i].KEY + '=' + vm.contentAjax[vm.setIndex].addData[i].VALUE))

						//obj[vm.contentAjax[vm.setIndex].addData[i].KEY] =vm.contentAjax[vm.setIndex].addData[i].VALUE 

					}
				}
			}
			
			
			// params.append(obj)
			// console.log(obj,'fileContent.length')
			paramsFile.append('file', fileContent[0])
			// if (!vm.contentAjax[vm.setIndex].addData[index].filesName) {
			// 	vm.contentAjax[vm.setIndex].addData[index].filesName = []
			// }
			console.log(index,vm.contentAjax[vm.setIndex].addData[index],'filesName')
			vm.contentAjax[vm.setIndex].addData[index].filesName = []
			if (fileContent.length == 1) {
				// 单张上传
				
					
				vm.contentAjax[vm.setIndex].addData[index].filesName.push(fileContent[0].name)
					//vm.contentAjax[vm.setIndex].addData[index].filesName.push(fileContent[0].name)
				//vm.$forceUpdate();
				console.log(fileContent[0].name,vm.contentAjax[vm.setIndex].addData[index].filesName,'fileContent[i].namellllll')
			} else {
				// 多张上传

				for (let i = 0; i < fileContent.length; i++) {
					console.log(fileContent[i].name, fileContent.length)
					let tName = fileContent[i].name
					console.log(vm.contentAjax[vm.setIndex].addData[index], vm.contentAjax[vm.setIndex].addData[index].filesName)
					vm.contentAjax[vm.setIndex].addData[index].filesName.push(tName)

				}
			}
				
			let stPl = ''
			let ajaxType = ('ajaxType=' + vm.contentAjax[vm.setIndex].ajaxType+'&httpUrl='+vm.contentAjax[vm.setIndex].httpUrl)
			strObj.push(ajaxType)

			if (strObj.length > 0) {

				stPl = strObj.join('&')
			}
			console.log(stPl, 'stPl')
			
			// return
			vm.$axios({


				url: vm.$ajaxUrl.profile + '?' + stPl,
				// url:vm.contentAjax[vm.setIndex].httpUrl,
				method: 'POST',
				data: paramsFile, //qs.stringify(data)
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}).then((res) => {
				console.log(res.data.code, 'res')
				let code = res.data.code
				vm.getData = res
				vm.$refs.fleImg.value = ''
				if (code == 200) {
					vm.$message({
						message: '操作成功',
						type: 'success'
					});
					
					
				} else {
					vm.$message.error(res.data.msg);
				}

			}, (error) => {
				// vm.getSvg()
				vm.$refs.fleImg.value = ''
				console.log(error);
			});














			//console.log(params, 'fileklp')
			return

			vm.fileContent = file.target.files
			if ((vm.imgContent.length + vm.fileContent.length) > 5) {
				vm.$Message.error({
					content: "图片上传最多5张",
					duration: 3
				});
				vm.$refs.fleImg.value = ''
				return
			}

			for (let i = 0; i < vm.fileContent.length; i++) {
				let filepath = vm.fileContent[i];

				if (filepath.type == "image/png" || filepath.type == "image/jpg" || filepath.type == "image/jpeg") {

				} else {
					vm.$Message.error({
						content: "图片上传格式只支持png,jpg,jpeg",
						duration: 3
					});
					setTimeout(function() {
						vm.isUpload = 1
					}, 500)
					return false;
				}

				if (file.size > 2099200) {
					vm.$Message.error({
						content: "图片最大为2MB",
						duration: 3
					});
					setTimeout(function() {
						vm.isUpload = 1
					}, 500)
					return false;
				} else {
					if (filepath) {
						let reader = new FileReader();
						reader.onload = function(e) {
							let data = e.target.result;
							if (vm.imgContent.length > 0) {
								for (let s = 0; s < vm.imgContent.length; s++) {
									if (vm.imgContent[s].url == data) {
										vm.$Message.error({
											content: "请勿上传重复图片",
											duration: 3
										});
										//											去除input上传数据
										vm.$refs.fleImg.value = ''
										return
									}
								}
							}

							//渲染
							let imageAll = 'image' + i
							imageAll = new Image();

							if (vm.idCount == -1) {
								vm.idCount = i

							} else {
								vm.idCount = vm.idCount + i
							}

							let imgId = 'imgOne' + vm.idCount

							imageAll.onload = function() {
								let width = imageAll.width;
								let height = imageAll.height;
								//									提交时请注意msg为判断该图片是否符合上传要求,为空时可以提交接口
								let objImg = {
									url: data,
									id: imgId,
									msg: ''
								}
								if (width > 1200) {
									objImg = {
										url: data,
										id: imgId,
										msg: '图片宽度不符合要求,请删除后重新上传'
									}
								}
								if (height > 350) {
									objImg = {
										url: data,
										id: imgId,
										msg: '上传图片高度不符合要求,请删除后重新上传'
									}
								}
								vm.imgContent.push(objImg)

								vm.$refs.fleImg.value = ''
							}
							imageAll.src = data;
						}
						reader.readAsDataURL(filepath);
					} else {
						return false;
					}

				}
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
	.postman {
		background: #fff;

		.pContent {
			margin: auto;
			width: 1200px;
		}

		.leftHeaer {
			width: 300px;
			height: 800px;

			.hl {
				padding: 10px 0;
				border-bottom: 1px solid #eee;
				margin-bottom: 10px;
			}

			.hostList {
				margin-bottom: 10px;
				font-size: 14px;
				overflow: hidden;
				cursor: pointer;

				.hostAll {
					word-break: break-all;
					width: 220px;
					position: relative;

					.delHUrl {
						height: 10px;
						position: absolute;
						right: -15px;
						top: 0;
						bottom: 0;
						margin: auto;
						display: none;

					}
				}

				.hostAll:hover .delHUrl {
					display: block;
				}

				.hostherder {
					width: 60px;
					// line-height: 100%;
					font-size: 14px;
					color: orange;

				}
			}

		}

		.rightContent {
			width: 900px;
			border-left: 1px solid #eee;
			overflow: hidden;
		}

		.resAll {
			margin: 20px 0;
			background: #fff;
			padding: 20px;
			min-height: 400px;

			.resTab {
				overflow: hidden;
				margin-bottom: 20px;

				.resTabLi {
					padding: 5px 10px;
					border-bottom: 2px solid rgba(0, 0, 0, 0);
					cursor: pointer;
				}

				.resTabAct {
					color: orange;
					border-bottom: 2px solid orange;
				}
			}
		}

		.resDContent {
			padding-bottom: 20px;
			// border-top: 1px solid #eee;
		}

		.resContent {
			border: 1px solid #eee;
			min-height: 200px;
			padding: 20px;
		}

		.l {
			float: left;
		}

		.r {
			float: right;
		}

		.text1 {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.center {
			text-align: center;
		}

		.urlTitle {
			background: #fff;
			height: 44px;
			line-height: 40px;
			text-align: center;
			font-size: 12px;

			.urlList {
				width: 80px;
				border: 1px solid #eee;
				border-top: 2px solid #eee;
				overflow: hidden;
				margin-left: 4px;
				background: #eee;
				cursor: pointer;
				position: relative;

				.aType {
					width: 50%;

				}

				.getRequest {
					font-weight: 800;
					color: green;
				}

				.postRequest {
					font-weight: 800;
					color: orange;
				}

				.delBtnAll {
					position: absolute;
					right: 3px;
					top: 35%;
					font-size: 14px;
					// display: none;
					color: orange;
					font-weight: 800;
					cursor: pointer;
				}
			}

			.urlAct {
				border-top: 2px solid orange;
				background: #fff;
			}
		}

		/deep/.el-select .el-input {
			width: 100px;
		}

		/deep/.input-with-select .el-input-group__prepend {
			background-color: #fff;
		}

		.hearderParams {
			// border: 1px solid red;
			height: 40px;
			overflow: hidden;
			background: #fff;
			cursor: pointer;

			li {
				height: 40px;
				line-height: 40px;
				padding: 0 20px;
			}

			.paActive {
				color: orange;
				border-bottom: 2px solid orange;
			}
		}

		.contentPos {
			border-top: 1px solid #eee;
			border-bottom: 1px solid #eee;
			border-right: 1px solid #eee;
			background: #fff;

			// padding: 20px;
			.contentSetType {
				padding: 10px;
			}

		}

		.addVal {
			overflow: hidden;

			.addTitle {
				height: 40px;
				line-height: 40px;
				position: relative;

				.addKey {
					width: 31%;
					height: 42px;
					// padding-left: 2%;
					border: 1px solid #eee;
					border-bottom: none;
					border-right: none;
					position: relative;
					font-size: 12px;

					/deep/.el-input__inner {
						border: none;
					}

					.delBtn {
						position: absolute;
						right: 20px;
						top: 35%;
						display: none;
						cursor: pointer;
					}

					.addSelect {
						width: 100px;
						position: absolute;
						right: 0;
						top: 0;


					}

					.up_input {
						width: 70px;
						margin-top: 8px;
					}

					.fName {
						width: 180px;
						height: 43px;
						line-height: 43px;
						padding: 0 10px;
						margin-right: 5px;
						margin-bottom: 5px;
						position: relative;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;

						.delName {
							position: absolute;
							cursor: pointer;
							right: 0;
							top: 15px
						}
					}
				}

				.addKeyDisble {
					/deep/.el-input__inner {
						color: #eee;
					}

				}

				.addOne {
					width: 7%;
					padding-left: 10px;
				}

				.vPl {
					padding-left: 10px;
				}
			}

			.addTitle:hover .delBtn {
				display: block;
			}
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
