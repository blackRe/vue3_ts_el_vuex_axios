let basUrl='/apiProxy/api/'
let bas='/apiProxy/'
// let bas='/'
let times=new Date().getTime()
console.log(times,'times')
let svg=basUrl+'svgCaptcha/svg?time='+times
let login=basUrl+'login/login'
let userList=basUrl+'user/userList'
let setUser=basUrl+'user/setUser'
let profile=bas+'profile'//图片上传
let profile1=bas+'profile1'//图片上传
let coolProfile=bas+'cool-profile'//多张图片上传

let postManAjax=basUrl+'postMan/postManAjax'//通过该接口顶用其它接口
let postManFileAjax=basUrl+'postMan/postManFileAjax'//通过调用图片接口
let postSave=basUrl+'postMan/postSave'//通过调用图片接口

export default{
	postSave,
	postManAjax,
	coolProfile,
	svg,
	login,
	userList,
	setUser,
	profile1,
	profile
	
}