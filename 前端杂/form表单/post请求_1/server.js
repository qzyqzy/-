let http = require('http')
let querystring = require('querystring')

let server = http.createServer((req, res) => {
	// post 请求

	let allBuffer = []
	req.on('data', (data) => {
		allBuffer.push(data)
	})
	req.on('end', () => {
		let data = Buffer.concat(allBuffer)

		// 部分二进制数据不能直接转化为字符串 例如图片

		// 此处区分  urlencoded  form/data
		// urlencoded
		let dataStr = data.toString()
		let userData = querystring.parse(dataStr)
		let {
			user,
			password
		} = userData || {}
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.end(`user is:${user},password is:${password}`)
	})

})
server.listen(8080, () => {
	console.log('server is running at localhost:8080')
})
