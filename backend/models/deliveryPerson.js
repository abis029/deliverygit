const mongoose = require("mongoose");

const deliveryPersonSchema = mongoose.Schema({
  name: String,
  contact_number: String,
  email: String,
  address: String,
  vehicle_type: String,
  vehicle_number: String,
  assigned_area: {
    type: [String], // Change to an array of strings
    required: true,
},
  current_status: {
    type: String,
    enum: ['Available', 'On Delivery', 'Unavailable'], // Example statuses
    default: 'Available',
  },
  deliveries_completed: Number,
  notes: String,
}, {
  timestamps: true,
});

const DeliveryPerson = mongoose.model("DeliveryPerson", deliveryPersonSchema);
module.exports = DeliveryPerson;
