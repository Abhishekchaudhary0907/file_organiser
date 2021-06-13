const fs = require('fs');
const path = require('path');
function treeFn(dirPath){
    if(dirPath == undefined){

        treeHelper(process.cwd(),"");
        return;
     }
   
     let doesExist=fs.existsSync(dirPath)
     if(doesExist){

      treeHelper(dirPath,"");

     }else{
         return console.log("enter valid path");
         
     }
}

function treeHelper(dirPath, indent){
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile){
        let fileName = path.basename(dirPath);
        console.log(indent+"├──"+fileName);
    }else{
        let dirName = path.basename(dirPath);
        console.log(indent+"└──"+dirName);
        let childrens = fs.readdirSync(dirPath);
        for(let i =0; i<childrens.length; i++){
            let childPath = path.join(dirPath,childrens[i]);
            treeHelper(childPath, indent+"\t");

        }
    }

}

module.exports = treeFn;