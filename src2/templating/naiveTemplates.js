import forEach from 'lodash.forown';

// default pattern: {{key}}
const DEFAULT_PATTERN = (key) => (
  new RegExp(`{{${key}}}`, 'g')
);

// Iterates through the keys in data object
// and replace the search pattern with it's value
const findAndReplaceKeyPattern = (str, data, pattern) => {
    forEach(data, (value, key) => {
        const regex = pattern(key);
        str = str.replace(regex, value);
    });
    return str;
}

function naiveTemplates(str, data, pattern) {
    if (!pattern) {
        pattern = DEFAULT_PATTERN;
    }
    return findAndReplaceKeyPattern(str, data, pattern);
}

export default naiveTemplates;
