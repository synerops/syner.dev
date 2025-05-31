import { z } from 'zod';

// Workflow

export const Workflow = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  version: z.string(),
  steps: z.record(z.string(), z.any()), // TODO: add step schema
  context: z.record(z.string(), z.any()),
  metadata: z.record(z.string(), z.any()),
});

export type Workflow = z.infer<typeof Workflow>;

// Steps

export type Step =
  | InputStep
  | OutputStep
  | AIStep
  | ToolStep
  | ConditionStep
  | LoopStep
  | SubworkflowStep;

export type BaseStep = {
  id: string
  name?: string
  description?: string
  output?: string
  next?: string | ConditionalNext
}

export type InputStep = BaseStep & {
  type: 'input'
  config?: {
    variableName: string
    defaultValue?: any
  }
}

export type OutputStep = BaseStep & {
  type: 'output'
  input?: Record<string, any>
}

export type AIStep = BaseStep & {
  type: 'ai'
  config: {
    model: string
    prompt: string
    tools?: ToolDefinition[]
    temperature?: number
    maxTokens?: number
  }
}

export type ToolStep = BaseStep & {
  type: 'tool'
  config: {
    name: string
    args: Record<string, any>
  }
}

export type ConditionStep = BaseStep & {
  type: 'condition'
  config: {
    if: string // expression
    then: string
    else?: string
  }
}

export type LoopStep = BaseStep & {
  type: 'loop'
  config: {
    while: string // expression
    body: string
  }
}

export type SubworkflowStep = BaseStep & {
  type: 'subworkflow'
  config: {
    workflowId: string
    inputs: Record<string, any>
  }
}

export type ConditionalNext = {
  condition: string // e.g. context.score > 5
  branches: Record<string, string> // e.g. 'true': 'stepX', 'false': 'stepY'
}

export type ToolDefinition = {
  name: string
  description?: string
  inputs?: Record<string, string> // param name to type or description
}
