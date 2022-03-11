const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg|pdf)$/)) {
            var err = new Error();
            err.code = 'filetype';
            return cb(err);
        } else {
            cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
        }
    }
})

// var upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, callback) {
//         if (file.mimetype == "image/png" ||
//             file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             callback(null, true)
//         }
//         else {
//             console.log("Only jpg and png file supported!!!");
//             callback(null, false);
//         }
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 2
//     }
// }).single("profile_file");

var upload = multer({
    storage:storage , 
}).single('profile_file');

// var upload = multer({
//     storage:storage , 
// }).array('profile_file');



  

module.exports = upload