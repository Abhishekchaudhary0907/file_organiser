#!/usr/bin/env node
const treeFn = require('./driver/tree');
const organiseFn = require('./driver/organise');
const helpFn = require('./driver/help');
const inputArray = process.argv.slice(2);

const command = inputArray[0];

switch(command){
    case "tree":
        treeFn(inputArray[1])
        break;
    case "organise":
        organiseFn(inputArray[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("please provide valid command");
        break;
}
