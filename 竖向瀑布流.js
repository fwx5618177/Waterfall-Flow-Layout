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


//将图片添加在最低图片的下方；
//图片来源为html指定；
function imgLocation(parent,content) {
    //将parent下所有的content全部取出
    var cparent=document.getElementById(parent);
    //取得指定class的数组内容；
    var ccontent=getChildElement(cparent,content);
    //返回首元素的宽度（包括元素宽度、内边距和边框，不包括外边距）；
    var imgWidth=ccontent[0].offsetWidth;
    
    //限定高度个数;
    //var imgWidth=ccontent[0].offsetHeight;
    
    //用 可见区域宽度/首元素的宽度，得到一行能放多少个图像的个数；
    var num=Math.floor(document.documentElement.clientWidth / imgWidth);
    
    //计算高度个数;
    //var num=Math.floor(document.documentElement.clientHeight / imgWidth);
    
    //规范化：设置css样式；
    //cparent相当于容器；
    //对container做css的宽度认定；
    cparent.style.cssText="width:"+imgWidth*num+"px;margin:0 auto";
    
    //高度限定；
    //cparent.style.cssText="height:"+imgWidth*num+"px;margin:0 auto";
    //将第二排图片放在第一排最小的图片下方；
    var BoxHeightArr=[];
    //遍历取出的指定的class的元素，并将其高度存放入数组中；
    for (var i=0;i<ccontent.length;i++){
        //如果在同一行内；
        if (i<num) {
            BoxHeightArr[i] = ccontent[i].offsetHeight;
            //收集图片的高度.
            //console.log(BoxHeightArr[i]);
        }else{
            //如果不在同一行内；
            //选择高度最小的；
            var minheight=Math.min.apply(null,BoxHeightArr);
            //得到BoxHeightArr里的索引号；
            var minIndex =getminheightLocation(BoxHeightArr,minheight);
            //位置：设定取出来的此元素的位置样式；
            ccontent[i].style.position="absolute";
            //高：顶部紧贴着最小的图像的底；
            ccontent[i].style.top=minheight+"px";
            //左：设置与整列的位置相同；
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            //将放在下面的几张图片视作一个容器，更新这个容器的高度，以此来让稍后的添加进行更新；
            BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
        }
    }
}


//得到高度最小的数据在BoxHeightArr数组中的索引号；
function getminheightLocation(BoxHeightArr,minHeight) {
    for (var i  in BoxHeightArr){
        if(BoxHeightArr[i]==minHeight){
            return i;
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