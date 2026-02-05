import { Request, Response } from 'express';
import User from '../models/user.model.js';
import uploadImage from '../config/cloudinary.js';
import geminiRes from '../config/gemini.js';


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
export const askToAssistant = async (req: Request, res: Response) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "can not find user"
      })
    }
    const assistantName = user.assistantName || "shifra";
    const userName = user.name;

    const result = await geminiRes(command, assistantName, userName);

    const matchJSON = result.match(/{[\s\S]*}/);
    if (!matchJSON) {
      return res.status(400).json({
        success: false,
        message: "sorry i can't understand"
      })
    }
    const ans = JSON.parse(matchJSON[0]);
    const type = ans.type;

  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Can not ask to AI"
    })
  }
}