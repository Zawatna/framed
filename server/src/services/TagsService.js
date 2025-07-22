import { dbContext } from "../db/DbContext.js"

class TagsService {

  async getPhotoTagsByQuery(tagsQuery) {
    const photoTags = await dbContext.Tags.find({ name: tagsQuery })
      .populate(
        {
          path: 'photoTags',
          populate: {
            path: 'photo',
          }
        })
    return photoTags
  }
  async getAlbumTagsByQuery(tagsQuery) {
    const photoTags = await dbContext.Tags.find({ name: tagsQuery })
      .populate(
        {
          path: 'albumTags',
          populate: {
            path: 'album',
            populate: {
              path: 'photos'
            }
          }
        })
    return photoTags
  }



  async checkForNewTags(tags) {
    const tagsHolder = await dbContext.Tags.find({ name: tags }) // get tags that are created already
    const tagNames = tagsHolder.map(tag => tag.name) // turn tags that are created into strings
    const createNewTags = tags.filter(tag => !tagNames.includes(tag)) // compare tags that are created vs ones that arent and store uncreated ones 
    const newTagsData = createNewTags.map(str => { return { name: str } }) // turn the strings of uncreated Tags into objects 

    const newTagsCreated = await this.createTag(newTagsData) // create the new tags
    //ignore this error, it works...probably - Jeremy
    tagsHolder.push(...newTagsCreated) // add the newly created tags to the already created tags array

    return tagsHolder //send back an array of all tag strings they sent us now as created tag objects?
  }
  async deleteTag(tagId) {
    const deletedTag = await dbContext.Tags.findById(tagId)
    await deletedTag.deleteOne()
    return `${deletedTag.name} has been deleted!`
  }
  async getAllTags() {
    const tags = await dbContext.Tags.find()
    return tags
  }

  async createTag(tagData) {
    const tag = await dbContext.Tags.create(tagData);
    return tag;
  }
}

export const tagsService = new TagsService()