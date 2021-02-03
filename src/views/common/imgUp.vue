<template>
	<div id="imgBoxContent">
		<div class="img_upload_input">
			<div class="box_img">
				<ul class="box_img_list">
					<li v-for="data in imgContent" :id='data.id' class="addImg" :style="'backgroundImage:url('+data.url+')'">
						<span @click='delImg(data)' class="delSet">X</span>
						<span class="delRed">{{data.msg}}</span>
					</li>
					<li class="upload_up">
						<div class="up_text">
							+ <br /> 上传图片
						</div>
						<input ref='fleImg' class="up_input" type="file" multiple="multiple" accept="image/png, image/jpeg,image/jpg" @change="imgValidation5($event)" />
					</li>
				</ul>
			</div>

			<div class="url_box url_title">
				<div class="url_box_text l"></div>
				<div class="url_input colorRed">
					请按照尺寸上传图片，宽:1200px，高:350px
				</div>
			</div>

			
		</div>
	</div>
</template>

<script>
	var qs = require("qs");
	export default {
		data() {
			return {

				idCount: -1,
				imgStr: '',
				imgContent: [], //base64的图片数组,最终结果处理,msg为空的图片未符合要求的图片
				fileContent: '',
				wH: 0, //默认处理图片尺寸
			};
		},

		methods: {
			delImg(data) {
				let vm = this
				for(let i = 0; i < vm.imgContent.length; i++) {
					if(vm.imgContent[i].url == data.url) {
						vm.imgContent.splice(i, 1)
						vm.$refs.fleImg.value = ''
					}
				}
			},
			imgValidation5(file) {
				//	vue图片上传
				let vm = this;
				console.log(file, 'file')
				vm.fileContent = file.target.files
				if((vm.imgContent.length + vm.fileContent.length) > 5) {
					vm.$Message.error({
						content: "图片上传最多5张",
						duration: 3
					});
					vm.$refs.fleImg.value = ''
					return
				}

				for(let i = 0; i < vm.fileContent.length; i++) {
					let filepath = vm.fileContent[i];
					
					if(filepath.type == "image/png" || filepath.type == "image/jpg" || filepath.type == "image/jpeg") {

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

					if(file.size > 2099200) {
						vm.$Message.error({
							content: "图片最大为2MB",
							duration: 3
						});
						setTimeout(function() {
							vm.isUpload = 1
						}, 500)
						return false;
					} else {
						if(filepath) {
							let reader = new FileReader();
							reader.onload = function(e) {
								let data = e.target.result;
								if(vm.imgContent.length > 0) {
									for(let s = 0; s < vm.imgContent.length; s++) {
										if(vm.imgContent[s].url == data) {
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

								if(vm.idCount == -1) {
									vm.idCount = i

								} else {
									vm.idCount = vm.idCount + i
								}

								let imgId = 'imgOne' + vm.idCount

								imageAll.onload = function() {
									let width = imageAll.width;
									let height = imageAll.height;
//									提交时请注意msg为判断该图片是否符合上传要求,为空时可以提交接口
									let objImg = { url: data, id: imgId, msg: '' }
									if(width > 1200) {
										objImg = { url: data, id: imgId, msg: '图片宽度不符合要求,请删除后重新上传' }
									}
									if(height > 350) {
										objImg = { url: data, id: imgId, msg: '上传图片高度不符合要求,请删除后重新上传' }
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

			},

		},
		components: {

		}
	};
</script>

<style scoped="scoped" lang="less">
	#imgBoxContent {
		width: 920px;
		.img_upload_input {
			background: #fff;
			width: 100%;
			border: 1px solid #e5e5e5;
			position: relative;
			border-radius: 6px;
			/*left: 50%;*/
			top: 60px;
			/*margin-left: -250px;*/
			padding: 20px;
		}
		
		.box_img {
			overflow: hidden;
		}
		
		.box_img_list {
			min-height: 155px;
			overflow: hidden;
			float: left;
			margin-bottom: 20px;
		}
		/*.box_img_list_li{
			width: 155px;
			height: 155px;
			float: left;
			border: 1px solid red;
		
		}*/
		
		.box_img_list_t {
			float: left;
			overflow: hidden;
		}
		
		.upload_up {
			width: 155px;
			height: 155px;
			cursor: pointer;
			overflow: hidden;
			border: 1px dashed #e1e1e1;
			padding: 10px;
			float: left;
			margin: 0 5px 5px 5px;
		}
		
		#imgList {
			/*padding-top:10px ;*/
		}
		
		.up_input {
			border: 1px solid red;
			position: relative;
			top: -180px;
			left: -100px;
			width: 555px;
			height: 555px;
			/*font-size: 70px;
			  opacity: 0;
			  filter: alpha(opacity=0);
			  -moz-opacity: 0;
			  -khtml-opacity: 0;*/
		}
		
		.up_text {
			font-size: 16px;
			text-align: center;
			padding-top: 50px;
		}
		
		.addImg {
			width: 155px;
			height: 155px;
			margin: 0 10px 10px 10px;
			border: 1px solid #e5e5e5;
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center center;
			float: left;
			position: relative;
		}
		
		.delSet {
			cursor: pointer;
			color: #2766bc;
			background: #e5e5e5;
			float: right;
			border-radius: 5px;
			font-size: 12px;
			width: 20px;
			height: 20px;
			margin: 5px;
			line-height: 20px;
			text-align: center;
			border-radius: 50%;
	}
		
		.delRed {
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
			padding: 0 3px;
			line-height: 20px;
			background: #e5e5e5;
			color: red;
			text-align: center;
			font-size: 12px;
		}
	}
</style>