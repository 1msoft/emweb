import { observable } from 'mobx';
import moment from 'moment'
export default class UserModel {
    
    store
    _id
    _rev
    // portalDataType
    // @observable name
    @observable username
    @observable password
    // @observable role
    // @observable num
    @observable tel
    @observable email
    @observable time

    constructor(store, object={}){
        this.store = store
        Object.assign(this, object)
    }

    generateId() {
        return `USER_${this.username}`
        // return `USER_${this.name}`
    }

    setProperty(property, value) {
        this[property] = value
    }

    // setProperty(name, value) {
    //     this[name] = value
    // }

    toJS() {
        return {
            _id: this._id,
            _rev: this._rev,
            username: this.username,
            password: this.password,
            // name: this.name,
            // roleId: this.roleId,
            time: moment(this.time),
            tel: this.tel,
            email: this.email,
            // num: this.num
        };
    }

    static fromJS(store, object) {
        return new UserModel(store, object)
    }


}