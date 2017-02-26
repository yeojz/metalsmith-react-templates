import fs from 'fs';
import path from 'path';

export default {
  baseFileDefault: fs.readFileSync(path.join(__dirname, 'baseFileDefault.html'), 'utf-8'),
  default: fs.readFileSync(path.join(__dirname, 'default.html'), 'utf-8'),
  defaultCustomKey: fs.readFileSync(path.join(__dirname, 'defaultCustomKey.html'), 'utf-8'),
  other: fs.readFileSync(path.join(__dirname, 'other.html'), 'utf-8'),
  variable: fs.readFileSync(path.join(__dirname, 'variable.html'), 'utf-8')
}
