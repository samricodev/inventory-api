const Autopart = require('../models/autopart');

const getAutoparts = async (req, res) => {
  try {
    const autoparts = await Autopart.find();
    res.json(autoparts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAutopart = async (req, res) => {
  try {
    const autopart = await Autopart.findById(req.params.id);
    res.json(autopart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAutopart = async (req, res) => {
  const autopart = new Autopart(req.body);
  try {
    const newAutopart = await autopart.save();
    res.status(201).json(newAutopart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAutopart = async (req, res) => {
  try {
    const autopart = await Autopart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(autopart);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  } 
}

const deleteAutopart = async (req, res) => {
  try {
    const autopart = await Autopart.findByIdAndDelete(req.params.id);
    res.json(autopart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAutoparts,
  getAutopart,
  createAutopart,
  updateAutopart,
  deleteAutopart
};