const environMentVariables = {
    getSecret : () => {
        return process.env.SECRET || "123456789";
    },
    getMongoDBUri: () => {
        return process.env.MONGODB_URI || '';
    },
    getSaltRounds: () => {
        return parseInt(process.env.SALT_ROUNDS || "10");
    },
    getPort: () => {
        return process.env.PORT || 8080;
    }
}

export default environMentVariables;