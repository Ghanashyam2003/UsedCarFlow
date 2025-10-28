import Appraisal from "../models/Appraisal.js";

export const addAppraisal = async (req, res) => {
  try {
    const appraisal = new Appraisal(req.body);
    await appraisal.save();
    res.status(201).json(appraisal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAppraisals = async (req, res) => {
  try {
    const list = await Appraisal.find().populate("vehicle");
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
