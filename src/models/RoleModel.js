import { observable } from 'mobx';

export default class RoleModel {
    store
    _id
    _rev

    @observable name
    @observable desc
    @observable routePermitCode = 0
    @observable opsPermitCode = 0
   


    constructor(store, object = {}){
        this.store = store
        Object.assign(this, object)
    }

    genId() {
        return `ROLE_${this.desc}`
    }

    setProperty(name, value){
        this[name] = value
    }

    toJS() {
        return {
            _id: this._id,
            _rev: this._rev,
            name: this.name,
            routePermitCode: this.routePermitCode,
            opsPermitCode: this.opsPermitCode,
            desc: this.desc,
        };
    }

    static fromJS(store, object) {
        return new RoleModel(store, object)
    }
}