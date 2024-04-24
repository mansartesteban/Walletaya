import Database from "@/services/Database/Database";

let database = new Database();
database.start();
database.openStore("app");
database.openStore("user");
database.openStore("transactions");

database.getStore("user").retrieve();
database.getStore("app").retrieve();

export default database;
