const express = require('express');
const {
  getGigs,
  createGig,
  incrementClickCount,
} = require('../controllers/gigController');

const router = express.Router();

// GET all gigs (with filtering/sorting)
// (e.g., /api/gigs?sort=popular&jobType=cafe)
router.get('/', getGigs);

// POST a new gig
router.post('/', createGig);

// PATCH to increment click count
// (e.g., /api/gigs/60d21b4667d0d8992e610c85/click)
router.patch('/:id/click', incrementClickCount);

// (참고: 단일 조회, 삭제, 수정 라우트도 필요시 추가)
// router.get('/:id', getSingleGig);
// router.delete('/:id', deleteGig);
// router.patch('/:id', updateGig);

module.exports = router;