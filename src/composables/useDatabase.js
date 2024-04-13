let database = null
export default () => {

    const attach = (databaseInstance) => {
        database = databaseInstance
    }

    return {
        attach,
        database
    }
}