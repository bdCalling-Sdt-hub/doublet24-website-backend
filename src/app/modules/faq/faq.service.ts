import { StatusCodes } from 'http-status-codes'
import ApiError from '../../../errors/ApiError'
import { IFaq } from './faq.interface'
import { Faq } from './faq.model'

const createFaqToDB = async (payload: IFaq): Promise<IFaq> => {
  const createFaq = await Faq.create(payload)

  if (!createFaq) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created faq!')
  }

  return createFaq
}
const getAllFaqToDB = async (): Promise<IFaq[]> => {
  const createFaq = await Faq.find()

  return createFaq
}

const updateFaqToDB = async (
  id: string,
  payload: IFaq,
): Promise<IFaq | null> => {
  const faq = await Faq.findOneAndUpdate({ _id: id }, payload, { new: true })
  if (!faq) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Faq doesn't exist!")
  }

  return faq
}

const deleteFaqToDB = async (id: string): Promise<IFaq> => {
  const faq = await Faq.findByIdAndDelete(id)

  if (!faq) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Faq doesn't exist!")
  }

  return faq
}

export const FaqService = {
  createFaqToDB,
  getAllFaqToDB,
  updateFaqToDB,
  deleteFaqToDB,
}
