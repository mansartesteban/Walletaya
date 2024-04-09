class Store {
  static STORES = [];

  name;
  db;

  datas = [];

  callbacks = {
    onSave: [],
    onDelete: [],
  };

  constructor(name) {
    this.name = name;
    Store.STORES.push(this.name);
  }

  save(id, value) {
    let findIndex = this.datas.findIndex((data) => data.id === id);
    if (findIndex !== -1) {
      this.datas[findIndex].value = value;
    } else {
      this.datas.push({ id, value });
    }

    return this.saveAll();
  }

  get(id) {
    return this.datas.find((data) => data.id === id)?.value;
  }

  delete(id) {
    let foundIndex = this.datas.findIndex((data) => data.id === id);
    if (foundIndex > -1) {
      let onFinished = this.db.deleteItem(
        this,
        this.datas.splice(foundIndex, 1)[0]
      );
      onFinished.then(() => {
        this.callbacks.onSave.forEach((cb) => cb());
      });
      return onFinished;
    }
  }

  getAll() {
    return this.datas;
  }

  retrieve() {
    if (this.db) {
      return this.db.getAll(this);
    }
    return Promise.resolve(true);
  }

  onSave(callback) {
    callback && this.callbacks.onSave.push(callback);
  }
  onDelete(callback) {
    callback && this.callbacks.onDelete.push(callback);
  }

  saveAll() {
    const promises = [];
    this.datas.forEach((data) => {
      if (this.db) {
        promises.push(this.db.setItem(this, data));
      }
    });
    let onFinished = Promise.all(promises);
    onFinished.then(() => {
      this.callbacks.onSave.forEach((cb) => cb());
    });
    return onFinished;
  }

  attachDB(db) {
    this.db = db;
  }

  isValidStore(storeName) {
    return Object.values(Store.STORES).includes(storeName);
  }
}

export default Store;
