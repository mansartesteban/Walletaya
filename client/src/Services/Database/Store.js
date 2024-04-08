class Store {

    static STORES = []

    name
    db

    datas = [];

    callbacks = {
        onSave: []
    }

    constructor(name) {
        this.name = name
        Store.STORES.push(this.name)
    }

    save(id, value) {

        let findIndex = this.datas.findIndex(data => data.id === id)
        if (findIndex !== -1) {
            this.datas[findIndex].value = value
        } else {
            this.datas.push({ id, value })
        }

        return this.saveAll()
    }

    get(id) {
        return this.datas.find(data => data.id === id)?.value
    }

    getAll() {
        return this.datas
    }

    retrieve() {
        if (this.db) {
            return this.db.getAll(this)
        }
        return Promise.resolve(true)
    }

    onSave(callback) {
        callback && this.callbacks.onSave.push(callback)
    }

    saveAll() {
        const promises = []
        this.datas.forEach(data => {
            if (this.db) {
                promises.push(this.db.setItem(this, data))
            }
        })
        let onFinished = Promise.all(promises)
        onFinished.then(() => {
            this.callbacks.onSave.forEach(cb => cb())

        })
        return onFinished
    }

    attachDB(db) {
        this.db = db
    }

    isValidStore(storeName) {
        return Object.values(Store.STORES).includes(storeName)
    }

    removeItem() { }

}

export default Store