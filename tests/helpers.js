import path from 'path';

const fixtures = path.resolve(__dirname, 'fixtures');

// Remove line breaks;
const trimContent = (content) => {
    return content.replace(/(\r\n|\n|\r)/gm, '');
}

const getContent = (file) => {
    return trimContent(file.contents.toString());
}

export default {
  fixtures,
  getContent,
  trimContent
}
