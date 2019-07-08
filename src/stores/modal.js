import { observable, action, autorun } from 'mobx';

/**
 * modal 扩展 store
 */
class Modal {
  constructor(){
    autorun(this.print);
  }

  @observable modalList = {};

  @action
  open = ({ code, title, data, ...other }) => {
    this.modalList = {
      ...this.modalList,
      [code]: { code, title, data, ...other },
    };
  }

  @action
  close = (code) => {
    let modalList = {};
    delete modalList[code];
    if (code){
      delete this.modalList[code];
      modalList = { ...this.modalList };
    }
    this.modalList = modalList;
  }

  // 打印状态
  print = () => {
    console.group('%c[store][modal]: 弹窗', 'color: green');
    console.log('modalList:', this.modalList);
    console.groupEnd();
  }
}

export default Modal;
