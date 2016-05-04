//版权 北京智能社©, 保留所有权利
var json={
	mail: 	/^\w+@\w+\.[a-zA-Z]{2,3}\.[a-zA-Z]{1,2}$/,
	tel:	/^(0[1-9]\d{1,2}-?)?[1-9]\d{6,7}$/,
	age:	/^(1[6-9]|[2-9]\d|100)$/,
	user:	/^[\u4e00-\u9fa5]+$/,
	qq:		/^[0-9]{5,}$/,
	pass:	/^.{6,}$/,
	pass2:	/^.{6,}$/	
};

function checkForm(id,fn){
	var oFm=document.getElementById(id);
	var aIpt=document.getElementsByTagName('input');
	oFm.onsubmit=function(){
		
		var bOk=true;//假设校验合格
		
		for(var i=0;i<aIpt.length;i++){
			if(aIpt[i].name){//有name属性再向下走
				var re = json[aIpt[i].name];
				if(!check(re,aIpt[i])){//校验后如果返回false
					bOk=false;	
				}
			}
		}
		
		if(bOk==false){//如果校验不合格
			return false;	
		}
		
	};
	
	for(var i=0;i<aIpt.length;i++){
		if(aIpt[i].name){
			var re = json[aIpt[i].name];
			(function(re){
				aIpt[i].onblur=function(){
					check(re,this);
				};	
			})(re);
		}
	}
	
	function check(re,oIpt){
		if(!re.test(oIpt.value)){//代表第一次校验失败了
			oIpt.className='error';
			return false;
		}else{//代表第一次校验成功了
			if(oIpt.name=='pass2'){
				if(fn && fn(oIpt)==false){//pass2,他的2次校验失败了
					//2失败	
					oIpt.className='error';
					return false;
				}else{//pass2,他的2次校验成功
					//2成功
					oIpt.className='ok';
					return true;
				}	
			}else{
				oIpt.className='ok';//除pass2以外第一次校验成功了
				return true;
			}	
			
			
		}	
	}	
}

