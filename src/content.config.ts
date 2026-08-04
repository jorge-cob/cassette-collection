import { defineCollection } from 'astro:content';
import cassetteSchema from './schemas/cassette.schema';
import { glob } from 'astro/loaders';

const cassettesCollection = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/cassettes'
  }),

  schema: cassetteSchema
});

export const collections = {
  cassettes: cassettesCollection
};