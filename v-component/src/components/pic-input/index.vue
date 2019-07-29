<template>
  <div>
    <picker set="emojione" />
    <pic-input></pic-input>
  </div>
</template>

<script>
import { Picker, Emoji } from 'emoji-mart-vue'
import picInput from './pic-input'

export default {
  components: {
    Picker,
    picInput
  },
  data () {
    return {
    } ; 
  },
}
</script>

<style scoped>
</style>