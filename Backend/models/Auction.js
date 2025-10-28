import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  vehicle:{type:mongoose.Schema.Types.ObjectId, ref:'Vehicle', required:true},
  startPrice:Number, reservePrice:Number,
  auctionType:{type:String,enum:['timed','live','silent'],default:'timed'},
  startTime:Date, endTime:Date,
  status:{type:String,enum:['scheduled','ongoing','completed','cancelled'],default:'scheduled'}
});
export default mongoose.model('Auction', schema);
