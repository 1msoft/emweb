import { observable, action, autorun } from 'mobx';

/**
 * modal 扩展 store
 */
class menuStatus {
  constructor(){
    autorun(this.print);
  }

  @observable college = 'half';
  @observable collegeStatus = { isOpen: false };

  @action
  setCollege = () => {
    this.college = 'all';
    this.collegeStatus = { isOpen: true };
  }

  @action
  clearCollege = () => {
    this.college = 'half';
    this.collegeStatus = { isOpen: false };
  }

  // 打印状态
  print = () => {
    console.group('%c[store][menuStatus]: 弹窗', 'color: green');
    console.log('收缩模式college:', this.college);
    console.log('收缩状态collegeStatus:', this.collegeStatus);
    console.groupEnd();
  }
}

export default menuStatus;
