
export const lokalStorage = (method, key, value) => {
  switch (method) {
    case "set":
      localStorage.setItem(key, JSON.stringify(value));
      return `${key} Successfully, ADDED!`; 
    case "get":
      const storedValue = localStorage.getItem(key);
      if(storedValue===null||storedValue==="undefined"||storedValue===undefined) {
        return ;
      }
      console.log("storedValue", storedValue);
      return storedValue ? JSON.parse(storedValue) : false;

    case "remove":
      localStorage.removeItem(key);
      return `${key} Successfully, REMOVED!`; 
    default:
      return "undefined function parameters"; 
  }
};

// export const secureLokalStorage = (method, key, value) => {
//   switch (method) {
//     case "set":
//       secureLocalStorage.setItem(key, value);
//       return `${key} Successfully, ADDED!`;
//     case "get":
//       const storedvalue = secureLocalStorage.getItem(key);

//       return storedvalue ? storedvalue : `${key} NOT found!`;

//     case "remove":
//       secureLocalStorage.removeItem(key);
//       return `${key} Successfully, REMOVED!`;
//     case "removeAll":
//       secureLocalStorage.clear();
//       return "Success, All REMOVED!";
//     default:
//       return "undefined function parameters";
//   }
// };
