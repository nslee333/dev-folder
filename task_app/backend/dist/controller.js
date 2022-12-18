import { fetchCollection } from "./db";
export const getDocuments = async () => {
    try {
        const result = await fetchCollection();
        return result;
    }
    catch (error) {
        console.error(error);
    }
};
// console.log(getDocuments());
module.exports = getDocuments;
//# sourceMappingURL=controller.js.map