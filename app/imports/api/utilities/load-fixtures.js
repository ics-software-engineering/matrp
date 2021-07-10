import _ from 'lodash';
// import { Stuffs } from '../stuff/StuffCollection';

/**
 * Returns the definition array associated with collectionName in the loadJSON structure,
 * or an empty array if none was found.
 * @param loadJSON The load file contents.
 * @param collection The collection of interest.
 * @memberOf api/test
 */
export const getDefinitions = (loadJSON, collection) => {
  const definitionObj = _.find(loadJSON.collections, (obj) => obj.name === collection);
  return definitionObj ? definitionObj.contents : [];
};

export const loadCollectionNewDataOnly = (collection, loadJSON, printToConsole) => {
  let retVal = '';
  // console.log('loadCollectionNewDataOnly', loadJSON, printToConsole, typeof collection);
  const type = collection.getType();
  const definitions = getDefinitions(loadJSON, collection.getCollectionName());
  let count = 0;
  definitions.forEach((definition) => {
    if (collection.find(definition).count() === 0) {
      collection.define(definition);
      count++;
    }
    // switch (type) {
    // case Stuffs.getType():
    //   if (Stuffs.find(definition).count() === 0) {
    //     Stuffs.define(definition);
    //     count++;
    //   }
    //   break;
    // default:
    //   // do nothing.
    // }
  });
  if (count > 1) {
    retVal += `Defined ${count} ${type}s`;
  } else if (count === 1) {
    retVal += `Defined a ${type}`;
  }
  if (printToConsole) {
    console.log(retVal);
  }
  return retVal;
};