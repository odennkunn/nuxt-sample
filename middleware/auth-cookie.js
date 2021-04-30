import Cookies from 'universal-cookie'

export default ({ req, store }) => {
    if (process.browser) {
        return
    }
    const cookies = new Cookies(req.headers.cookie)
    const user = cookies.get('user')
    console.log('------------cookie-----------------')
    console.log(user)
    console.log('-----------------------------------')
    if (user && user.id) {
        const { id, name, image, likes } = user
        store.commit('setUser', { user: { id, name, image, likes } })
    }
}
