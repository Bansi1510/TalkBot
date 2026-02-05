import { Request, Response } from 'express';
import User from '../models/user.model.js';
import uploadImage from '../config/cloudinary.js';


export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.userId;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User can not logged in "
      })
    }
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user can not find"
      })
    }
    return res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "get user error"
    })
  }
}

export const updateUserAssistant = async (req: Request, res: Response) => {
  try {
    const { assistantName, imageUrl } = req.body
    let assistantImage;
    if (req.file) {
      assistantImage = await uploadImage(req.file.path)
    } else {
      assistantImage = imageUrl
    }

    const user = await User.findByIdAndUpdate(req.userId, {
      assistantName, assistantImage
    }, { new: true }).select("-password")

    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: " Assistant update error"
    })
  }
}