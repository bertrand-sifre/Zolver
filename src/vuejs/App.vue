<template>
  <div id="app">
    <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
    <br />
    <button v-if="this.filename" @click="launchCompute()">Launch compute for {{this.filename}}</button>
    <div class="logs-container" ref="logsContainer">
    </div>
  </div>
</template>

<script>
import Socket from './helper/socket'
const axios = require('axios')
const API_URL = 'http://localhost:3000'

export default {
  data() {
    return {
      filename: null
    }
  },
  name: 'app',
  mounted(){
    const term = require('hypernal')()
    term.tail = true
    term.appendTo(this.$refs.logsContainer)
    Socket.on('logs:update', data => {
      console.log("coucou")
      return term.write(data.msg)
    })
  },
  methods: {
    uploadImage(event) {
      const url = API_URL + '/images'; 
      let data = new FormData();
      data.append('name', 'my-picture');
      data.append('image', event.target.files[0]); 

      let config = {
        header : {
          'Content-Type' : 'image/png'
        }
      }

      axios.put(
        url, 
        data,
        config
      ).then(response => {
        this.filename = response.data.filename
      })
    },
    launchCompute() {
      const url = API_URL + '/compute/' + this.filename
      axios.post(url).then(response => {
      })
    }
  }
}
</script>