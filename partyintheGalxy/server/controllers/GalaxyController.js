import { Auth0Provider } from "@bcwdev/auth0provider";
import { galaxyService } from "../services/GalaxyService";
import BaseController from "../utils/BaseController";

export class GalaxyController extends BaseController {
    constructor() {
        super('api/galaxy')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.remove)
    }

    async getAll(req, res, next) {
        try {
            const galaxies = await galaxyService.getAll(req.query)
            return res.send(galaxies)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const galaxy = await galaxyService.getById(req.params.id)
            return res.send(galaxy)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const galaxy = await galaxyService.create(req.body)
            return res.send(galaxy)
        } catch (error) {
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.id = req.params.id
            const updated = await galaxyService.edit(req.body)
            return res.send(updated)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            await galaxyService.remove(req.params.id, req.userInfo.id)
            return res.send('delorted')
        } catch (error) {
            next(error)
        }
    }

}