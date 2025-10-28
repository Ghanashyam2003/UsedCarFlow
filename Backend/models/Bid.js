import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  auction:{type:mongoose.Schema.Types.ObjectId, ref:'Auction', required:true},
  bidderName:String, amount:Number, time:{type:Date,default:Date.now}
});
export default mongoose.model('Bid', schema);
