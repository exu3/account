import Username from './Username';
import Picture from './Picture';
import Name from './Name';
import DisplayName from './DisplayName';
import Pronoun from './Pronoun';
import Phone from './Phone';
import Bio from './Bio';
import Volunteer from './Volunteer';
import Title from './Title';
import CodeOfConduct from './CodeOfConduct';
import Badges from './Badges';

export {
  Username, Picture, Name, DisplayName, Pronoun, Phone, Bio, Volunteer, Title, CodeOfConduct, Badges,
};
const allExports = [Username, Picture, Name, DisplayName, Pronoun, Phone, Bio, Volunteer, Title, CodeOfConduct, Badges];

const UserProperty = (fields) => {
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

export default UserProperty