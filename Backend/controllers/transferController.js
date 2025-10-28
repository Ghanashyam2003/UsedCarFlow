import Transfer from "../models/Transfer.js";

export const addTransfer = async (req, res) => {
  try {
    const transfer = new Transfer(req.body);
    await transfer.save();
    res.status(201).json(transfer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find().populate("vehicle");
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
