import Vehicle from '../models/Vehicle.js';
export const addVehicle = async (req,res)=>{
  try{ const v = new Vehicle(req.body); await v.save(); res.status(201).json(v); }
  catch(e){ res.status(500).json({message:e.message}); }
};
export const getVehicles = async (req,res)=>{
  try{ const list = await Vehicle.find().sort('-createdAt'); res.json(list); }
  catch(e){ res.status(500).json({message:e.message}); }
};
export const getVehicleById = async (req,res)=>{ try{ const v=await Vehicle.findById(req.params.id); if(!v) return res.status(404).json({message:'Not found'}); res.json(v);}catch(e){res.status(500).json({message:e.message});} };
export const updateVehicle = async (req,res)=>{ try{ const v=await Vehicle.findByIdAndUpdate(req.params.id, req.body, {new:true}); res.json(v);}catch(e){res.status(500).json({message:e.message});} };
