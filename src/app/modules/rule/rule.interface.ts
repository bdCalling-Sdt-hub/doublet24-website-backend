import { Model } from 'mongoose';

export type IRule = {
  content: string;
  type: 'privacy' | 'terms';
};

export type RuleModel = Model<IRule, Record<string, unknown>>;
