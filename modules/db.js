const fs = require("fs");

// This is a simple wrapper to make a database out of a json file
module.exports = class DB {
  constructor(filePath) {
    this.filePath = filePath;
    this.read();
  }
  
  // Returns the database, probably shouldn't be used
  getItemAll() {
    return this.current;
  }
  
  // Returns the item at the provided index
  getItemByIndex(i) {
    return this.current[i];
  }
  
  // Returns the first item that has the provided key value pair
  // Returns -1 if none found
  getItemByKeyValuePair(key, value) {
    for(let i = 0; i < this.current.length; i++) {
      let item = this.current[i];
      
      if(item[key] === value) {
        return item;
      }
    }
    
    return -1;
  }
  
  // Adds an item to the database
  // Writes to the database
  addItem(item) {
    this.current.push(item);
    this.write();
  }
  
  // Splices out the item at provided index
  // Writes to the database
  deleteItemByIndex(index) {
    this.current.splice(index, 1);
    this.write();
  }
  
  // Returns the index of an item
  // Else returns -1
  getIndexByItem(item) {
    for(let i = 0; i < this.current.length; i++) {
      if(this.current[i] === item) {
        return i;
      }
    }
    
    return -1;
  }
  
  // Syncs the array database to the JSON database
  write() {
    let newJSON = {};
    
    for(let i = 0; i < this.current.length; i++) {
      newJSON[i + 1] = this.current[i];
    }
    
    fs.writeFileSync(this.filePath, JSON.stringify(newJSON, null, 2));
  }
  
  // Reads the JSON database to an array
  read() {
    let currentJSON = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
    let currentArray = new Array();
    
    let i = 0;
    for(let key in currentJSON) {
      currentArray[i] = currentJSON[key];
      i++;
    }
    
    this.current = currentArray;
    
  }
};