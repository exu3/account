import CodeOfConduct from './CodeOfConduct';
import Name from './Name';
import Phone from './Phone';
import Picture from './Picture';
import Pronoun from './Pronoun';
import Username from './Username';
import Volunteer from './Volunteer';
import DisplayName from './DisplayName';

export {
  CodeOfConduct, Name, Phone, Picture, Pronoun, Username, Volunteer, DisplayName,
};
const allExports = [CodeOfConduct, Name, Phone, Picture, Pronoun, Username, Volunteer, DisplayName];

export default (fields) => {
  let seenProviders = [];
  return fields
    .map((field) => allExports.filter((e) => (
      Array.isArray(e.provides)
        ? e.provides.includes(field)
        : e.provides === field
    )))
    .reduce((accum, arr) => [...accum, ...arr], [])
    .filter((elem) => {
      const wasSeen = seenProviders.includes(Array.isArray(elem.provides) ? elem.provides[0] : elem.provides);
      if (Array.isArray(elem.provides)) seenProviders = [...seenProviders, ...elem.provides];
      else seenProviders.push(elem.provides);
      return !wasSeen;
    });
};
