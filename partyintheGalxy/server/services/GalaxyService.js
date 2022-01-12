import { dbContext } from "../db/DbContext"
import { BadRequest } from '../utils/Errors'

class GalaxyService {
    async getAll(query = {}) {
        const galaxies = await dbContext.Galaxy.find(query).populate('creator')
        return galaxies
    }

    async getById(id) {
        const galaxy = await dbContext.Galaxy.findById(id).populate('creator')
        if (!galaxy) {
            throw new BadRequest('Invalid Id')
        }
        return galaxy
    }

    async create(newGalaxy) {
        const galaxy = await dbContext.Galaxy.create(newGalaxy)
        await galaxy.populate('creator')
        return galaxy
    }

    async edit(update) {
        const og = await this.getById(update.id)
        if (og.creatorId.toString() !== update.creatorId) {
            throw new BadRequest('Unauthorized Access')
        }
        og.name = update.name || og.name
        await og.save()
        return og
    }

    async remove(id, userId) {
        const og = await this.getById(id)
        if (og.creatorId.toString() !== userId) {
            throw new BadRequest('Unauthorized Access')
        }
        await dbContext.Galaxy.findOneAndRemove({ _id: id })
    }
}

export const galaxyService = new GalaxyService()