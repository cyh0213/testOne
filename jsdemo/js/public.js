//获取非行内元素样式值函数   返回的是字符串   不能直接使用   在应用的时候要parseInt()转换一下
function getStyle(obj,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,false)[attr];//谷歌
	}else{
		return obj.currentStyle[attr];//ie
	}
}
//创建DOM元素
function create(element){
	var e = document.createElement(element);
	return e;
}

//根据给定的id 查找页面元素
function $id(id){
	return document.getElementById(id);
}

//判断两物体是否有碰撞
function pz(obj1,obj2){
	//第一个物体与第二个物体碰撞的临界值
	var L1 = obj1.offsetLeft;
	var R1 = obj1.offsetLeft + obj1.offsetWidth;
	var T1 = obj1.offsetTop;
	var B1 = obj1.offsetTop + obj1.offsetHeight;
	
	//第二个物体与第一个物体碰撞的临界值
	var L2 = obj2.offsetLeft;
	var R2 = obj2.offsetLeft + obj2.offsetWidth;
	var T2 = obj2.offsetTop;
	var B2 = obj2.offsetTop + obj2.offsetHeight;
	
	if( R1<L2||L1>R2||B1<T2||T1>B2 ){//碰不上的条件
		return false;//碰不上
	}else{
		return true;//碰上了 
	}
	
	
}


//获取某个范围内的随机数
function rand(min,max){
	return Math.round(Math.random()*(max-min))+min;
}


//缓冲  ---多物体运动
//obj  要操作的元素
//target  要达到的目标值
//attr   要操作的行内元素
//callback   回调函数
function startMove(obj,target,attr,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var current = 0;
		if(attr=="opacity"){//对于透明度的操作
			current = parseFloat( getStyle(obj,attr) * 100 );//因为计算机对小数的操作有误差     将其放大100倍    通过整数进行操作    在最后赋值的时候  再缩小100倍
		}else{
			current = parseInt( getStyle(obj,attr) );//获取行内元素
		}
		var speed  = (target - current)/10;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if(current == target){
			clearInterval(obj.timer);
			//上一个动作完成   进入下一个动作
			if(callback){
				callback();
			}

		}else{
			if(attr=="opacity"){
				obj.style[attr]  = (current + speed) / 100;
			}else{
				obj.style[attr] = current + speed + 'px';
				
			}

		}
	},30)
}


//事件监听  兼容
function addEvent(obj,type,callback){
	if(obj.addEventListener){//高版本
		obj.addEventListener(type,callback);
	}else{//低版本
		obj.attachEvent("on" + type,callback)
	}
}




//完美运动   原理  ：同时传递多个属性和值    通过json对象完成     json = {attr:target,attr:target,....}
//obj  要操作的元素
//json   {attr : target}
//callback   回调函数
function startMove2(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;//定时器中   定义一个开关变量     表示每次经过设定的时间后   重置一次开关变量         这里当开关变量值为true时    可以停止定时器
		var current = 0;
		for(var attr in json){
			if(attr=="opacity"){//对于透明度的操作
				current = parseFloat( getStyle(obj,attr) * 100 );//因为计算机对小数的操作有误差     将其放大100倍    通过整数进行操作    在最后赋值的时候  再缩小100倍
			}else if(attr=="zIndex"){
				current = parseInt( getStyle(obj,attr) );//获取行内元素
				
			}else{
				current = parseInt( getStyle(obj,attr) );//获取行内元素
			}
			var speed  = (json[attr] - current)/10;
			//console.log(speed)
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(current != json[attr]){
				flag = false;
	
			}
			if(attr=="opacity"){
				obj.style[attr]  = (current + speed) / 100;
			}else if(attr=="zIndex"){
				obj.style[attr] = json[attr];
			}else{
				obj.style[attr] = current + speed + 'px';
				
			}
	
			
		}
		//循环执行后   判断flag值   如果是true   停止定时器
		if(flag){
			clearInterval(obj.timer);
				//上一个动作完成   进入下一个动作
			if(callback){
				callback();
			}
		}
	},30)
}

function getColor(){
	//0--9  a--f
	var str = "0123456789abcdef";//下标0--15
	var color = "#";
	for(var i = 1; i <= 6 ; i++){//循环六次  获得颜色值
		color += str.charAt( rand(0,15) );//根据随机的下标得到对应的字符
	}
	return color;

}








































