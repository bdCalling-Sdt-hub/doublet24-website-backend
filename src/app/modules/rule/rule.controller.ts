import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { RuleService } from './rule.service'

//privacy policy
const createPrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const { ...privacyData } = req.body
  const result = await RuleService.createPrivacyPolicyToDB(privacyData)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Privacy policy created successfully',
    data: result,
  })
})

const getPrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await RuleService.getPrivacyPolicyFromDB()

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Privacy policy retrieved successfully',
    data: result,
  })
})

const updatePrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const { ...privacyData } = req.body
  const result = await RuleService.updatePrivacyPolicyToDB(privacyData)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Privacy policy updated successfully',
    data: result,
  })
})

//terms and conditions
const createTermsAndCondition = catchAsync(
  async (req: Request, res: Response) => {
    const { ...termsData } = req.body
    const result = await RuleService.createTermsAndConditionToDB(termsData)

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Terms and conditions created successfully',
      data: result,
    })
  },
)

const getTermsAndCondition = catchAsync(async (req: Request, res: Response) => {
  const result = await RuleService.getTermsAndConditionFromDB()

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Terms and conditions retrieved successfully',
    data: result,
  })
})

const updateTermsAndCondition = catchAsync(
  async (req: Request, res: Response) => {
    const { ...termsData } = req.body
    const result = await RuleService.updateTermsAndConditionToDB(termsData)

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Terms and conditions updated successfully',
      data: result,
    })
  },
)

//about
const createAbout = catchAsync(async (req: Request, res: Response) => {
  const { ...aboutData } = req.body
  const result = await RuleService.createAboutToDB(aboutData)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'About created successfully',
    data: result,
  })
})

const getAbout = catchAsync(async (req: Request, res: Response) => {
  const result = await RuleService.getAboutFromDB()

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'About retrieved successfully',
    data: result,
  })
})

const updateAbout = catchAsync(async (req: Request, res: Response) => {
  const { ...aboutData } = req.body
  const result = await RuleService.updateAboutToDB(aboutData)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'About updated successfully',
    data: result,
  })
})

export const RuleController = {
  createPrivacyPolicy,
  getPrivacyPolicy,
  updatePrivacyPolicy,
  createTermsAndCondition,
  getTermsAndCondition,
  updateTermsAndCondition,
  createAbout,
  getAbout,
  updateAbout,
}
