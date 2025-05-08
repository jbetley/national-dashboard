// general utility functions
// author:   jbetley (https://github.com/jbetley)
// version:  1.02
// date:     05.02.25 


// convert array of objects to csv
function convertArrayToCSV(data) {
  const header = Object.keys(data[0]).join(',');
  const rows = data.map(obj => Object.values(obj).join(','));
  return `${header}\n${rows.join('\n')}`;
}


// export data to csv 
function downloadCSV(csv, filename) {
  const csvFile = new Blob([csv], { type: 'text/csv' });
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(csvFile);
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}


// sorts objects by number, moves blanks to end
function sortObjectsByNumberWithBlanksToEnd(arr, property) {
  arr.sort((a, b) => {
     const aValue = a[property];
     const bValue = b[property];
     if ((aValue === null || aValue === undefined || aValue === '') && (bValue !== null && bValue !== undefined && bValue !== '')) {
        return 1; 
     }
     if ((bValue === null || bValue === undefined || bValue === '') && (aValue !== null && aValue !== undefined && aValue !== '')) {
        return -1;
     }
     
     return (bValue || 0) - (aValue || 0);
  });
  return arr;
}


// format raw phone number string (keeps '+1' international
// prefix if exists)
function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
};


// converts lower/upper case strings to title case
function proper(str) {
  let upper = true
  let newStr = ''
  for (let i = 0, l = str.length; i < l; i++) {
      // Note that you can also check for all kinds of spaces  with
      // str[i].match(/\s/)
      if (str[i] == ' ') {
          upper = true
          newStr += str[i]
          continue
      }
      newStr += upper ? str[i].toUpperCase() : str[i].toLowerCase()
      upper = false
  }
  return newStr
};


// split object into two objects at passed index
// use: const [firstPart, secondPart] = splitObject(data, 6);
function splitObject(obj, index) {
  const keys = Object.keys(obj);
  const firstHalf = {};
  const secondHalf = {};

  for (let i = 0; i < keys.length; i++) {
      if (i < index) {
        firstHalf[keys[i]] = obj[keys[i]];
      } else {
        secondHalf[keys[i]] = obj[keys[i]];
      }
  }
  return [firstHalf, secondHalf];
};


// retrieves the first year (YYYY) string
// found in an object key
function getYearString(object) {
  const regex = /(20)\d{2}\b/;
  for (const key in object) {
     if (object.hasOwnProperty(key)) {
        if (regex.test(key)) {
           return key.match(regex)[0];
        }
     }
  }
  return null;
};


// removes passed substring from all object keys
function removeSubstringFromKeys(obj, substring) {
  const newObj = {};
  for (const key in obj) {
     if (obj.hasOwnProperty(key)) {
        const newKey = key.replace(substring, '');
        newObj[newKey] = obj[key];
     }
  }
  return newObj;
}


// remove 'n' elements from the front of an array
const dropElements = (arr, n = 1) => arr.slice(n);


// converts object keys to a string
function toString(o) {
  Object.keys(o).forEach(k => {
     if (typeof o[k] === 'object') {
        return toString(o[k]);
     }   
     o[k] = '' + o[k];
  });
  return o;
};


// filter an array of objects by the keys listed in 'keep'
function filterObj(list, kept) {
  return list.map(o => Object.fromEntries(kept.map(k => [k, o[k]])))
};


// remove keys from an array of objects if they are not present in array
function filterKeys(arr, keepKeys) {
  return arr.map(obj => {
    const newObj = {};
    for (const key in obj) {
      if (keepKeys.includes(key)) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  });
};


// remove object elements matching the passed string in
// an array of objects
function filterByValue(array, string) {
  array.filter(obj =>
    Object.keys(obj).forEach(key => {
      if (obj[key] == string) delete obj[key];
    })
  )
};


// returns true if all objects within an array have less than
// 'threshold' keys
function areAllObjectKeysLessThan(arr, threshold) {
  return arr.every(obj => Object.keys(obj).length < threshold);
}


// filter data by the key values present in categories array
function filterCategories(data, categories) {
  let filtered = Object.fromEntries(
      categories
      .filter(
        key => key in data
      ) 
      .map(
        key => [ key, data[key] ]
      )
  )
  return filtered
};


// remove all letters and symbols from a string and return the
// remaining numerals as an Int
function scrapeNumbers(arr) {
  return arr.map(str => parseInt(str.replace(/[^0-9]/g, '')));
};


 // get object keys as an array
 function getKeys(data) {
  let keys = Object.keys(data.reduce(function(result, obj) {
    return Object.assign(result, obj);
  }, {}))

  return keys
};


// convert 4 digit year to six digit (2024 -> 2023-24)
function longYear(year) {
  let prevYear = Number(year) - 1;
  let fullYear = toString(prevYear) + '-' + year.slice(2);
  return fullYear
};


// Sort object as an array based on values
function sortObj(obj) {
  return Object.keys(obj).map(k => ([k, obj[k]])).sort((a, b) => (b[1] - a[1]))
};


// returns true if sum of all values is either Nan/Null or 0
function isValid(obj) {
  let sum = Object.values(obj).reduce((a, b) => Number(a) + Number(b), 0);
  if (isNaN(sum) || sum == 0) {
    return false
  }
  else {
    return true
  }
};


// pass a (single) object and a list of keys - will return
// 'true' if object contains any of the keys in the list
function containsAnyKey(obj, keys) {
  for (const key of keys) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
};


// rename a key in an array of objects
function renameKey(array, oldKey, newKey) {
  return array.map(obj => {
     if (obj.hasOwnProperty(oldKey)) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
     }
     return obj;
  });
};


// see title of function
function replaceSubstringInArrayOfObjects(arr, key, searchValue, replaceValue) {
  return arr.map(obj => {
     if (obj.hasOwnProperty(key) && typeof obj[key] === 'string') {
        obj[key] = obj[key].replace(searchValue, replaceValue);
     }
     return obj;
  });
};


// sort an array of objects by a provided property and list order
function orderByProperty(arr, property, order) {
  const orderMap = order.reduce((acc, value, index) => {
    acc[value] = index;
    return acc;
  }, {});

  arr.sort((a, b) => {

    const aIndex = orderMap[a[property]];
    const bIndex = orderMap[b[property]];

    if (aIndex === undefined && bIndex === undefined) return 0;
    if (aIndex === undefined) return 1;
    if (bIndex === undefined) return -1;

    return aIndex - bIndex;
  });

  return arr;
};


// Get most recent year from array of object keys
function getYearList(data) {
  let cols = Object.keys(data[0]);
  let years = cols.filter(item => !["District Name", "District ID"].includes(item));
  years.sort()
  years.reverse()

  return years
}


// replace the first duplicate value in the passed 'obj'
// with the passed 'newValue'
function replaceDuplicate(obj, newValue) {
  const seenValues = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (seenValues[value]) {
        obj[key] = newValue;
        return obj; // Exit after replacing the first duplicate
      } else {
        seenValues[value] = true;
      }
    }
  }
  return obj; // No duplicates found
};


// Merge objects in an array with the same "key" value
function mergeObjectsWithSameValue(arr, key) {
  const merged = {};
  arr.forEach(obj => {
      const value = obj[key];
      if (merged[value]) {
        Object.assign(merged[value], obj);
      } else {
        merged[value] = obj;
      }
  });
  return Object.values(merged);
};


// Swap keyToKeep value with keyToReplace and drop both
// original items in the object
function replaceKeyWithValue(arr, keyToKeep, keyToReplace) {
  return arr.map(obj => {
      if (obj.hasOwnProperty(keyToReplace)) {
        const value = obj[keyToKeep];
        obj[value] = obj[keyToReplace];
        delete obj[keyToKeep];
        delete obj[keyToReplace];
      }
      return obj;
  });
};


// converts array of objects with nested arrays of objects
// into a single array of objects with no nesting
function flattenObject(data) {
  let arrays = [];
  for (let j = 0; j < data.length; j++) {
    arrays.push(data[j].values);
  }
  flatArray = arrays.flat()
  return flatArray
};


// converts an array of strings to camelcase splitting on
// the passed delimiter
function toCamelCase(arr,delimiter) {
  let final = arr.map(str => {
      return str.split(delimiter).map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join('');
  });
  let camel = final.map(str => str.charAt(0).toLowerCase() + str.slice(1));

  return camel
};


// determine whether any of a list of provided substrings is in
// an object
function checkSubstringsInObjectKeys(obj, substrings) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      for (const substring of substrings) {
        if (key.includes(substring)) {
          return true;
        }
      }
    }
  }
  return false;
};


// determine whether passed string exists in the passed array
function exists(arr, search) {
  return arr.some(row => row.includes(search));
};


 // removes all existing elements from select element (dropdown)
 function removeOptions(selectElement) {
  var i, L = selectElement.options.length - 1;
  for(i = L; i >= 0; i--) {
     selectElement.remove(i);
  }
};


// remove items from an object matching the passed value
function removeItemsByValue(obj, value) {
  for (const key in obj) {
    if (obj[key] === value) {
      delete obj[key];
    }
  }
};


// remove given value from an array of objects (same as above, but
// for array of objects)
function removeObjectWithValue(array, key, value) {
  return array.filter(obj => obj[key] !== value);
};
