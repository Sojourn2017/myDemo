const MIME = {
  'html': 'text/html',
  'css': 'text/css',
  'js': 'application/x-javascript',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'gif': 'image/gif'
}

export default function handleStatic(pathName) {
  let reg = /\.([a-zA-Z]*)$/;
  if (reg.test(pathName)) {
    let type = RegExp.$1;
    return MIME[type];
  }
}