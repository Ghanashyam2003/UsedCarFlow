import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  vin:{type:String,required:true,unique:true},
  make:String, model:String, year:Number, odometer:Number,
  source:String, purchasePrice:Number,
  status:{type:String, enum:['draft','appraised','listed','sold','transferred'], default:'draft'},
  createdAt:{type:Date,default:Date.now}
});
export default mongoose.model('Vehicle', schema);
