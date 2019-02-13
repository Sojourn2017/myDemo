var app = new Vue({
  el: "#app",
  data: {
    split: 0.5,
    searchEngine: "google",
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
    searchString: ""
  },
  created: function() {},
  methods: {}
});

// var tsBtn = document.querySelector("#translate-btn");
// var tsInput = document.querySelector("#translate-input");
// var tsResult = document.querySelector("#translate-result");
// function postData(url, data) {
//   // Default options are marked with *
//   return fetch(url, {
//     body: JSON.stringify(data), // must match 'Content-Type' header
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, same-origin, *omit
//     headers: {
//       "user-agent": "Mozilla/4.0 MDN Example",
//       "content-type": "application/json"
//     },
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, cors, *same-origin
//     redirect: "follow", // manual, *follow, error
//     referrer: "no-referrer" // *client, no-referrer
//   }).then(response => response.json()); // parses response to JSON
// }
// tsBtn.addEventListener("click", function() {
//   var val = tsInput.value;
//   postData("./translate", {
//     text: val
//   })
//     .then(res => {
//       tsResult.innerText = JSON.stringify(res);
//     })
//     .catch(console.log);
// });
