import {Router} from "express";

const multer = require('multer');
const path = require('path');
const router = Router();



// TO SAVE USER PROFILE PIC
const storageUser = multer.diskStorage({
    destination: (req:Request,file:File,cb:Function) => {
        cb(null,'public/images/users')
    },
    filename: (req:Request,file:Express.Multer.File,cb:Function) => {
        // console.log(file)
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const uploadUser = multer({storage: storageUser});

router.post('/user', uploadUser.single('profilepic'), (req,res)=>{
    if (req.file) {
        const fileName = req.file.filename;
        res.json({ fileName }); 
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});


// TO SAVE Hotel PIC
const storageHotel = multer.diskStorage({
    destination: (req:Request,file:File,cb:Function) => {
        cb(null,'public/images/hotels')
    },
    filename: (req:Request,file:Express.Multer.File,cb:Function) => {
        // console.log(file)
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const uploadHotel = multer({storage: storageHotel});

router.post('/hotel', uploadHotel.single('image1'), (req,res)=>{
    if (req.file) {
        const fileName = req.file.filename;
        res.json({ fileName }); 
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});


// TO SAVE Flight PIC
const storageFlight = multer.diskStorage({
    destination: (req:Request,file:File,cb:Function) => {
        cb(null,'public/images/flights')
    },
    filename: (req:Request,file:Express.Multer.File,cb:Function) => {
        // console.log(file)
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const uploadFlight = multer({storage: storageFlight});

router.post('/flight', uploadFlight.single('image1'), (req,res)=>{
    if (req.file) {
        const fileName = req.file.filename;
        res.json({ fileName }); 
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});


export default router; 