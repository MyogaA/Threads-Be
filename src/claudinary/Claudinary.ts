const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:"dximwmdlz",
    api_key: "415914627366878",
    api_secret:"L33mYk_3BIKzg2Y8qkDDWV3UcUM"
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }                                                              
}); 
// const replies = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: 'replies',
//         allowedFormats: ['jpeg', 'png', 'jpg'],
//     }                                                              
// }); 

module.exports = {
    storage,
    // replies
};