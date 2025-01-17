module.exports = {
  ui: {
    port: 3080,
    weinre: { port: 8080 }
  },
  files: [ "dev/**/*" ],
  server: {
    baseDir: 'dev',
    index: 'index.html'
  },
  port: 1337,
  ghostMode: {
    clicks: true,
    scroll: true,
    forms: {
      submit: true,
      inputs: true,
      toggles: true
    }
  },
  open: false,
  browser: "default",
  notify: false,
  scrollProportionally: true,
  reloadDelay: 0,
  reloadDebounce: 0,
  minify: true,
  codeSync: true,
  timestamps: true,
  clientEvents: [
    "scroll",
    "input:text",
    "input:toggles",
    "form:submit",
    "form:reset",
    "click"
  ],
  socket: {
    path: "/browser-sync/socket.io",
    clientPath: "/browser-sync",
    namespace: "/browser-sync",
    clients: { heartbeatTimeout: 5000 }
  },
  tagNames: {
    less: "link",
    scss: "link",
    css:  "link",
    jpg:  "img",
    jpe:  "img",
    png:  "img",
    svg:  "img",
    gif:  "img",
    js:   "script"
  }
};
