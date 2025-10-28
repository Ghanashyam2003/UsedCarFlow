import Auction from "../models/Auction.js";

export const createAuction = async (req, res) => {
  try {
    const auction = new Auction(req.body);
    await auction.save();
    res.status(201).json(auction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find().populate("vehicle");
    res.json(auctions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
