let http = require('http')
let url = require('url')

let server = http.createServer((req, res) => {
    // get请求
    let {
        pathname,
        query
    } = url.parse(req.url, true)
    let {
        user,
        password
    } = query || {}
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`user is:${user},password is:${password}`)
})
server.listen(8080, () => {
    console.log('server is running at localhost:8080')
})