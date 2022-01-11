import { dogsService } from "../services/DogsService";
import BaseController from '../utils/BaseController'

export class DogsController extends BaseController {
    constructor() {
        super('api/dogs')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .post('', this.create)
            .put('/:id', this.edit)
            .remove('/:id', this.remove)
    }

    async getAll(req, res, next) {
        try {
            const dogs = await dogsService.getAll()
            return res.send(dogs)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const dogs = await dogsService.getById(req.params.id)
            return res.send(dogs)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const dogs = await dogsService.create(req.body)
            return res.send(dogs)
        } catch (error) {
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            req.body.id = req.params.id
            const dogs = await dogsService.edit(req.body)
            return res.send(dogs)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const dogs = await dogsService.remove(req.params.id)
            res.send({ message: 'deleted' })
        } catch (error) {
            next(error)
        }
    }

}