/**
 *  naiveTemplates.js
 *
 *  Simple Micro Templating Function
 */

// Generating the tag pattern
const defaultPattern = (key) => new RegExp(`{{${key}}}`, 'g');

// Replacement function
export default (str, data, pattern = null) => {

    // Iterates through the keys in file object
    // and interpolate / replace {{key}} with it's value
    for (let k in data){
        if (data.hasOwnProperty(k)){
            const regex = (typeof pattern === 'function') ? pattern(k) : defaultPattern(k);
            str = str.replace(regex, data[k]);
        }
    }

    // Assign the final result back into the contents field
    data.contents = new Buffer(str);

    return data;
};
