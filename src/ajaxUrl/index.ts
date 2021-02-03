let basUrl='/apiProxy/api/'
let bas='/apiProxy/'
let times=new Date().getTime()
console.log(times,'times')
let svg=basUrl+'svgCaptcha/svg?time='+times
let login=basUrl+'login/login'
let userList=basUrl+'user/userList'
let setUser=basUrl+'user/setUser'
let profile=bas+'profile'//图片上传
export default{
	svg,
	login,
	userList,
	setUser,
	profile
	
}