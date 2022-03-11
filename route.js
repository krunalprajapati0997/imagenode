var User = require('./user');
const express = require("express");
const multer  = require('multer');
const upload = require("./upload");
const fs = require('fs');
const uploadsDir = __dirname + './uploads';
const cors = require('cors')


module.exports = function(router){

    router.post('/',(req , res)=>{
    
        upload(req, res, function(err) {
            // console.log('hey.....multi',req.files)


            if(err) {
                if( err.code === 'LIMIT_FILE_SIZE'){
                    res.json({ success: false, message: 'Profile Image too large !!!'});
                } else if( err.code === 'filetype' ) {
                    res.json({ success: false, message: 'Invaild : Only jpeg, jpg and png supported !!!'});
                } else {
                    console.log(err);
                    res.json({ success: false, message: 'Profile Image not upload !!!'});
                }
            } else {
                if(!req.file) {
                    res.json({ success: false, message: 'No file selected !!!'});
                } else{
                    let user = User();

                    user.name = req.body.name;
                    user.username = req.body.username;
                    user.email = req.body.email;
                    user.phone = req.body.phone;
                    user.profile_file = req.file.filename;
                    user.profile_url ="http://localhost:6009/uploads/"+ req.file.filename;
                    user.save(function(err){
                        if(err){
                            console.log(err.errors.name);
                            if(err.errors.name) {
                                res.json({ success: false, message: "Name is required" });    
                            } else if(err.errors.email) {
                                res.json({ success: false, message: "E-mail is required" });    
                            } else if(err.errors.mobile) {
                                res.json({ success: false, message: "Mobile is required" });    
                            } else if(err.errors.password) {
                                res.json({ success: false, message: "Password is required" });    
                            } else {
                                res.json({ success: false, message: err });
                            }
                        } else {
                            res.json({ success: true, message: 'Registration Successfully' });
                        }
                    });
                }
            }
        })
    
    })

    router.get('/', (req, res) => {
        User.find({}).exec(function(err, ress) {
            res.json({"data":ress})
            // fs.unlink('uploads/profile_file_1646724810084.jpg',function(err,ress){
                
            //     if(err) throw err;
            //     console.log('reee');
            // })
            // if(!user) {
            //     res.json({ success: fale, message: 'User not found' });
            // } else {
            //     res.json({ success: true, message: 'get details Successfully', data: user });
            // }
        })
    })

    

    // router.put('/:id',async(req,res)=>{
    //     console.log('hey...put')
    //     const id = req.params.id
    //     const data = await User.findByIdAndUpdate(id,req.body)
    //     res.send(data)
    // })

    // router.delete('/:id',async(req,res)=>{
    //     console.log('heyy...delele')
    //     const id = req.params.id
    //     const data1 = await User.findByIdAndDelete(id,req.body)
    //     res.send(data1)
    // })

        
    // router.put("/:id", async (req, res) => 
    // {
    //     User.find({ _id: req.params.id }).exec(function (err, ress) {
    //         res.json({'data':ress})
    //         console.log("ress.profile_file", ress[0].profile_file);
    //         fs.unlink("uploads/"+ress[0].profile_file, async (err) => {
    //             if (err) throw err;
    //             const user = await User.findByIdAndUpdate(req.params.id);
    //             res.send(user)
    //         })
    //     })
    // })

    // router.put('/:id', upload, async (req, res) => {

    //     User.findOne({_id: req.params.id}).exec((err, user) => {
    //         if(err) {
    //             console.log(err)
    //         } else {
    //             user.name = req.body.name;
    //             user.username = req.body.username;
    //             user.email = req.body.email;
    //             user.phone = req.body.phone;
    //             user.profile_file = req.file.filename;
    //             user.profile_url ="http://localhost:6009/uploads/"+req.file.filename;
    //             user.save(function(err){
    //                 if(err){
    //                     console.log(err);
    //                 }
    //             });
    //             res.send("update")
    //         }
    //     })
    // })

    router.put('/:id', upload, async (req, res) => {

        User.findOne({_id: req.params.id}).exec((err, user) => {
            if(err) {
                console.log(err)
            } else {
                user.name = req.body.name;
                user.username = req.body.username;
                user.email = req.body.email;
                user.phone = req.body.phone;
                user.profile_file = req.file.filename;
                user.profile_url ="http://localhost:6009/uploads/"+req.file.filename;
                user.save(function(err){
                    if(err){
                        console.log(err);
                    }
                });
                res.send("update")
            }
        })
    
    
    })

    router.delete("/:id", async (req, res) => {
        console.log("Hello________-", req.params);
        if(req.params.id == null || req.params.id == undefined) {
            res.json({mesage: "id not defined", success: false})
        } else {
            User.find({ id: req.params.id }).exec(async (err, ress) => {
                // res.json({'data':ress})
                
                fs.unlink("uploads/"+ress[0].profile_file, async (err) => {
                    if (err) throw err;
                    const user = await User.findByIdAndDelete(req.params.id);
                    res.send(user)
                })
            })      
        }
    })

    // router.delete("/:id", async (req, res) => {
    //     User.find({ _id: req.params.id }).exec(function (err, ress) {
    //         // res.json({'data':ress})
    //         console.log("ress.profile_file", ress[0].profile_file);
    //         fs.unlink("uploads/"+ress[0].profile_file, async (err) => {
    //             if (err) throw err;
    //             const user = await User.findByIdAndDelete(req.params.id);
    //             res.send(user)
    //         })
    //     })
    // })

    // router.put("/:id", async (req, res) => {
    //     console.log("Hello________-", req.params);
    //     if(req.params.id == null || req.params.id == undefined) {
    //         res.json({mesage: "id not defined", success: false})
    //     } else {
    //         User.find({ id: req.params.id }).exec(async (err, ress) => {
    //             // res.json({'data':ress})
                
    //             fs.unlink("uploads/"+ress[0].profile_file, async (err) => {
    //                 if (err) throw err;
    //                 const user = await User.findByIdAndupdate(req.params.id);
    //                 res.send(user)
    //             })
    //         })
    //     }
    // })
    
    // router.put('/:id',async(req,res)=>{
    //         console.log('hey...put')
    //         const id = req.params.id
    //         const data = await User.findByIdAndUpdate(id,req.body)
    //         data.save()
    //         res.send(req.body)
    //     })
   
       
      
      

      return router;
}