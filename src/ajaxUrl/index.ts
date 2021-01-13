let basUrl='/apiProxy/api/'
let times=new Date().getTime()
console.log(times,'times')
let svg=basUrl+'svgCaptcha/svg?time='+times
let login=basUrl+'login/login'
export default{
	svg,
	login
	
}