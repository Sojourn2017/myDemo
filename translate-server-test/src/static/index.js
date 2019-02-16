var app = new Vue({
  el: "#app",
  data: {
    langDict: {},
    normalLang: [
      { code: "auto", lang: "自动检测" },
      { code: "zh-CN", lang: "中文" },
      { code: "en", lang: "英语" }
    ],
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
    searchString: "给饼干儿的翻译工具1.0",
    translateResult: null,
    sourceLang: { code: "auto", lang: "自动检测" },
    sourceLangList: [],
    resultLang: { code: "en", lang: "嘤语" },
    resultLangList: [],
    getTsTimer: null,
    loadingTsFlag: false,
    sourceAudioUri: "",
    resultAudioUri: "",
    selectLangFlag: false,
    selectLangType: ""
  },
  computed: {
    normalLangFormat: function() {
      if (this.searchEngine === "youdao") {
        return this.normalLang.slice(1);
      } else {
        if (this.selectLangType === "source") {
          return this.normalLang;
        } else if (this.selectLangType === "result") {
          return this.normalLang.slice(1);
        }
      }
      return [];
    },
    searchResult: function() {
      var result = this.translateResult;
      return result && result.result ? result.result.join(", ") : "";
    },
    word_name: function() {
      if (this.simple_means) {
        return this.simple_means.word_name || "";
      }
      return "";
    },
    simple_means: function() {
      // 简明释义
      return this.getChainProperty(this.translateResult, [
        "raw",
        "dict_result",
        "simple_means"
      ]);
    },
    word_parts: function() {
      if (this.simple_means) {
        var parts = this.simple_means.symbols;
        if (Array.isArray(parts)) {
          var res = [];
          parts.forEach((item) => {
            if (Array.isArray(item.parts)) {
              res = res.concat(item.parts);
            }
          })
          return res;
        }
      }
      return [];
    },
    word_exchange: function() {
      if (this.simple_means) {
        var exc = this.simple_means.exchange;
        if (exc) {
          var res = [];
          var dict = this.langDict.exchange;
          Object.keys(exc).forEach((key) => {
            if (Array.isArray(exc[key])) {
              res.push({key: dict.codeToName(key), val: exc[key].join('; ')})
            }
          })
          return res;
        }
      }
      return [];
    },
    keywords: function() {
      // 重点词汇
      return this.getChainProperty(this.translateResult, [
        "raw",
        "trans_result",
        "keywords"
      ]);
    },
    showSourceAudioIcon: function() {
      if (this.searchEngine === "baidu") {
        return true;
      }
      return false;
    },
    showResultAudioIcon: function() {
      if (this.searchEngine !== "google") {
        return true;
      }
      return false;
    }
  },
  watch: {
    searchString: function(newVal) {
      if (newVal === "") {
        this.translateResult = null;
      } else {
        this.getTsFn();
      }
    },
    searchEngine: function(newVal) {
      if (newVal === "youdao" && this.sourceLang.code === 'auto') {
        this.sourceLang = { code: "zh-CN", lang: "中文" };
      }
    }
  },
  created: function() {
    this.langDict = window.LD;
    this.loadingTsFlag = true;
    this.getTranslate();
    this.searchEngine === "baidu" && this.getAudioUri("source");
  },
  methods: {
    getTsFn: function() {
      clearTimeout(this.getTsTimer);
      this.loadingTsFlag = true;
      this.getTsTimer = setTimeout(() => {
        this.getTranslate();
        this.searchEngine === "baidu" && this.getAudioUri("source");
      }, 40);
    },
    getTranslate: function() {
      if (this.searchString === "") {
        this.loadingTsFlag = false;
        return;
      }
      var timer = this.getTsTimer;
      this.loadingTsFlag = true;
      var params = {};
      this.postData("./translate", {
        text: this.searchString,
        engine: this.searchEngine,
        from:
          this.sourceLang.code === "auto" ? undefined : this.sourceLang.code,
        to: this.resultLang.code
      })
        .then(res => {
          // 对最后一个请求赋值
          if (timer === this.getTsTimer) {
            this.translateResult = res;
            var dict = this.langDict.google;
            if (res.from) {
              this.sourceLang = {code: res.from, lang: dict.codeToName(res.from)};
            }
            if (res.to) {
              this.resultLang = {code: res.to, lang: dict.codeToName(res.to)};
            }
            this.searchEngine !== "google" && this.getAudioUri("result");
          }
        })
        .catch(err => {
          this.showMsg(err, "error");
        })
        .then(() => {
          timer === this.getTsTimer && (this.loadingTsFlag = false);
        });
    },
    getAudioUri: function(type) {
      var text = type === "source" ? this.searchString : this.searchResult;
      if (text === "") return;
      this.postData("./audio", {
        text: type === "source" ? this.searchString : this.searchResult,
        engine: this.searchEngine
      })
        .then(res => {
          if (type === "source") {
            this.sourceAudioUri = res.audioUri;
          } else if (type === "result") {
            this.resultAudioUri = res.audioUri;
          }
        })
        .catch(err => {
          this.showMsg(err, "error");
        });
    },
    selectLang: function(item) {
      if (this.selectLangType === "source") {
        this.sourceLang = item;
        this.searchEngine === "youdao" &&
          item.code !== "zh-CN" &&
          (this.resultLang = { code: "zh-CN", lang: "中文" });
      } else if (this.selectLangType === "result") {
        this.resultLang = item;
        this.searchEngine === "youdao" &&
          item.code !== "zh-CN" &&
          (this.sourceLang = { code: "zh-CN", lang: "中文" });
      }
      this.selectLangFlag = false;
      this.getTsFn();
    },
    clearText: function() {
      this.searchString = "";
      this.sourceAudioUri = "";
      this.resultAudioUri = "";
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
      this.showMsg("复制成功", "success");
    },
    exchangeLang: function() {
      var tmp = this.sourceLang;
      this.sourceLang = this.resultLang;
      this.resultLang = tmp;
      this.searchString = this.searchResult;
      this.getTsFn();
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
    showMsg: function(msg, type = "info") {
      this.$Message[type](msg);
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
