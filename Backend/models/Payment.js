import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  vehicle:{type:mongoose.Schema.Types.ObjectId, ref:'Vehicle', required:true},
  buyerName:String, amount:Number, method:String,
  status:{type:String,enum:['pending','success','failed'],default:'pending'},
  paymentDate:Date
});
export default mongoose.model('Payment', schema);
