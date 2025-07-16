import { dbContext } from "../db/DbContext.js"

class TagsService{
    async deleteTag(tagId) {
        const deletedTag = await dbContext.Tag.findById(tagId)
        await deletedTag.deleteOne()
        return `${deletedTag.name} has been deleted!`
    }
    async getAllTags() {
        const tags = await dbContext.Tag.find()
        return tags
    }

    async createTag(tagData) {
        const tag = await dbContext.Tag.create(tagData)
        return tag
    }

}

export const tagsService = new TagsService()