$(document).ready(function () {
  // 监听收藏按钮点击事件
  $("#thread-list-id").on("click",".subscribe",function (event) {
    let userId = "1001";
    let Contact = $(event.target);
    let status = {"userId":userId,"isSubscribe":0};
    if (Contact.attr("class") == "fa fa-star-o") {
      Contact.attr("class","fa fa-star");
      status.isSubscribe = 1;
    } else {
      Contact.attr("class","fa fa-star-o");
      status.isSubscribe = 0;
    }

    $.ajax({
      type:"post",
      url:"../mock/collection.json", // 接收文章收藏标志的接口地址
      dataType:"json",
      data:status,
      success:function (res) {
        if (res.status == 0) {
          alert(res.msg);
        } else {
          
        }
      },
      error:function () {
        
      }
    })
  })
});