import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useParams } from "react-router-dom";
import "./AuctionPage.css";

const AuctionPage = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [form, setForm] = useState({ bidderName: "", amount: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuctionAndBids();
  }, []);

  const fetchAuctionAndBids = async () => {
    try {
      const auctionRes = await API.get(`/auctions`);
      const foundAuction = auctionRes.data.find((a) => a._id === id);
      setAuction(foundAuction || null);

      const bidsRes = await API.get(`/bids/auction/${id}`);
      setBids(bidsRes.data);

      setLoading(false);
    } catch (err) {
      console.error("Error loading auction:", err);
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const placeBid = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/bids/${id}`, {
        bidderName: form.bidderName,
        amount: Number(form.amount),
      });
      alert("Bid placed successfully!");
      setBids((prev) => [res.data, ...prev]);
      setForm({ bidderName: "", amount: "" });
    } catch (err) {
      console.error("Error placing bid:", err);
      alert(err.response?.data?.message || "Error placing bid");
    }
  };

  if (loading)
    return <div className="loading-text">Loading auction details...</div>;

  if (!auction)
    return <div className="not-found-text">Auction not found.</div>;

  return (
    <div className="auction-container">
      <h2 className="auction-title">Auction Details</h2>

      <div className="auction-details">
        <p>
          <strong>Vehicle ID:</strong> {auction.vehicle}
        </p>
        <p>
          <strong>Start Price:</strong> ₹{auction.startPrice}
        </p>
        <p>
          <strong>Status:</strong> <span>{auction.status}</span>
        </p>
        <p>
          <strong>Start Time:</strong>{" "}
          {new Date(auction.startTime).toLocaleString()}
        </p>
        <p>
          <strong>End Time:</strong>{" "}
          {new Date(auction.endTime).toLocaleString()}
        </p>
      </div>

      <div className="place-bid-section">
        <h3>Place Your Bid</h3>
        <form onSubmit={placeBid} className="bid-form">
          <input
            type="text"
            name="bidderName"
            value={form.bidderName}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Bid Amount (₹)"
            required
          />
          <button type="submit">Place Bid</button>
        </form>
      </div>

      <div className="bids-section">
        <h3>Bids History</h3>
        {bids.length === 0 ? (
          <p className="text-gray">No bids yet. Be the first to bid!</p>
        ) : (
          <ul className="bid-list">
            {bids.map((b) => (
              <li key={b._id} className="bid-item">
                <span className="bidder-name">{b.bidderName}</span>
                <span className="bid-amount">₹{b.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AuctionPage;
