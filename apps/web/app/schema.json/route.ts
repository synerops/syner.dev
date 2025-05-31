import { NextResponse } from 'next/server';
import { Workflow } from '@synerdev/workflows';

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: Workflow.shape,
  required: Object.keys(Workflow.shape),
};

export const dynamic = "force-static";

export async function GET() {
  // Option 1: Return the schema's shape (field names and types)
  // This is not a standard JSON, but you can inspect the shape
  // const schemaShape = Workflow.shape;

  // Option 2: Return an example value (if you have one)
  // const example = Workflow.parse({ ... });

  // Option 3: Return the schema description (if you used .describe())
  // const description = Workflow.description;

  // Option 4: Return the schema as JSON (if you have a custom toJSON method)
  // const schemaJson = Workflow.toJSON ? Workflow.toJSON() : {};

  return NextResponse.json(schema);
}