import { EvaluateInstanceTree } from '@rbxts/validate-tree';
import { characterSchema } from 'shared/utils/character/schema';

export type Character = EvaluateInstanceTree<typeof characterSchema>;
