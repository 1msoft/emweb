import { observable, action, autorun } from 'mobx';

/**
 * modal 扩展 store
 */
class menuStatus {
  constructor(){
    autorun(this.print);
  }

  @observable retract = 'half';
  @observable collapsed = { isOpen: false };

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
