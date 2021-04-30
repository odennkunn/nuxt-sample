const middleware = {}

middleware['auth-cookie'] = require('../middleware/auth-cookie.js')
middleware['auth-cookie'] = middleware['auth-cookie'].default || middleware['auth-cookie']

export default middleware
