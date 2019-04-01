const tagsModel = require('../models/tagsModel');
const _ = require('lodash');

module.exports = async (listTags) => {
  const data = String(listTags).toLocaleLowerCase().split(",");
  const getAllListTagsInDB = await tagsModel.find();
  const listIdTagsConvertObject = data.map(e => ({name: e}));
  const getListTagsNotExistsInDB = _.differenceBy(listIdTagsConvertObject, getAllListTagsInDB,'name');
  getListTagsNotExistsInDB.length > 0 ? await tagsModel.insertMany(getListTagsNotExistsInDB) : null;
  const getListTagsExistsInDB = await tagsModel.find({name: {$in: data}});
  return getListTagsExistsInDB;
}