var app = new Vue({
  el: "#app",
  data: {
    split: 0.5,
    searchEngine: "baidu",
    searchEngineList: [
      {
        value: "google",
        label: "谷歌"
      },
      {
        value: "baidu",
        label: "百度"
      },
      {
        value: "youdao",
        label: "有道"
      }
    ],
    searchString: "这是一个很长的句子： 用于测试翻译测试工具。",
    translateResult: null,
    sourceLang: "中文",
    resultLang: "英语",
    searchTimer: null,
    loadingTsFlag: false,
  },
  computed: {
    searchResult: function() {
      var result = this.translateResult;
      return result ? result.result.join(", ") : "";
    },
    keywords: function() {
      // 重点词汇
      return this.getChainProperty(this.translateResult, [
        "raw",
        "trans_result",
        "keywords"
      ]);
    }
  },
  created: function() {
    this.searchFn(1);
  },
  methods: {
    searchFn: function (isImmediate) {
      clearTimeout(this.searchTimer);
      this.loadingTsFlag = true;
      this.searchTimer = setTimeout(this.getTranslate, 1000)
    },
    getTranslate: function() {
      this.postData("./translate", {
        text: this.searchString
      })
        .then(res => {
          this.translateResult = res;
          this.loadingTsFlag = false;
        })
        .catch(console.log);
    },
    clearText: function () {

    },
    copyText: function(type) {
      var input = this.$refs.input;
      switch (type) {
        case "source":
          input.value = this.searchString;
          break;
        case "result":
          input.value = this.searchResult;
          break;
      }
      input.select(); // 选择对象
      document.execCommand("copy"); // 执行浏览器复制命令
      input.blur();
    },
    exchangeLang: function() {
      var tmp = this.sourceLang;
      this.sourceLang = this.resultLang;
      this.resultLang = tmp;
      this.searchString = this.searchResult;
      this.searchFn(1);
    },
    getChainProperty: function(origin, chainArr) {
      var res = origin;
      while (chainArr.length > 0) {
        if (!res) {
          return null;
        }
        var cur = chainArr.shift();
        res = res[cur];
      }
      return res;
    },
    postData: function(url, data) {
      // Default options are marked with *
      return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
          "user-agent": "Mozilla/4.0 MDN Example",
          "content-type": "application/json"
        },
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer" // *client, no-referrer
      }).then(response => response.json()); // parses response to JSON
    }
  }
});
