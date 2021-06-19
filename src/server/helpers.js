import multer from "multer";
import multerS3  from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const s3 = new aws.S3({
    accessKeyId : process.env.AWS_KEY,
    secretAccessKey : process.env.AWS_PRIVATE_KEY,
    region: "ap-northeast-1"
})

const fileFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}; 

const upload = multer({ 
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "dmswjd/avatar"
      }),

    fileFilter
}).single('profile_pic');

export default upload


