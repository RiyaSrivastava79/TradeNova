const {model} = require("mongoose");

const { HoldingSchema } = require('../schemas/HoldingsSchema');

const HoldingsModel = model("holding", HoldingSchema);

module.exports = {HoldingsModel};