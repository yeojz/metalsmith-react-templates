import path from 'path';

export const fixtures = path.resolve(__dirname, 'fixtures');

// Remove line breaks;
export const trimContent = (content) => {
    return content.replace(/(\r\n|\n|\r)/gm, '');
}

export const getContent = (file) => {
    return trimContent(file.contents.toString());
}
