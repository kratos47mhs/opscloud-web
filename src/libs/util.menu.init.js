import request from '@/plugin/axios'
import util from '@/libs/util.js'
import store from '@/store/index'
import menuAside from '@/menu/aside'

const menu = {}
// url: process.env.VUE_APP_API + 'auth/menu/query',

menu.init = function () {
  const token = util.cookies.get('token')
  if (token && token !== 'undefined') {
    return request({
      url: 'auth/menu/query',
      method: 'get'
    })
      .then(async res => {
        // console.log(res.menu)
        // Here use the expansion operator to merge the server dynamic menu with the local menu
        let allMenu = [...menuAside, ...res.body]
        store.commit('d2admin/menu/asideSet', allMenu)
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }
}

export default menu
