import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  vehicle:{type:mongoose.Schema.Types.ObjectId, ref:'Vehicle', required:true},
  buyerName:String, state:String, titleStatus:String, documents:[String], completedAt:Date
});
export default mongoose.model('Transfer', schema);
