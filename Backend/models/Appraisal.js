import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  vehicle:{type:mongoose.Schema.Types.ObjectId, ref:'Vehicle', required:true},
  inspectorName:String, conditionScore:Number, estimatedValue:Number,
  inspectionReport:String, vinCheckResult:String, createdAt:{type:Date,default:Date.now}
});
export default mongoose.model('Appraisal', schema);
