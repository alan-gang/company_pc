// kane
// window.SOCKET_DOMAIN = 'ws://ws.newuwin.com'
let Socket = {
  // url: 'wss://ws.uwinweb.com/ws?r=FrontNotify,GlobalNotify',
  url: 'ws://192.168.169.46:5000/ws',
  data: {},
  notify: {
    messages: []
  },
  time: 3000,
  sockets: {},
  closeType: {},
  get (msg) {
    return this.socket.send(JSON.stringify(msg))
  },
  close (name) {
    Object.entries(this.sockets).forEach(([k, v]) => {
      if (name === 'all' || name === k) v && v.close && (this.closeType[k] = true) && v.close(1000, 'close<-' + k)
    })
  },
  connect (name) {
    let socket = new window.WebSocket(this.url)
    if (socket) {
      this.closeType[name] = false
      socket.binaryType = 'arraybuffer'
      socket.onopen = (evt) => {
      }
      socket.onmessage = (evt) => {
        this.notify.messages.forEach(fn => fn(JSON.parse(evt.data)))
      }
      socket.onerror = (evt) => {
      }
      socket.onclose = (evt) => {
        this.sockets[name] = null
        if (!this.closeType) this.connect(name)
      }
      this.sockets[name] = socket
    } else {
      setTimeout(() => {
        this.connect(name)
      }, this.time)
    }
    return socket
  }
}
export default Socket
