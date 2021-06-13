const types = require('../utils');
const fs = require('fs');
const path = require('path');
function organiseFn(dirPath){
    let destPath;
    if(dirPath == undefined){
       dirPath = process.cwd();
       
    }
  
    let doesExist=fs.existsSync(dirPath)
    if(doesExist){
       destPath = path.join(dirPath,"organise_file");
      if(fs.existsSync(destPath) == false){
         fs.mkdirSync(destPath);
      }
  
    }else{
        return console.log("enter valid path");
        
    }
  
    organizeHelper(dirPath,destPath);
  }
  
  function organizeHelper(src,dest){
      let childNames = fs.readdirSync(src);
     for(let i =0; i<childNames.length; i++){
         let childAddress = path.join(src, childNames[i]);
         let isFile = fs.lstatSync(childAddress).isFile();
         if(isFile){
             let category = getCategory(childNames[i]);
             
             sendFiles(childAddress,dest,category);
         }
     }
  
  }
  
  function getCategory(fileName){
      let ext = path.extname(fileName);
      ext = ext.slice(1);
      
      for(let type in types){
          let cTypeArray = types[type];
          for(let i=0; i<cTypeArray.length; i++){
              if(ext == cTypeArray[i]){
                  return type;
              }
          }
      }
  
      return "others";
  
  }
  
  function sendFiles(srcFilePath,dest,category){
      let categoryPath = path.join(dest, category);
      if(fs.existsSync(categoryPath) == false){
          fs.mkdirSync(categoryPath);
      }
  
      let fileName = path.basename(srcFilePath);
      let destFilePath = path.join(categoryPath,fileName);
      fs.copyFileSync(srcFilePath,destFilePath);
     // fs.unlinkSync(srcFilePath);
      console.log(fileName," copied to ",category);
  
  }

  module.exports = organiseFn;