import { type SchemaTypeDefinition } from 'sanity'
import { OrderSchema } from './order'
import { productSchema } from './products'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [OrderSchema,productSchema],
}
