import mongoose from 'mongoose';

// Define the schema for the college with all details included
const collegeSchema = new mongoose.Schema({
  college_name: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  ranking: { type: String, required: true },
  contact_details: [
    {
      type: { type: String, required: true },
      number: [String],
      email: [String],
      url: [String],
    },
  ],
  fee_structure: [
    {
      type: { type: String, required: true },
      amount: { type: String, required: true },
    },
  ],
  curriculum: [
    {
      type: { type: String, required: true },
      branch: { type: String, required: true },
    },
  ],
  seats_available: [
    {
      branch: { type: String, required: true },
      total_seats: { type: String, required: true },
      category_wise_seats: [
        {
          category: { type: String, required: true },
          seats: { type: String, required: true },
        },
      ],
    },
  ],
  past_year_cutoff: [
    {
      year: { type: String, required: true },
      overall_cutoff: [
        {
          category: { type: String, required: true },
          cutoff: { type: String, required: true },
        },
      ],
      branch_wise_cutoff: [
        {
          branch: { type: String, required: true },
          cutoff: { type: String, required: true },
        },
      ],
    },
  ],
  hostel_facilities: [
    {
      type: { type: String, required: true },
      availability: { type: String, required: true },
      amenities: [String],
    },
  ],
  scholarships: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  placement_data: [
    {
      year: { type: String, required: true },
      total_students_placed: { type: String, required: true },
      average_package: { type: String, required: true },
      highest_package: { type: String, required: true },
      top_recruiters: [String],
      branch_wise: [
        {
          branch: { type: String, required: true },
          students_placed: { type: String, required: true },
        },
      ],
    },
  ],
  alumni_data: [
    {
      name: { type: String, required: true },
      graduation_year: { type: Number, required: true },
      current_position: { type: String, required: true },
      achievements: { type: String, required: true },
    },
  ],
});

export const College = mongoose.model('College', collegeSchema);
