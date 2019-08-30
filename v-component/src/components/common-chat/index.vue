<template>
  <div class="common-chat">
    <common-chat
      ref="v_input"
      :chatInfoEn="chatInfoEn"
      :oprRoleName=" 'client'"
      @sendMsg="sendMsg"
      @chatCallback="chatCallback"
    ></common-chat>
  </div>
</template>

<script>
import commonChat from "./common-chat";

export default {
  components: {
    commonChat: commonChat
  },
  data() {
    return {
      chatInfoEn: {
        chatState: "robot", // chat状态；robot 机器人、agent 客服
        inputContent: "", // 输入框内容
        msgList: [], // 消息列表
        state: "on", // 连接状态;on ：在线；off：离线
        lastMsgShowTime: null // 最后一个消息的显示时间
      } // 会话信息，包括聊天记录、状态
    };
  },

  methods: {
    /**
     * chat回调
     */
    chatCallback(rs) {
      // if (rs.eventType == "transformServer") {
      //   this.transferDialog_show();
      // }
    },

    /**
     * 发送消息
     * @param {Object} rs 回调对象
     */
    sendMsg(rs) {
      console.log('rs', rs)
      // var msg = rs.msg;
      // msg.role = "client";
      // msg.avatarUrl = this.$data.clientChatEn.avatarUrl;
      // if (this.$data.chatInfoEn.chatState == "robot") {
      //   // 机器人发送接口
      // } else if (this.$data.chatInfoEn.chatState == "agent") {
      //   // 客服接口
      //   this.$data.socket.emit("CLIENT_SEND_MSG", {
      //     serverChatId: this.$data.serverChatEn.serverChatId,
      //     clientChatEn: this.$data.clientChatEn,
      //     msg: msg
      //   });
      // }
      // // 2.添加到消息集合李
      // var self = this;
      // this.addChatMsg(msg, function() {
      //   self.goEnd();
      // });
    }
  }
};
</script>

<style lang="stylus" scoped>
.common-chat
  height 600px
</style>