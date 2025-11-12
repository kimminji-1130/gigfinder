const Gig = require('../models/gigModel');
const mongoose = require('mongoose');

// GET all gigs (with filters, sorting, searching)
const getGigs = async (req, res) => {
  const { sort, jobType, search } = req.query;

  let filter = {};
  
  // 1. 직종(jobType) 필터링
  // (Query: ?jobType=cafe,restaurant)
  if (jobType) {
    // 쉼표로 구분된 문자열을 배열로 분리
    filter.jobType = { $in: jobType.split(',') };
  }

  // 2. 검색(search) 필터링 (제목, 내용 동시 검색)
  // (Query: ?search=서빙)
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } }, // 'i' = 대소문자 무시
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  // 3. 정렬(sort) 옵션
  // (Query: ?sort=popular or ?sort=newest)
  let sortOptions = {};
  if (sort === 'popular') {
    sortOptions.clickCount = -1; // -1: 내림차순 (인기순)
  } else {
    sortOptions.createdAt = -1; // 기본값: 내림차순 (최신순)
  }

  try {
    const gigs = await Gig.find(filter)
      .sort(sortOptions)
      .limit(50); // 성능을 위해 최대 50개로 제한
      
    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a new gig
const createGig = async (req, res) => {
  // jobType이 body에 추가됨
  const { title, authorName, location, pay, description, jobType } = req.body;

  try {
    const newGig = await Gig.create({
      title,
      authorName,
      location,
      pay,
      description,
      jobType, // 추가된 필드 저장
    });
    res.status(201).json(newGig);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PATCH: Increment click count for a gig
const incrementClickCount = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: '유효하지 않은 ID입니다.' });
  }

  try {
    // findByIdAndUpdate로 clickCount 1 증가 ($inc)
    const gig = await Gig.findByIdAndUpdate(
      id,
      { $inc: { clickCount: 1 } },
      { new: true } // 업데이트된 문서를 반환
    );

    if (!gig) {
      return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
    }
    
    res.status(200).json(gig);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGigs,
  createGig,
  incrementClickCount,
  // (참고: getSingleGig, deleteGig, updateGig 등도 필요시 추가)
};