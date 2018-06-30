$(document).ready(function () {
  getContact();
});

// 获取聊天记录并展示
$(window).on("load",function () {
  $("#contact-body-id").on("click","button",function (event) {
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
    })
  });
});

// 获取通讯录
function getContact() {
  let user = "id=1001";
  $.ajax({
    type:"get",
    url:"../mock/contact.json",
    dataType:"json",
    data:user,
    success:function(res){
      // console.log(data);
      if (res.status == 0) {
        alert(res.msg);
      } else {
        let data = res.result;
        let body = $(`<div></div>`);
        body.attr("style","min-width:100%;min-height:100%;");
        for (let item in data) {
          let arr = data[item];
          if (arr.length !== 0) {
            body.append(`<a id="${item}" href="##" class="list-group-item list-group-item-action title">${item}</a>`);
            arr.forEach(value=>{
              body.append(`<button type="button" class="list-group-item list-group-item-action" data-toggle="modal" data-target="#chat-modal">${value}</button>`)
            })
          }
        }
        $("#contact-body-id").append(body);
      }
    }
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
  let nowTime = getTime();
  let data = {};
  data[nowTime] = msg;
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



