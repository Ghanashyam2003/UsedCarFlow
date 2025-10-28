import Auction from "../models/Auction.js";
import Bid from "../models/Bid.js";

export const placeBid = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { bidderName, amount } = req.body;

    const auction = await Auction.findById(auctionId);
    if (!auction) return res.status(404).json({ message: "Auction not found" });
    if (auction.status !== "ongoing")
      return res.status(400).json({ message: "Auction not open" });

    const highest = await Bid.find({ auction: auctionId }).sort({ amount: -1 }).limit(1);
    const highestAmount = highest.length ? highest[0].amount : auction.startPrice;
    const minIncrement = Math.max(100, Math.round(highestAmount * 0.02));

    if (amount < highestAmount + minIncrement)
      return res
        .status(400)
        .json({ message: `Bid must be at least ${highestAmount + minIncrement}` });

    const bid = new Bid({ auction: auctionId, bidderName, amount });
    await bid.save();

    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
