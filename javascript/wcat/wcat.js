//node wcat.js filepath=>displays the contents of a file in terminal
//node wcat.js filepath1 filepath2=>displays the contents of all file in terminal in given order
//node wcat.js -n file1 file2 file3 OR node wcat -n file1
const { table } = require("console");
const fs=require("fs");
let inputArr=process.argv.slice(2);
//console.log(inputArr); 
let filesArr=[];
let optionArr=[];
//placed files path in filesArr
for(let i=0;i<inputArr.length;i++){
    let firstChar=inputArr[i].charAt(0);
    if(firstChar=='-'){
        optionArr.push(inputArr[i]);
    }else{
    filesArr.push(inputArr[i]);
    }
}
console.log(filesArr);
//check if all the files are present
for(let i=0;i<filesArr.length;i++){
    let doesExist=fs.existsSync(filesArr[i]);
    if(!doesExist){
        console.log("files does not exist");
        //return;
        process.exit();
    }
}
let content="";
for(let i=0;i<filesArr.length;i++){
    let fileContent=fs.readFileSync(filesArr[i]);
    content+=fileContent+"\r\n";
}
//console.log(content);

let contentArr=content.split("\r\n");
console.log(contentArr);
//check if -s is present or not
let isPresent =optionArr.includes("-s");
if(isPresent){
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]==""&&contentArr[i-1]==""){
            contentArr[i]=null;
        }
        else if(contentArr[i]==""&&contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }
    console.table(contentArr);
    let tempArr=[];
    //push everything in this array
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            tempArr.push(contentArr[i]);
        }
    }
    console.log("data after removing spaces\n",tempArr);
}