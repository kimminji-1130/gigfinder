import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Gigs.css';

// 직종 상수 (CreatePost.js와 일치해야 함)
const JOB_TYPES = {
  all: '✨ 전체',
  cafe: '☕️ 카페',
  restaurant: '🍔 음식점',
  office: '💼 사무보조',
  field: '👷 현장업무',
  other: '📦 기타',
};

const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 필터 상태
  const [sort, setSort] = useState('newest'); // 'newest' or 'popular'
  const [selectedJobTypes, setSelectedJobTypes] = useState({ all: true });
  const [searchTerm, setSearchTerm] = useState('');

  // 직종 필터 변경 핸들러
  const handleJobTypeChange = (e) => {
    const { name, checked } = e.target;

    setSelectedJobTypes((prevTypes) => {
      const newTypes = { ...prevTypes };

      if (name === 'all') {
        // '전체'를 선택하면 모든 선택 해제 후 '전체'만 true
        return { all: true };
      } else {
        // 다른 항목을 선택하면 '전체'는 false
        newTypes[name] = checked;
        delete newTypes.all; // 'all' 키 제거
      }

      // 모든 선택이 해제되면 '전체'를 true로 설정
      const allUnchecked = Object.values(newTypes).every((val) => !val);
      if (allUnchecked) {
        return { all: true };
      }

      return newTypes;
    });
  };

  // 데이터 가져오기 함수
  const fetchGigs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 쿼리 파라미터 준비
      const params = new URLSearchParams();
      params.append('sort', sort);

      if (searchTerm) {
        params.append('search', searchTerm);
      }

      // 선택된 직종 필터링
      const activeJobTypes = Object.keys(selectedJobTypes).filter(
        (key) => selectedJobTypes[key] && key !== 'all'
      );

      if (activeJobTypes.length > 0) {
        params.append('jobType', activeJobTypes.join(','));
      }

      const response = await axios.get(`/api/gigs?${params.toString()}`);
      setGigs(response.data);
    } catch (err) {
      setError('데이터를 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [sort, selectedJobTypes, searchTerm]);

  // 필터 변경 시 데이터 다시 가져오기
  useEffect(() => {
    fetchGigs();
  }, [fetchGigs]);

  // 게시물 클릭 시 조회수 증가
  const handleGigClick = async (gigId) => {
    try {
      // 조회수 증가 요청 (백그라운드에서 실행)
      axios.patch(`/api/gigs/${gigId}/click`);
    } catch (err) {
      console.error('Failed to increment click count', err);
    }
    // TODO: 여기서 상세 페이지로 이동하거나 모달을 열 수 있습니다.
    console.log(`Gig ${gigId} clicked`);
  };

  return (
    <div className="gigs-container">
      {/* 1. 필터 사이드바 */}
      <aside className="gigs-sidebar">
        <h3>필터</h3>

        {/* 정렬 필터 */}
        <div className="filter-group">
          <label htmlFor="sort">정렬</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">최신순</option>
            <option value="popular">인기순</option>
          </select>
        </div>

        {/* 직종 필터 */}
        <div className="filter-group">
          <label>직종</label>
          <div className="checkbox-group">
            {Object.entries(JOB_TYPES).map(([key, label]) => (
              <label key={key}>
                <input
                  type="checkbox"
                  name={key}
                  checked={!!selectedJobTypes[key]}
                  onChange={handleJobTypeChange}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* 검색 필터 */}
        <div className="filter-group">
          <label htmlFor="search">검색</label>
          <input
            type="text"
            id="search"
            placeholder="제목 또는 내용 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="filter-apply-btn" onClick={fetchGigs} disabled={loading}>
          {loading ? '적용 중...' : '필터 적용'}
        </button>
      </aside>

      {/* 2. 게시물 목록 */}
      <main className="gigs-list">
        {loading && <p>로딩 중...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && gigs.length === 0 && <p>게시물이 없습니다.</p>}
        {!loading &&
          !error &&
          gigs.map((gig) => (
            <div
              className="gig-card"
              key={gig._id}
              onClick={() => handleGigClick(gig._id)}
            >
              <div className="gig-card-header">
                <span className="gig-type">{JOB_TYPES[gig.jobType] || '기타'}</span>
                <span className="gig-pay">시급: {(gig.pay || 0).toLocaleString()}달러</span>
              </div>
              <h4 className="gig-title">{gig.title}</h4>
              <p className="gig-description">
                {gig.description.substring(0, 100)}...
              </p>
              <div className="gig-card-footer">
                <span className="gig-location">📍 {gig.location}</span>
                <span className="gig-author">{gig.authorName}</span>
              </div>
              <div className="gig-card-stats">
                <span>조회 {gig.clickCount}</span>
                <span>{new Date(gig.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
      </main>
    </div>
  );
};

export default Gigs;