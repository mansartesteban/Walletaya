import useDatabase from "@/composables/useDatabase"
import Database from "@/Services/Database/Database"

export default (app) => {
    let database = new Database()
    database.start()
    database.openStore("user")
    database.openStore("transactions")
    useDatabase().attach(database)
}