import * as multer from 'multer';

//export const upload = { dest: "src/uploads/" };

//files stored in memory as Buffer
const storage = multer.memoryStorage();
export const upload = { storage };