export const lokalStorage = (method, key, value) => {
  switch (method) {
    case "set":
      localStorage.setItem(key, JSON.stringify(value));
      return `${key} Successfully, ADDED!`; //true
    case "get":
      const storedvalue = localStorage.getItem(key);

      return storedvalue ? JSON.parse(localStorage.getItem(key)) : false;

    case "remove":
      localStorage.removeItem(key);
      return `${key} Successfully, REMOVED!`; //true
    default:
      return "undefined function parameters"; //false
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
