<template>
  <div
    :contenteditable= "editable"
    id="pic-input"
    v-text="inputText"
    @focus="inputFocusEvent($event)"
    @input="handleInput"
    @compositionstart="handleStart"
    @compositionend="handleEnd"
  >111</div>
</template>

<script>
export default {
  data() {
    return {
      editable: true,
      imgBlob: null,
      inputText: ""
    };
  },
  methods: {
    inputFocusEvent(event) {
      console.log(event);
    },
    handleInput(event) {
      let text = event.target.innerText;
      this.inputText = text;
      console.log(event);
    },
    validateTextLength(value) {
      // 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
      let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
      let mat = value.match(cnReg);
      let length;
      if (mat) {
        length = mat.length + (value.length - mat.length) * 0.5;
        return length;
      } else {
        return value.length * 0.5;
      }
    },
    valueHandle(event, strVale) {
      let _this = this;
      let text = strVale;
      this.sendContent = text;
      if (this.composing) {
        return;
      }
      let len = this.validateTextLength(text);
      if (len > 500) {
        this.$refs.Maincontent.innerHTML = text.substr(0, 500);
        this.$refs.Maincontent.focus();
      }
      setTimeout(() => {
        _this.keepLastIndex(event.target);
      }, 5);
      // 拓展 如果想要只需要前100位数据
      // this.content = this.content.substring(0, 100)
    },
    /**
     * 中文输入开始
     */
    handleStart() {
      this.composing = true;
    },
    /**
     * 中文输入结束
     */
    handleEnd($event) {
      this.composing = false;
      let text = $event.target.innerHTML;
      // console.log($event.target.innerHTML)
      this.valueHandle($event, text);
    },
    // 编辑
    editHandle() {
      this.editable = true;
      this.noDate = true;
      // let notice = this.NoticeContent
      // this.NoticeContent(false)
    }
  },
  mounted() {
    const self = this;
    let blob = null;
    document.addEventListener("paste", function(event) {
      console.log(event);
      var isChrome = false;
      if (event.clipboardData || event.originalEvent) {
        //某些chrome版本使用的是event.originalEvent
        var clipboardData =
          event.clipboardData || event.originalEvent.clipboardData;
        if (clipboardData.items) {
          // for chrome
          var items = clipboardData.items,
            len = items.length,
            blob = null;
          isChrome = true;
          for (var i = 0; i < len; i++) {
            console.log(items[i]);
            if (items[i].type.indexOf("image") !== -1) {
              //getAsFile() 此方法只是living standard firefox ie11 并不支持
              blob = items[i].getAsFile();
              console.log(blob);
              self.imgBlob = blob;
            }
          }
        }
      }
    });
    if (blob !== null) {
      var blobUrl = URL.createObjectURL(blob);
      //blob对象显示
      document.getElementById("imgNode").src = blobUrl;
      var reader = new FileReader();
      //base64码显示
      /* reader.onload = function(event) {
        // event.target.result 即为图片的Base64编码字符串
        var base64_str = event.target.result;

        document.getElementById("imgNode").src = base64_str;
      };
      reader.readAsDataURL(blob); */

      var fd = new FormData(document.forms[0]);
      fd.append("the_file", blob, "image.png");
      console.log(fd);
      // //创建XMLHttpRequest对象
      // var xhr = new XMLHttpRequest();
      // xhr.open("POST", "/image");
      // xhr.onload = function() {
      //   if (xhr.readyState === 4) {
      //     if (xhr.status === 200) {
      //       var data = JSON.parse(xhr.responseText);
      //       console.log(data);
      //     } else {
      //       console.log(xhr.statusText);
      //     }
      //   }
      // };
      // xhr.onerror = function(e) {
      //   console.log(xhr.statusText);
      // };
      // xhr.send(fd);
    }
  }
};
</script>

<style scoped>
#pic-input {
  min-height: 100px;
  padding: 2px 8px;
  border: 1px solid #808080;
  text-align: left;
}
</style>