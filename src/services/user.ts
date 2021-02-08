import { pick } from './utils'

export const modelToUser = (model: UserModel): User =>
  pick(model, ['id', 'firstName', 'lastName', 'avatar', 'email', 'type'])

export const equalUserModels = (a: UserModel, b: UserModel) => a.id === b.id

export default {
  modelToUser,
  equalUserModels,
}
