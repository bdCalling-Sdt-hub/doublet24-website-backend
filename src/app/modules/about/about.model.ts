import { model, Schema } from 'mongoose';
import { IAbout } from './about.interface';

const aboutSchema = new Schema<IAbout>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const About = model<IAbout>('About', aboutSchema);
