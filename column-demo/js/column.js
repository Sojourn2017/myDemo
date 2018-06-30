window.onload = function(){
    getPatient();
};

//获取病人列表
let getPatient = function() {
    let patientData;
    let context=$("<div></div>");        //创建一个div放置列表内容
    context.attr("style","min-width:100%;min-height:100%;");        //给div设置style属性
    $.ajax({  
        type:"get",  
        url:"../mock/patient.json",
        dataType:"json",
        success:function(data){  
            patientData = data;
            if(patientData) {
                $("#waiting-list-context").empty(); //先清空列表内容

                //遍历数据，动态添加病人信息
                patientData.PatientInfo.forEach((item,index)=>{
                    //根据数据向盒子里添加病人信息列表
                    let row = $("<div></div>");   //为每一名病人定义一个div
                    row.attr("id",`id${item.RegisterId}`);   //给div添加id属性
                    row.attr("class","patient-list-row");   //给div 添加类名
                    row.addClass("feedback");     //添加悬浮反馈伪类

                    //奇数行背景设为白色，实现条纹效果
                    if(index%2 == 0){
                        row.attr("style","background:rgba(255,255,255,0.5)");
                    }else {
                        row.attr("style","border-bottom:1px solid rgba(255,255,255,1)");
                    }

                    //将病人id和病人姓名显示在div内
                    row.html(`<span>${item.RegisterId}：${item.name}</span>`);

                    //将病人信息div放入列表内容div
                    context.append(row);

                    //为每一个div添加监听点击事件
                    row.click(function(){
                        alert(`${item.RegisterId}`);
                    });
                });

                // 将列表内容div放入页面中 id = WaitingListContext 的div
                $("#waiting-list-context").append(context);

                //在页面中显示列表内容
                $("#waiting-list-context").css("display","block");
            }else{
			  //若不能获取到数据，提示错误
                $("#waiting-list-context").empty();
                $("#waiting-list-context").html("<span>无法获取到数据</span>");
                $("#waiting-list-context").css("display","block");
            }
        }
    });
};

//监听完成列表点击事件
$("#finish").click(function(){
    $("#finish-list-context").css("display","block");
    $("#finish-triangle").css("transform","rotate(-90deg)");
    $("#handing-list-context").css("display","none");
    $("#handing-triangle").css("transform","rotate(0deg)");
    $("#waiting-list-context").css("display","none");
    $("#waiting-triangle").css("transform","rotate(0deg)");
});

//监听挂起列表点击事件
$("#handing").click(function(){
    $("#finish-list-context").css("display","none");
    $("#finish-triangle").css("transform","rotate(0deg)");
    $("#handing-list-context").css("display","block");
    $("#handing-triangle").css("transform","rotate(-90deg)");
    $("#waiting-list-context").css("display","none");
    $("#waiting-triangle").css("transform","rotate(0deg)");
});

//监听待诊列表点击事件
$("#waiting").click(function(){
    $("#finish-list-context").css("display","none");
    $("#finish-triangle").css("transform","rotate(0deg)");
    $("#handing-list-context").css("display","none");
    $("#handing-triangle").css("transform","rotate(0deg)");
    $("#waiting-list-context").css("display","block");
    $("#waiting-triangle").css("transform","rotate(-90deg)");
    getPatient();
});

