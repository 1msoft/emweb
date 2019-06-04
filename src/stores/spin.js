import { observable, action, autorun, computed } from 'mobx';

/**
 * span 扩展 store
 */
class Spin {
  constructor(){
    autorun(this.print);
  }

  @observable spins = 0;

  @action
  add = () => { this.spins += 1;};

  @action
  remove = () => { this.spins -= 1; };

  @computed get loading() {
    return this.spins > 0;
  }

  // 打印状态
  print = () => {
    console.group('%c[store][modal]: 加载状态', 'color: green');
    console.log('spins:', this.spins);
    console.groupEnd();
  }
}

export default Spin;
