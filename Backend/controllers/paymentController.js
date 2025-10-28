import Payment from "../models/Payment.js";

export const addPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPayments = async (req, res) => {
  try {
    const list = await Payment.find().populate("vehicle");
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
