<template>
    <button class="make-button" @click="$emit('print')">print</button>
    <button class="make-button" @click="$emit('preview')">preview</button>
    <button class="make-button" @click="$emit('settable')">set table</button>
    <div>
      <button
        v-for="(button, n) in Object.keys(buttons)"
        :key="n"
        class="panel-button"
        @click="$emit('settemplate', button)"
      >
        {{ buttons[button] }}
      </button>
    </div>
</template>

<script>
import { mock, buttons } from "@/mock/example.js"

export default {
  name: 'Toolbar',
  
  props: {
    buttons: {
      type: Object,
      default: buttons,
    },
  },
  emits: ['print','preview','settable'],

  data() {
    return {
      mock,
    }
  }
}
</script>

<style>

button.panel-button {
  background: none;
  border: 1px solid #ccc;
  margin: 6px;
  padding: 6px;
  cursor: pointer;
  min-width: 200px;
}
button:hover.panel-button {
  background-color: #dfe;
  border: 1px solid #cde;
}

button.make-button {
  background-color: #fcc;
  border: 1px solid #ccc;
  margin: 6px;
  padding: 6px;
  cursor: pointer;
  min-width: 200px;
}
button:hover.make-button {
  background-color: #fce;
  border: 1px solid #fcc;
}
</style>