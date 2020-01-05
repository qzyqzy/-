const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
const path = require('path')
const uuidv4 = require('uuid/v4')

// 定义buffer的split方法
Buffer.prototype.split = Buffer.prototype.split || function(spl) {
	let bufferData = this
	let len = spl.length
	let result = []
	let index
	while ((index = bufferData.indexOf(spl)) != -1) {
		let res1 = bufferData.slice(0, index)
		let res2 = bufferData.slice(index + len)
		result.push(res1)
		bufferData = res2
	}
	result.push(bufferData)
	return result
}

// 获取json数据
function jsonParse(data) {
	// '; ' 普通数据
	// \r\n 文件数据
	let arr = data.split(/(; )|(\r\n)/g)
	let json = {}
	arr.forEach((item) => {
		if (item) {
			let [key, val] = item.split('=')
			// 去除前后的"
			if (val) {
				val = val.slice(1, val.length - 1)
			}
			json[key] = val
		}

	})
	return json
}

let server = http.createServer((req, res) => {
	// post 请求

	let allBuffer = []
	req.on('data', (data) => {
		allBuffer.push(data)
	})
	req.on('end', () => {
		// 
		let data = Buffer.concat(allBuffer)

		// 部分二进制数据不能直接转化为字符串 例如图片

		// 开发时选取文本文件转化为字符串方便查看,线上不要做此操作
		// let dataStr = data.toString()
		// console.log(dataStr)
		// 获取content-type中的数据
		let contenType = req.headers['content-type'] // multipart/form-data; boundary=----WebKitFormBoundaryTXPqBSytvUMLH4rH
		// 此处区分  urlencoded  form-data
		if (contenType && contenType.startsWith('multipart/form-data')) {
			// 获取content-type中的boundary做数据截取
			// 后台接收的数据中的boundary为六条横杠
			let boundary = '--' + contenType.split('=')[1];
			let postDataArr = data.split(boundary)
			// 去除数据的头部,尾部无用数据
			postDataArr.shift()
			postDataArr.pop()
			// 去除每条数据中的头尾 \r\n 对应的buffer数据为 0d 0a 
			postDataArr = postDataArr.map(item => item.slice(2, item.length - 2))
			// 对每条数据进行\r\n\r\n数据的截取,前一部分的数据为信息数据 后一部分的为值数据
			let json = {}
			postDataArr.map((item) => {
				let index = item.indexOf('\r\n\r\n')
				let info = item.slice(0, index)
				let userData = item.slice(index + 4)
				// info 可直接转字符串
				let inforStr = info.toString()
				// 此处区分是否为普通数据或者是文件数据
				if (info.indexOf('\r\n') == -1) {
					// 普通信息
					let key = jsonParse(inforStr).name
					let value = userData.toString()
					json[key] = value
				} else {
					// 文件信息
					let key = jsonParse(inforStr)
					let {
						filename
					} = key
					// 去除filename 两边的""
					filename = filename.replace(/"/g, '')
					if (!filename) {
						return
					}
					// 文件命名 防止名称一样
					let filePath = `../upload/${uuidv4().replace(/-/g,'')}${path.extname(filename)}`
					fs.writeFile(filePath, userData, (err) => {
						if (err) {
							console.log(`${filename}写入失败`)
						} else {
							console.log(`${filename}写入成功`)
						}
					})
				}
			})
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.end(`user is:${json['user']},password is:${json['password']}`)
		} else {
			// urlencoded 直接转为字符串即可
			let dataStr = data.toString()
			let userData = querystring.parse(dataStr)
			let {
				user,
				password
			} = userData || {}
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.end(`user is:${user},password is:${password}`)
		}
	})

})
server.listen(8080, () => {
	console.log('server is running at localhost:8080')
})
