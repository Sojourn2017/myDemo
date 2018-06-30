$(document).ready(function () {
  getGroup();
});

// 获取群组列表
function getGroup() {
  let user = "id=1001";
  $.ajax({
    type:"get",
    url:"../mock/group.json",
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
            body.append(`<li class="list-group-item d-flex justify-content-between align-items-center">
                ${item}
                <span class="badge badge-danger badge-pill">${Math.floor(Math.random()*10)+1}</span>
                </li>`);
          }
        }
        $("#group-list").append(body);
      }
    }
  });
}

// 为各个群组进行事件委托
// 点击群组获取历史信息并展示
$("#group-list").on("click","li",function (ev) {
     ev = ev || window.event;
     let target = $(ev.target);
     target.children("span").empty();
     let group = target.text().toString();
     $.ajax({
       type:"get",
       url:"../mock/group-history.json",
       dataType:"json",
       data:group,
       success:function (res) {
         let data = res.result;
         let groupName = data.groupName;
         let chatHistory = data.chatHistory;
         let body = $(`<div></div>`);
         body.attr("style","min-width:100%;min-height:100%;");
         body.append(`
                <div class="group-title">${groupName}</div>
                <div class="chat-body modal-body" id="chat-body-id">
                    <ul class="list-unstyled" id="chat-body-ul">
                    </ul>
                </div>
                <div class="chat-footer modal-footer">
                    <div class="chat-input">
                        <input type="text" class="" id="chat-input-id" value="">
                    </div>
                    <button type="button" class="btn btn-primary " id="chat-send">发送</button>
                </div>
            `);
         for (let item of chatHistory) {
           if (item.status == 1) {
             body.children("#chat-body-id").children("#chat-body-ul").append(`
              <li class="media">
                 <div class="media-body">
                    <p><b style="color: #007bff">Yourself</b> <span>${item.time}</span></p>
                ${item.content}
                </div>
              </li>
              `);
           } else {
             body.children("#chat-body-id").children("#chat-body-ul").append(`
              <li class="media">
                 <div class="media-body">
                    <p><b>${item.name}</b> <span>${item.time}</span></p>
                ${item.content}
                </div>
              </li>
              `);
           }
         }
         $("#group-chat-content-id").empty();
         body.appendTo("#group-chat-content-id");
         listenClick();
       },
       error:function(err)
       {
         console.log(err);
       }
     });
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

// 向群组发送信息
function sendMsg() {
  let msg = $("#chat-input-id").val();
  let nowTime = getTime();
  let data = {};
  let msgFrame = `
  <li class="media">
        <div class="media-body">
        <p><b style="color: #007bff">Yourself</b> <span>${nowTime}</span></p>
           ${msg}
        </div>
   </li>
  `;
  data[nowTime] = msg;
  if (msg == "") {return}
  $("#chat-body-ul").append(msgFrame);
  $("#chat-input-id").val("");
  $("#chat-body-id").animate({scrollTop: $("#chat-body-ul").height()}, 0);
  $.ajax({
    type:"post",
    url:"",
    data:data,
    dataType:"json",
    success:function(res){

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

// jQuery禁止父元素滚动扩展
$.fn.scrollUnique = function() {
  return $(this).each(function() {
    var eventType = 'mousewheel';
    // 火狐是DOMMouseScroll事件
    if (document.mozHidden !== undefined) {
      eventType = 'DOMMouseScroll';
    }
    $(this).on(eventType, function(event) {
      // 一些数据
      var scrollTop = this.scrollTop,
        scrollHeight = this.scrollHeight,
        height = this.clientHeight;

      var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);

      if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
        // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
        this.scrollTop = delta > 0? 0: scrollHeight;
        // 向上滚 || 向下滚
        event.preventDefault();
      }
    });
  });
};

// 禁止聊天框父元素滚动
$("#chat-body-id").scrollUnique();