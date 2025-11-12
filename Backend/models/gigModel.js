const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pay: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // ⭐️ 새로 추가된 필드
    jobType: {
      type: String,
      required: true,
      // 예: 'cafe', 'restaurant', 'office', 'field', 'other'
    },
    // ⭐️ 새로 추가된 필드
    clickCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // createdAt, updatedAt 자동 생성
);

module.exports = mongoose.model('Gig', gigSchema);