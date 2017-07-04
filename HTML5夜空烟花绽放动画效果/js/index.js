
$(function(){
//	$(".ji").click(function(){
//		$(".alert").hide();
//		return false;
//	});
	var timeOut = function(){  //超时函数

		$("#lotteryBtn").rotate({

			angle:0, 

			duration: 10000, 

			animateTo: 2160, 
			callback:function(){

				alert('网络超时')

			}

		}); 

	}; 

	var rotateFunc = function(awards,angle,text){  //awards:奖项，angle:奖项对应的角度

		$('#lotteryBtn').stopRotate();

		$("#lotteryBtn").rotate({

			angle:0, 

			duration: 5000, 

			animateTo: angle+3600, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^

		}); 

	};

	$(".one").click(function(){
		$("#lotteryBtn").rotate();
		$(".yi .gif").show();
		rotateFunc(1,180,'恭喜您抽中的一等奖');
		 setTimeout("go(1,1)",5000)  ;
		$(this).attr("disabled","disabled");
		$(this).css("background","#af1439");	
	});
		
	$(".two").click(function(){
		$(".er .gif").show();
		$("#lotteryBtn").rotate();
		rotateFunc(2,300,'恭喜您抽中的二等奖');
		setTimeout("go(2,2)",5000)  ;
		$(this).attr("disabled","disabled");
		$(this).css("background","#af1439");
	});
	$(".three").click(function(){
		$(".san  .gif").show();
		$("#lotteryBtn").rotate();
		rotateFunc(3,70,'恭喜您抽中的三等奖');
		setTimeout("go(3,3)",5000);
		$(this).attr("disabled","disabled");
		$(this).css("background","#af1439");
	});
	$(".four").click(function(){
		$(".si .gif").show();
		$("#lotteryBtn").rotate();
		$(".alert").show();
		rotateFunc(4,230,'恭喜您抽中的四等奖');
		setTimeout("go(10,4)",5000);
		$(this).attr("disabled","disabled");
		$(this).css("background","#af1439");
	});
	$(".five").click(function(){
		$(".wu .gif").show();
		$("#lotteryBtn").rotate();
		$(".alert").show();
		rotateFunc(5,0,'恭喜您抽中的五等奖');
		setTimeout("go(10,5)",5000);
		$(this).attr("disabled","disabled");
		$(this).css("background","#af1439");
	});
	$(".six").click(function(){
		$(".liu .gif").show();
		$("#lotteryBtn").rotate();
		$(".alert").show();
		rotateFunc(6,130,'恭喜您抽中的六等奖');
		setTimeout("go(10,6)",5000);
		$(this).attr("disabled","disabled");
		$(this).css("background","#af1439");
	});
});
var canvas = document.getElementById("cas");
		var ocas = document.createElement("canvas");
		var octx = ocas.getContext("2d");
		var ctx = canvas.getContext("2d");
		ocas.width = canvas.width = window.innerWidth;
		ocas.height = canvas.height = window.innerHeight;
		var bigbooms = [];  
		window.onload = function(){  
			initAnimate()
		}

		function initAnimate(){

			lastTime = new Date();
			animate();
		}

		var lastTime;
		function animate(){
			ctx.save();
			 img = new Image();  
             img.src = "bj.jpg";
          	ctx.drawImage(img, 0, 0,ocas.width,ocas.height);
			ctx.restore();
			ctx.save();
			 img1 = new Image();  
			var newTime = new Date();
            if(newTime-lastTime>500+(window.innerHeight-767)/2){
				var random = Math.random()*100>2?true:false;
				var x = getRandom(canvas.width/5 , canvas.width*4/5);
				var y = getRandom(50 , 200);
				if(random){
					var bigboom = new Boom(getRandom(canvas.width/3,canvas.width*2/3) ,2,"#FFF" , {x:x , y:y});
					bigbooms.push(bigboom)
				}
				else {
					var bigboom = new Boom(getRandom(canvas.width/3,canvas.width*2/3) ,2,"#FFF" , {x:canvas.width/2 , y:200} , document.querySelectorAll(".shape")[parseInt(getRandom(0, document.querySelectorAll(".shape").length))]);
					bigbooms.push(bigboom)
				}
				lastTime = newTime;
				console.log(bigbooms)
			}

			stars.foreach(function(){
				this.paint();
			})

			drawMoon();

			bigbooms.foreach(function(index){
				var that = this;
				if(!this.dead){
					this._move();
					this._drawLight();
				}
				else{
					this.booms.foreach(function(index){
						if(!this.dead) {
							this.moveTo(index);
						}
						else if(index === that.booms.length-1){
							bigbooms[bigbooms.indexOf(that)] = null;
						}
					})
				}
			});
			
			raf(animate);
		}

		function drawMoon(){
			var moon = document.getElementById("moon");
			var centerX = canvas.width-200 , centerY = 100 , width = 80;
			if(moon.complete){
				ctx.drawImage(moon , centerX , centerY , width , width )
			}
			else {
				moon.onload = function(){
					ctx.drawImage(moon ,centerX , centerY , width , width)
				}
			}
			var index = 0;
			for(var i=0;i<10;i++){
				ctx.save();
				ctx.beginPath();
				ctx.arc(centerX+width/2 , centerY+width/2 , width/2+index , 0 , 2*Math.PI);
				ctx.fillStyle="rgba(240,219,120,0.005)";
				index+=2;
				ctx.fill();
				ctx.restore();
			}
			
		}

		Array.prototype.foreach = function(callback){
			for(var i=0;i<this.length;i++){
				if(this[i]!==null) callback.apply(this[i] , [i])
			}
		}

		var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
 		
		canvas.onclick = function(){
			var x = event.clientX;
			var y = event.clientY;
			var bigboom = new Boom(getRandom(canvas.width/3,canvas.width*2/3) ,2,"#FFF" , {x:x , y:y});
			bigbooms.push(bigboom)
		}



		var Boom = function(x,r,c,boomArea,shape){
			this.booms = [];
			this.x = x;
			this.y = (canvas.height+r);
			this.r = r;
			this.c = c;
			this.shape = shape || false;
			this.boomArea = boomArea;
			this.theta = 0;
			this.dead = false;
			this.ba = parseInt(getRandom(80 , 200));
		}
		Boom.prototype = {
			_paint:function(){
				ctx.save();
				ctx.beginPath();
				ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
				ctx.fillStyle = this.c;
				ctx.fill();
				ctx.restore();
			},
			_move:function(){
				var dx = this.boomArea.x - this.x , dy = this.boomArea.y - this.y;
				this.x = this.x+dx*0.01;
				this.y = this.y+dy*0.01;

				if(Math.abs(dx)<=this.ba && Math.abs(dy)<=this.ba){
					if(this.shape){
						this._shapBoom();
					}
					else this._boom();
					this.dead = true;
				}
				else {
					this._paint();
				}
			},
			_drawLight:function(){
				ctx.save();
				ctx.fillStyle = "rgba(255,228,150,0.3)";
				ctx.beginPath();
				ctx.arc(this.x , this.y , this.r+3*Math.random()+1 , 0 , 2*Math.PI);
				ctx.fill();
				ctx.restore();
			},
			_boom:function(){
				var fragNum = getRandom(30 , 200);
				var style = getRandom(0,10)>=5? 1 : 2;
				var color;
				if(style===1){
					color = {
						a:parseInt(getRandom(128,255)),
						b:parseInt(getRandom(128,255)),
						c:parseInt(getRandom(128,255))
					}
				}

				var fanwei = parseInt(getRandom(300, 400));
				for(var i=0;i<fragNum;i++){
					if(style===2){
						color = {
							a:parseInt(getRandom(128,255)),
							b:parseInt(getRandom(128,255)),
							c:parseInt(getRandom(128,255))
						}
					}
					var a = getRandom(-Math.PI, Math.PI);
					var x = getRandom(0, fanwei) * Math.cos(a) + this.x;
					var y = getRandom(0, fanwei) * Math.sin(a) + this.y; 
					var radius = getRandom(0 , 2)
					var frag = new Frag(this.x , this.y , radius , color , x , y );
					this.booms.push(frag);
				}
			},
			_shapBoom:function(){
				var that = this;
				putValue(ocas , octx , this.shape , 5, function(dots){
					var dx = canvas.width/2-that.x;
					var dy = canvas.height/2-that.y;
					for(var i=0;i<dots.length;i++){
						color = {a:dots[i].a,b:dots[i].b,c:dots[i].c}
						var x = dots[i].x;
						var y = dots[i].y;
						var radius = 1;
						var frag = new Frag(that.x , that.y , radius , color , x-dx , y-dy);
						that.booms.push(frag);
					}
				})
			}
		}

		function putValue(canvas , context , ele , dr , callback){
			context.clearRect(0,0,canvas.width,canvas.height);
			var img = new Image();
			if(ele.innerHTML.indexOf("img")>=0){
				img.src = ele.getElementsByTagName("img")[0].src;
				imgload(img , function(){
					context.drawImage(img , canvas.width/2 - img.width/2 , canvas.height/2 - img.width/2);
					dots = getimgData(canvas , context , dr);
					callback(dots);
				})
			}
			else {
				var text = ele.innerHTML;
				context.save();
				var fontSize =200;
				context.font = fontSize+"px 宋体 bold";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillStyle = "rgba("+parseInt(getRandom(128,255))+","+parseInt(getRandom(128,255))+","+parseInt(getRandom(128,255))+" , 1)";
				context.fillText(text , canvas.width/2 , canvas.height/2);
				context.restore();
				dots = getimgData(canvas , context , dr);
				callback(dots);
			}
		}

		function imgload(img , callback){
			if(img.complete){
				callback.call(img);
			}
			else {
				img.onload = function(){
					callback.call(this);
				}
			}
		}

		function getimgData(canvas , context , dr){
			var imgData = context.getImageData(0,0,canvas.width , canvas.height);
			context.clearRect(0,0,canvas.width , canvas.height);
			var dots = [];
			for(var x=0;x<imgData.width;x+=dr){
				for(var y=0;y<imgData.height;y+=dr){
					var i = (y*imgData.width + x)*4;
					if(imgData.data[i+3] > 128){
						var dot = {x:x , y:y , a:imgData.data[i] , b:imgData.data[i+1] , c:imgData.data[i+2]};
						dots.push(dot);
					}
				}
			}
			return dots;
		}

		function getRandom(a , b){
			return Math.random()*(b-a)+a;
		}


		var maxRadius = 1 , stars=[];

		var Star = function(x,y,r){
			this.x = x;this.y=y;this.r=r;
		}
		Star.prototype = {
			paint:function(){
				ctx.save();
				ctx.beginPath();
				ctx.arc(this.x , this.y , this.r , 0 , 2*Math.PI);
				ctx.fillStyle = "rgba(255,255,255,"+this.r+")";
				ctx.fill();
				ctx.restore();
			}
		}

		var focallength = 250;
		var Frag = function(centerX , centerY , radius , color ,tx , ty){
			this.tx = tx;
			this.ty = ty;
			this.x = centerX;
			this.y = centerY;
			this.dead = false;
			this.centerX = centerX;
			this.centerY = centerY;
			this.radius = radius;
			this.color = color;
		}

		Frag.prototype = {
			paint:function(){
				ctx.save();
				ctx.beginPath();
				ctx.arc(this.x , this.y , this.radius , 0 , 2*Math.PI);
				ctx.fillStyle = "rgba("+this.color.a+","+this.color.b+","+this.color.c+",1)";
				ctx.fill()
				ctx.restore();
			},
			moveTo:function(index){
				this.ty = this.ty+0.3;
				var dx = this.tx - this.x , dy = this.ty - this.y;
				this.x = Math.abs(dx)<0.1 ? this.tx : (this.x+dx*0.1);
				this.y = Math.abs(dy)<0.1 ? this.ty : (this.y+dy*0.1);
				if(dx===0 && Math.abs(dy)<=80){
					this.dead = true;
				}
				this.paint();
			}
		}
		function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
  }
  var awardListDom=document.getElementById("awardListDom"),
  firstPrize=document.getElementById("firstPrize"),
  submit=document.getElementById("submit");
  var awardList=["吕玉力","赵  晓","李沐然","张文枢","曾琪祥","王洁琼","侯文雪","何  笑","闫玉珍","张宝柱","朱森瑞","刘宝莲","张丰良","龚建兵","田志辉","杨  涛","尹时光","杨一帆","武云利","秦国华","赵勃航","秦昌柱","刘宏超","东晓峰","崔方娜","薛光辉","邓  慧","孙常成","张  博","王月英","李  炎","闫  俊","刘  洋","刘  潮","仇长生","李皖都","李  野","王  磊","王东林","李  珊","董有红","郜路阳","孙文慧","唐永强","孟豪帅","宋亚正","孔祥磊","李亚振","鲁丽微","陈雨顺","高海宾","张云逸","房秋宇","施志聪","同小杰","李素伟"];
  var firstList=[];
  var scondList=[];
  var thirdList=[];
  var fourList=[];
  var fiveList=[];
  var sixList=[];
  function go(firstPrizeber,prize){
   for(var i=0;i<firstPrizeber;i++){
	   var oldArray=awardList;
	   var rfirstPrize=random(0,oldArray.length);
	   if(oldArray.length<1){
	    awardListDom.value="活动结束";
	    firstPrize.value="活动结束";
	   }
	   else{
		if (firstPrizeber==1 && prize==1) {
	    	firstPrize.value=oldArray[rfirstPrize];
			firstList.push(firstPrize.value+" ");
			var index = 0;
			$(".yi .gif").hide();
			var _setInterval1 = setInterval(function () { 
				$(".yi li").html(awardList[index]);
				++index;
				if (index >= awardList.length) {
					clearInterval(_setInterval1);
				}
			}, 50);
			$(".yi li").html(firstList[0]);
					var showLable = $(".yi li").html();
						$(".yi li").lbyl({
						content: showLable,
						speed: 300,
						type: 'show'
					});
					clearInterval(_setInterval1);
		}
		if (firstPrizeber==2 && prize==2) {
	    	var secondPrize =oldArray[rfirstPrize];
			scondList.push(secondPrize+" ");
			var index = 0;
			$(".er .gif").hide();
			var _setInterval2 = setInterval(function () { 
				$(".er li").html(awardList[index]);
				++index;
				if (index >= awardList.length) {
					clearInterval(_setInterval2);
				}
			}, 50);
			
			$(".er li").html(scondList[0]+scondList[1]);
					var showLable = $(".er li").html();
						$(".er li").lbyl({
						content: showLable,
						speed: 300,
						type: 'show'
					});
					clearInterval(_setInterval2);
		}
		if (firstPrizeber==3 && prize==3) {
	    	var thirdPrize=oldArray[rfirstPrize];
			thirdList.push(thirdPrize+" ");
			var index = 0;
			$(".san .gif").hide();
			var _setInterval3 = setInterval(function () { 
				$(".san li").html(awardList[index]);
				++index;
				if (index >= awardList.length) {
					clearInterval(_setInterval3);
				}
			}, 50);
			$(".san li").html(thirdList[0]+thirdList[1]+thirdList[2]);
					var showLable = $(".san li").html();
						$(".san li").lbyl({
						content: showLable,
						speed:300,
						type: 'show'
					});
					clearInterval(_setInterval3);
		}
		if (firstPrizeber==10 && prize==4) {
	    	var fourPrize=oldArray[rfirstPrize];
			fourList.push(fourPrize+" ");
			var index = 0;
			$(".si .gif").hide();
			var _setInterval4 = setInterval(function () { 
				$(".si li").html(awardList[index]);
				++index;
				if (index >= awardList.length) {
					clearInterval(_setInterval4);
				}
			}, 50);
			$(".si li").html(fourList[0]+fourList[1]+fourList[2]+fourList[3]+fourList[4]+fourList[5]+fourList[6]+fourList[7]+fourList[8]+fourList[9]);
					var showLable = $(".si li").html();
						$(".si li").lbyl({
						content: showLable,
						speed: 300,
						type: 'show'
					});
					clearInterval(_setInterval4);
		}
		if (firstPrizeber==10 && prize==5) {
	    	var fivePrize=oldArray[rfirstPrize];
			fiveList.push(fivePrize+" ");
			var index = 0;
			$(".wu .gif").hide();
			var _setInterval5 = setInterval(function () { 
				$(".wu li").html(awardList[index]);
				++index;
				if (index >= awardList.length) {
					clearInterval(_setInterval5);
				}
			}, 50);
			$(".wu li").html(fiveList[0]+fiveList[1]+fiveList[2]+fiveList[3]+fiveList[4]+fiveList[5]+fiveList[6]+fiveList[7]+fiveList[8]+fiveList[9]);
					var showLable = $(".wu li").html();
						$(".wu li").lbyl({
						content: showLable,
						speed: 300,
						type: 'show'
					});
					clearInterval(_setInterval5);
		}
		if (firstPrizeber==10 && prize==6) {
	    	var sixPrize=oldArray[rfirstPrize];
			sixList.push(sixPrize+" ");
			var index = 0;
			$(".liu .gif").hide();
			var _setInterval6 = setInterval(function () { 
				$(".liu li").html(awardList[index]);
				++index;
				if (index >= awardList.length) {
					clearInterval(_setInterval6);
				}
			}, 50);
			$(".liu li").html(sixList[0]+sixList[1]+sixList[2]+sixList[3]+sixList[4]+sixList[5]+sixList[6]+sixList[7]+sixList[8]+sixList[9]);
					var showLable = $(".liu li").html();
						$(".liu li").lbyl({
						content: showLable,
						speed: 300,
						type: 'show'
					});
					clearInterval(_setInterval6);
		}
	    oldArray.splice(rfirstPrize,1);
	    awardListDom.value=oldArray;
	   }
   }
}
