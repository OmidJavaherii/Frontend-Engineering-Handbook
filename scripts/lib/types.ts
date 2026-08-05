import { z } from 'zod'

export const DifficultySchema = z.enum(['beginner', 'junior', 'mid', 'senior', 'expert'])
export const StatusSchema = z.enum(['stub', 'outline', 'draft', 'reviewed', 'published'])

export const TopicSchema = z.object({
  id: z.string().regex(/^[0-9]{2}-[a-z0-9-]+(?:\.[a-z0-9-]+)+$/),
  title: z.string().min(1),
  module: z.string().regex(/^[0-9]{2}-[a-z0-9-]+$/),
  path: z.string().min(1),
  difficulty: DifficultySchema,
  estimated_reading_minutes: z.number().int().nonnegative(),
  estimated_implementation_minutes: z.number().int().nonnegative(),
  prerequisites: z.array(z.string()).default([]),
  recommended_next: z.array(z.string()).default([]),
  parents: z.array(z.string()).default([]),
  children: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  depends_on: z.array(z.string()).default([]),
  dependents: z.array(z.string()).default([]),
  advanced: z.array(z.string()).default([]),
  beginner_path: z.string().optional(),
  perspective_of: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  status: StatusSchema,
  order: z.number().int().nonnegative(),
})

export const RegistrySchema = z.object({
  version: z.number().int().positive(),
  modules: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      order: z.number().int().nonnegative(),
    }),
  ),
  topics: z.array(TopicSchema),
})

export const TagSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
})

export const TagsFileSchema = z.object({
  tags: z.array(TagSchema),
})

export const LearningPathSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  audience: z.string(),
  topic_ids: z.array(z.string()).min(1),
})

export const LearningPathsFileSchema = z.object({
  paths: z.array(LearningPathSchema),
})

export type Topic = z.infer<typeof TopicSchema>
export type Registry = z.infer<typeof RegistrySchema>
export type LearningPath = z.infer<typeof LearningPathSchema>
