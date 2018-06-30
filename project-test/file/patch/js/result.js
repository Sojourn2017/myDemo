$(document).ready(function () {
  getResult();
  addDelegate();
});

// 获取查询结果数据并展示
function getResult() {
  let query = "广州中医药大学";
  $.ajax({
    type:"get",
    url:"../mock/people.json",
    dataType:"json",
    data:query,
    success:function(res){
      // console.log(data);
      if (res.status == 0) {
        alert(res.msg);
      } else {
        let data = res.result;
        let body = $("<div></div>");
        for (let item of data) {
          body.append(`
            <tr>
                <td><a href="##" name="${item[0]}"  data-toggle="modal" data-target="#chat-modal">${item[1]}</a></td>
                <td>${item[2]}</td>
                <td>${item[3]}</td>
                <td>${item[4]}</td>
                <td>${item[5]}</td>
                <td>${item[6]}</td>
                <td>${item[7]}</td>
            </tr>
          `);
        }
        body.children().appendTo($("#query-result > tbody"));
      }
    }
  });
}

// 添加事件委托
function addDelegate() {
  $("#query-result > tbody").on("click","a",function (event) {
    let Contact = $(event.target);
    $.ajax({
        type:"get",
        url:"../mock/chat-history.json",
        dataType:"json",
        data:Contact,
        success:function (res) {
          if (res.status == 0) {
            alert(res.msg);
          } else {
            $("#chat-body").empty();
            let data = res.result;
            for (let item in data) {
              let arr = data[item];
              let frame;
              if (arr[0] == 1) {
                frame = `<div class="popover fade show bs-popover-right chat-frame float-right chat-frame-user">
                        <div class="arrow" style="top: 8px;"></div>
                        <div class="popover-body">
                            <div class="chat-time">${item}</div>
                            <div>${arr[1]}</div>
                        </div>
                    </div>`;
              } else {
                frame = `<div class="popover fade show bs-popover-right chat-frame float-left">
                        <div class="arrow" style="top: 8px;"></div>
                        <div class="popover-body">
                            <div class="chat-time">${item}</div>
                            <div>${arr[1]}</div>
                        </div>
                    </div>`;
              }
              $(frame).appendTo("#chat-body");
            }
            $("#chat-title").html(Contact.html());
            loadModal();
          }
        }
    });
  });
}

// 点击加载聊天模态框
function loadModal() {
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

// 发送信息
function sendMsg() {
  let msg = $("#chat-input-id").val();
  let msgFrame = `<div class="popover fade show bs-popover-left chat-frame float-right chat-frame-user">
                        <div class="arrow"></div>
                        <div class="popover-body">${msg}</div>
                    </div>`;
  let time = getTime();
  let data = {};
  data[time] = msg;
  if (msg == "") {return}
  $("#chat-body").append(msgFrame);
  $("#chat-input-id").val("");
  $("#chat-body").animate({scrollTop: $("#chat-body").height()}, 0);
  $.ajax({
    type:"post",
    url:"",
    data:data,
    dataType:"json",
    success:function(res){

    }
  });
}

// 获取当前时间
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