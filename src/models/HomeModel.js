import { Http } from '../Http';
import { Ls } from '@/utils/ls';

class HomeModel {
    /**
     * 请求菜单数据
     */
  static async getMenus() {
    let menus = Ls.get('menus');
    if (!menus.length) {
      menus = await Http.get('menus').catch(err => {
        throw new Error(err);
      });
      menus.forEach(item => {
          item.children.forEach(child => {
              child.path = `/${child.path}`
          })
      });
      if (menus.length) {
        Ls.set('menus', menus);
      }
    }
    return menus;
  }
}

export { HomeModel };
