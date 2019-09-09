// JavaScript Document
//取出子元素中指定class的内容，并返回一个数组；
//parent-->父标签名，content-->子标签名；
function getChildElement(parent,content) {
    var contentArr=[];
    //取出所有的标签；
    var allcontent=parent.getElementsByTagName("*");
    //取出的标签筛选，只要指定为“content”的class内容；
    for (var i=0;i<allcontent.length;i++){
        //筛选存入数组；
        if (allcontent[i].className ==content){
            contentArr.push(allcontent[i]);
        }
    }
    //返回取出的结果；
     return contentArr;
}

//将图片添加，并且判断是否大于容器的长度；
//图片的来源由html指定；
function imgLocation(parent,content){
	//取出parent下所有的content；
	var cparent=document.getElementById(parent);
	//取出指定的class内容;
	var ccontent=getChildElement(cparent,content);
	//设置容器的横宽;
	//很管设置为页面的横宽；
	var pageWidth=Math.floor(document.documentElement.clientWidth);
	//设置样式;
	cparent.style.cssText="width:"+pageWidth+"px;margin:0 auto";
	
	//设置图像的横宽和，用与页面的宽度进行比较；
	var sum=0;
	//设置图像的顶坐标;
	var topSetNum=Math.floor(document.body.clientTop);
	//设置图像的初始化开始位置;
	var leftSetNum=Math.floor(document.body.clientLeft);
	
	//遍历数组;
	for (var i=0;i<ccontent;i++){
		//将第一行图片自动放入container中;;
		//取出来的图片宽度加和;
		sum +=ccontent[i].offsetWidth;
		//判断取出来的总长度;
		if (sum < pageWidth){
			//找到新增图片的左端坐标;
			var leftNum=sum - ccontent[i].offsetWidth;
			//设置图像属性;
			ccontent[i].style.position="absolute";
			//顶部；
			ccontent[i].style.top=topSetNum+"px";
			//左端;
			ccontent[i].style.left=leftNum+"px";
		}
		else{
			//因为高度固定，当进入此区域，意味着换行;
			//累加图片的高度即可;
			topSetNum +=ccontent[i].offsetHeight;
			//横宽和清零；
			sum=0;
			//设置图像的位置;
			//位置；
			ccontent[i].style.position="absolute";
			//顶部;
			ccontent[i].style.top=topSetNum+"px";
			//左端;
			ccontent[i].style.left=leftSetNum+"px";
		}
	}
	
}

//计算最后一张图片距离顶部的高度是否小于滚轮与页面之和；
function checkFlag() {
    //指定父元素；
    var cparent=document.getElementById("container");
    //取出子元素，并返回“box”的所有标签；
    var ccontent=getChildElement(cparent,"box");
    //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置；
    //指 obj 距离上方或上层控件的位置，整型，单位像素。
    //意为：获取最后一列的高度；
    var lastContentHeight=ccontent[ccontent.length-1].offsetTop;
    //滚动条滚动的高度；
    //console.log(lastContentHeight);
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    //页面的高度；
    //console.log(scrollTop);
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    //console.log(lastContentHeight+":"+scrollTop+":"+pageHeight);
    //滚动与页面之和大于图像的高度，即判断为超过容器大小，自动添加图像；
    if (lastContentHeight<scrollTop+pageHeight){
        return true;
    }
}

//main函数
//移动时，触发函数;
window.onload=function (){
    //对图片进行规范化调整，并进行判断；
    imgLocation("container","box");
    var imgData={"data":[		
		{"src":"pivix-冷色调和蒸汽朋克- (1).png"},
        {"src":"pivix-冷色调和蒸汽朋克- (2).jpg"},
        {"src":"pivix-冷色调和蒸汽朋克- (3).jpg"},	
		{"src":"pivix-冷色调和蒸汽朋克- (4).jpg"},
		{"src":"pivix-冷色调和蒸汽朋克- (5).jpg"},
		{"src":"pivix-冷色调和蒸汽朋克- (6).jpg"},
		{"src":"pivix-冷色调和蒸汽朋克- (7).jpg"},
		{"src":"pivix-冷色调和蒸汽朋克- (8).jpg"},
		{"src":"pivix-冷色调和蒸汽朋克- (9).jpg"},
                    ]};


    //滑轮滚动事件
    window.onscroll=function (){
        if (checkFlag()){
            var cparent = document.getElementById("container");
            //创建标签，增加图像；
            for (var i=0;i<imgData.data.length;i++){
                var ccontent = document.createElement("div");
                ccontent.className="box";
                cparent.appendChild(ccontent);
                var boximg=document.createElement("div");
                boximg.className="box_img";
                ccontent.appendChild(boximg);
                var img = document.createElement("img");
                img.src = imgData.data[i].src;
                boximg.appendChild(img);
            }
            imgLocation("container","box");
        }
    }
}