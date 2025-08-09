import path from 'path';
import fs from 'fs';
import YAML from 'yaml';
import type { JsonObject } from 'swagger-ui-express';

export function getSpecPath(): string {
  return path.resolve(process.cwd(), 'mimo_movies.yaml');
}

export function loadOpenApiDocument(): JsonObject {
  const file = fs.readFileSync(getSpecPath(), 'utf8');
  return YAML.parse(file) as JsonObject; 
}