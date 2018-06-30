$(document).ready(function () {
  getUserInfo();
});

// 获取用户个人信息
function getUserInfo() {
  let user = "id=1001";
  $.ajax({
    type:"get",
    url:"../mock/setting.json",
    dataType:"json",
    data:user,
    success:function(res){
      // console.log(data);
      if (res.status == 0) {
        alert(res.msg);
      } else {
        let data = res.result;
        for (let item in data) {
          if ($(`#user-${item}`)) {
            $(`#user-${item}`).val(data[item]);
          }
        }
      }
    }
  });
}

// 点击确认修改并重新获取信息
$("#save-person-info-change").click(function () {
  let data = JSON.stringify({
    "id":$("#user-id").val(),
    "name":$("#user-name").val(),
    "sex":$("#user-sex").val(),
    "age":$("#user-age").val(),
    "mail":$("#user-mail").val(),
    "school":$("#user-school").val(),
    "major":$("#user-major").val(),
    "grade":$("#user-grade").val(),
    "class":$("#user-class").val(),
    "company":$("#user-company").val(),
    "job":"医师"
  });
  // $.ajax({
  //   type:"post",
  //   url:"",
  //   data:data,
  //   dataType:"json",
  //   success:function(res){
  //     window.location.reload();
  //     // if (res.status == 1) {
  //     //   alert("修改成功");
  //     // } else {
  //     //   alert(res.msg);
  //     // }
  //   }
  // });
  window.location.reload();
});