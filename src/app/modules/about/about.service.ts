import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { IAbout } from './about.interface';
import { About } from './about.model';

const createAboutContentToDB = async (payload: IAbout): Promise<IAbout> => {
  const createAbout = await About.create(payload);
  if (!createAbout) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created About');
  }

  return createAbout;
};

const getAllAboutContentFromDB = async (
  query: Record<string, unknown>
): Promise<IAbout[]> => {
  const result = await About.find();

  return result;
};

const updateAboutContentToDB = async (
  id: string,
  payload: Partial<IAbout>
): Promise<IAbout | null> => {
  const isExist = await About.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "About content doesn't exist!");
  }

  console.log(payload);
  //unlike file
  if (payload.image) {
    unlinkFile(isExist.image);
  }

  const updateAbout = await About.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updateAbout;
};

const deleteAboutContentToDB = async (id: string): Promise<IAbout | null> => {
  const isExist = await About.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "About content doesn't exist!");
  }

  //unlike file
  unlinkFile(isExist.image);

  const deleteAbout = await About.findByIdAndDelete(id);

  return deleteAbout;
};

export const AboutService = {
  createAboutContentToDB,
  getAllAboutContentFromDB,
  updateAboutContentToDB,
  deleteAboutContentToDB,
};
