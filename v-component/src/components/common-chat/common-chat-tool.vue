<template>
  <div class="common-chat-tool">
    <common-chat-emoji class="item" ref="qqemoji" @select="qqemoji_selectFace"></common-chat-emoji>
  </div>
</template>

<script>
import commonChatEmoji from "./comon-chat-emoji";

export default {
  components: {
    commonChatEmoji
  },
  data() {
    return {};
  },
  methods: {
    qqemoji_selectFace(rs) {
      const imgStr = rs.imgStr
      this.$emit('emoji', imgStr)
    }
  }
};
</script>

<style lang="stylus" scoped></style>