import { Model } from 'mongoose';

export type ISubscriber = {
  name: string;
  email: string;
  phone: string;
  message: string;
  repliedMessage: string;
  status: 'PENDING' | 'REPLIED';
};

export type SubscriberModel = Model<ISubscriber, Record<string, unknown>>;
