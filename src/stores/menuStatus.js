import { observable, action, autorun, computed } from 'mobx';
import { getCookie } from '@utils/helper.js';

/**
 * modal 扩展 store
 */
class menuStatus {
  constructor(){
    autorun(this.print);
  }

  @observable retract = 'half';
  @observable _drawer = false;
  @observable collapsed = {
    isOpen: JSON.parse(getCookie('menu_status')) || false
  };

  @action
  setProperty = (property, value) => this[`_${property}`] = value

  @computed
  get drawer() {
    return this._drawer;
  }

  @action
  setCollapsed = () => {
    this.retract = 'all';
    this.collapsed = { isOpen: true };
  }

  @action
  clearCollapsed = () => {
    this.retract = 'half';
    this.collapsed = { isOpen: false };
  }

  // 打印状态
  print = () => {
    console.group('%c[store][menuStatus]: 左侧菜单收缩状态', 'color: green');
    console.log('收缩模式retract:', this.retract);
    console.log('收缩状态collapsed:', this.collapsed);
    console.groupEnd();
  }
}

export default menuStatus;
