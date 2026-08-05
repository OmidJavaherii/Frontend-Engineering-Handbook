import fs from 'node:fs'
import YAML from 'yaml'
import { RegistrySchema, type Registry, type Topic } from './types.js'
import { REGISTRY_PATH } from './paths.js'

export function loadRegistry(filePath = REGISTRY_PATH): Registry {
  const raw = fs.readFileSync(filePath, 'utf8')
  const data = YAML.parse(raw)
  return RegistrySchema.parse(data)
}

export function indexTopics(registry: Registry): Map<string, Topic> {
  return new Map(registry.topics.map((t) => [t.id, t]))
}
