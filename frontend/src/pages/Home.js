import React from 'react';
import './Home.css';
import Banner from '../assets/banner.png'; // 경로는 확인 필요

// "Featured Gigs"에 사용할 가상 데이터
const featuredGigs = [
  { id: 1, title: 'Barista Needed - Downtown', description: 'Looking for an experienced barista for morning shifts.' },
  { id: 2, title: 'Event Staff - BMO Centre', description: 'Weekend event staff required for a tech conference.' },
  { id: 3, title: 'Dog Walker - Kensington', description: 'Part-time dog walker for two friendly dogs.' },
];

function Home() {
  return (
    <div className="home-page">
      <main>
        
        {/* 2-1. 배너 섹션 (텍스트 오버레이) */}
        <section className="banner-section">
          <img src={Banner} alt="Banner" className="home-banner" />
          <div className="banner-overlay">
            <h2>Find Your Next Gig in Calgary</h2>
            <p>Your platform for short-term and flexible jobs.</p>
          </div>
        </section>

        {/* 2-2. 카테고리 섹션 */}
        <section className="categories-section">
          <h2>Categories</h2>
          <div className="categories-container">
            <button className="category-button">
              <span role="img" aria-label="pin">📍</span> Location
            </button>
            <button className="category-button">
              <span role="img" aria-label="calendar">📅</span> Date
            </button>
            <button className="category-button">
            <span role="img" aria-label="tag">🏷️</span> Job Type
            </button>
            <button className="category-button hiring-now">
              <span role="img" aria-label="fire">🔥</span> Hiring Now
            </button>
          </div>
        </section>

        {/* 2-3. Featured Gigs 섹션*/}
        <section className="featured-gigs-section">
          <div className="section-header">
            <h2>Featured Gigs</h2>
            <a href="/all-gigs" className="read-more-link">+ Read More</a>
          </div>
          <div className="gigs-list">
            {featuredGigs.map(gig => (
              <div key={gig.id} className="gig-card">
                <h3>{gig.title}</h3>
                <p>{gig.description}</p>
                <a href={`/gig/${gig.id}`} className="gig-link">내용</a>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 3. 푸터 */}
      <footer className="home-footer">
        <p>&copy; 2025 GigFinder. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;