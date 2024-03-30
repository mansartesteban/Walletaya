const database = ref()

export default () => {

    const attach = (databaseInstance) => {
        database.value = databaseInstance
    }

    return {
        attach,
        database
    }
}