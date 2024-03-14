const cloudinary = require("cloudinary")
cloudinary.config({
    cloud_name:"dbr8iiscf",
    api_key:"921871661826735",
    api_secret:"x__6lmEA1ntgB-PmfOZoaOa6C3M",
});

const imageUploadController= async(req,res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path)
        res.json({
            url:result.secure_url,
            public_id:result.public_id,
        })
    } catch (error) {
        console.log(error)
    }
};

module.exports={imageUploadController}