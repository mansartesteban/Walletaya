import Observer from "./Observer"
import Store from "./Store"

class Database {

    static EVENTS = Object.freeze({
        QUEUE_UPDATED: "QUEUE_UPDATED",
        DATABASE_INITIALIZED: "DATABASE_INITIALIZED",
        DATABASE_STARTED: "DATABASE_STARTED"
    });

    version = Date.now(); //TODO: Find a way to handle version managment
    stores = [];

    db
    isInitialized

    requestQueue = [];

    observer = new Observer();

    constructor() {
    }

    start() {

        this.observer.$on(Database.EVENTS.DATABASE_INITIALIZED, () => {
            let promises = []
            this.stores.forEach(store => {
                promises.push(new Promise((res) => {
                    store.retrieve()//.then(() => res(store.autosave()))
                }))
            })

            Promise.all(promises).then(() => {
                this.observer.$emit(Database.EVENTS.DATABASE_STARTED)
            })
        })

        this.observer.$on(Database.EVENTS.QUEUE_UPDATED, () => {
            this.browseQueue()
        })

        if (window.indexedDB) {
            let openRequest = indexedDB.open("", this.version)

            openRequest.onupgradeneeded = () => {
                const db = openRequest.result

                this.stores.forEach(store => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        db.createObjectStore(store.name, { keyPath: 'id' })
                    }
                })
            }

            openRequest.onerror = () => {
                console.error("Error", openRequest.error)
            }

            openRequest.onsuccess = () => {
                this.db = openRequest.result

                this.observer.$emit(Database.EVENTS.DATABASE_INITIALIZED)
                this.isInitialized = true
                this.browseQueue()
            }
        } else {
            throw new Error("IndexedDB not supported")
        }
    }

    browseQueue() {
        if (this.isInitialized) {
            let currentRequest = this.requestQueue.shift()

            if (currentRequest) {
                currentRequest(this.db)
            }

            if (this.requestQueue.length > 0) {
                this.browseQueue()
            }
        }
    }

    openStore(storeName = "") {
        if (this.isInitialized) {
            throw new Error("You can't open a store after the application has started")
        }
        if (!storeName) {
            throw new Error("Opening store doesn't have any name")
        }

        let store = new Store(storeName)
        store.attachDB(this)
        this.stores.push(store)
    }

    addRequest(callback) {
        this.requestQueue.push(callback)
        this.observer.$emit(Database.EVENTS.QUEUE_UPDATED)
    }

    getStore(name) {
        return this.stores.find(store => store.name === name)
    }

    getItem(store, id, successCallback, errorCallback) {

        if (typeof (store) === "string") {
            store = this.getStore(store)
        }

        return new Promise((resolve, reject) => {
            this.addRequest(db => {
                console.log("this.name", store.name)
                let transaction = db.transaction(store.name, "readonly")
                let storeObject = transaction.objectStore(store.name)
                let req = storeObject.get(id)

                req.onsuccess = (res) => {
                    console.log("req", req, res)
                    if (successCallback) successCallback(req.result.value)
                    resolve(req.result.value)
                }

                req.onerror = () => {
                    if (errorCallback) errorCallback(req.error)
                    reject(req.error)
                }
            })

        })

    }

    setItem(store, value) {
        if (typeof (store) === "string") {
            store = this.getStore(store)
        }
        return new Promise((resolve, reject) => {
            this.addRequest(db => {

                let transaction = db.transaction(store.name, "readwrite")
                let storeObject = transaction.objectStore(store.name)

                console.log("what to poutine ?", JSON.stringify(value))
                let req = storeObject.put(value)

                let result = null
                req.onsuccess = () => {
                    setTimeout(() => resolve(req.result), 5000)
                }

                req.onerror = () => {
                    reject(req.error)
                }

                return result
            })
        })
    }

    getAll(store) {
        return new Promise((resolve, reject) => {
            this.addRequest(db => {
                let transaction = db.transaction(store.name, "readonly")
                let storeObject = transaction.objectStore(store.name)

                let req = storeObject.getAll()

                req.onsuccess = () => {
                    store.datas = req.result
                    resolve(req.result)
                }

                req.onerror = () => {
                    reject(req.error)
                }
            })
        })
    }
}

export default Database