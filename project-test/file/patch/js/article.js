$(document).ready(function () {
  listenClick();
});

// 监听发送键与聊天时的enter键
function listenClick() {
  $("#chat-input-id").on("keypress",function (event) {
    let e = window.event || event;
    let key = e.keyCode ? e.keyCode : e.which;
    if (key === 13) {
      sendMsg();
    }
  });
  $("#chat-send").click(function () {
    sendMsg();
  })
}

// 发送留言信息
function sendMsg() {
  let userId = "1001" // 留言用户ID
  let userName = "张大炮"; // 留言用户名
  let msg = $("#chat-input-id").val();
  let time = getTime();
  let data = {
    "userId":userId,
    "time":time,
    "msg":msg
  };
  let msgFrame = `
  <li class="media">
        <div class="media-body">
        <p><b style="color: #007bff">${userName}</b> <span>${time}</span></p>
           ${msg}
        </div>
   </li>
  `;
  if (msg == "") {return}
  $("#chat-body-ul").append(msgFrame);
  $("#chat-input-id").val("");
  $("#chat-body-id").animate({scrollTop: $("#chat-body-ul").height()}, 0);

  // 向后台发送用户留言
  $.ajax({
    type:"post",
    url:"", // 接收留言接口
    data:data,
    dataType:"json",
    success:function(res){

    },
    error:function (err) {

    }
  });
  
}

// 获取当前时间 yyyy年mm月dd日hh:mm:ss
function getTime() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  minutes = minutes > 9 ? minutes : "0" + minutes;
  seconds = seconds > 9 ? seconds : "0" + seconds;
  let nowTime = `${year}年${month}月${day}日${hours}:${minutes}:${seconds}`;
  return nowTime;
}
