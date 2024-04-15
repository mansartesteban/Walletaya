import Database from "@/Services/Database/Database";

let database = new Database();
database.start();
database.openStore("user");
database.openStore("transactions");

let settingStore = database.getStore("user");
settingStore.retrieve();

export default database;
