import multer from 'multer';

const destinationPath = process.env.IMAGES_PATH || "";

const local = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, destinationPath)
    },
    filename: (request, file, callback) => {
        callback(null,  Date.now() + '_' + file.originalname.trim().toLowerCase())
    }
})

const MAX_SIZE = 1024 * 1024 * 10; //10MB

const multerConfiguration: multer.Options = {
    dest: destinationPath,
    storage: local,
    limits: {
        fileSize: MAX_SIZE
    }
}

export { multerConfiguration };