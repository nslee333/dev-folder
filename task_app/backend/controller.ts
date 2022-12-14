import { fetchCollection } from "./db"

export const getDocuments = async () => {
    try {
        const result =  await fetchCollection();
        return result;
    } catch (error) {
        console.error(error);
    }
    
}

module.exports = getDocuments;