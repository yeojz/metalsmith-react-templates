import path from 'path';

const fixtures = path.resolve(__dirname, 'fixtures');

const trimContent = (content) => {
    return content.replace(/(\r\n|\n|\r)/gm, ''); // Remove line breaks;
}

const getContent = (file) => {
    return trimContent(file.contents.toString());
}

export default {
    fixtures,
    getContent,
    trimContent
}
