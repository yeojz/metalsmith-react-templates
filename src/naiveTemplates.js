/**
 *  Simple Micro Templating Function
 */
export default (str, data) => {

  // Iterates through the keys in file object
  // and interpolate / replace {{key}} with it's value
  for (let k in data){
    if (data.hasOwnProperty(k)){
      let exp = '{{' + k + '}}';
      let regex = new RegExp(exp, 'g');

      str = str.replace(regex, data[k]);
    }
  }

  // Assign the final result back into the contents field
  data.contents = new Buffer(str);

  return data;
};



