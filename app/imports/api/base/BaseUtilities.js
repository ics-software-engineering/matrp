import { Meteor } from 'meteor/meteor';
import { MARTP } from '../matrp/MATRP';

export const removeAllEntities = () => {
  if (Meteor.isTest || Meteor.isAppTest) {
    MARTP.collections.forEach(collection => {
      collection._collection.remove({});
    });
  } else {
    throw new Meteor.Error('removeAllEntities not called in testing mode.');
  }
  return true;
};
