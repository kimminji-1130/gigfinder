import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyResume.css'; // 1. 이력서 페이지용 CSS

// 이력서 목(Mock) 데이터
const mockResumeData = {
    intro: "단기 구직 활동을 하고 있는 OOO입니다.",
    experiences: [
        { id: 1, company: "GigFinder 프로젝트 (개인)", role: "풀스택 개발자", period: "2025.10 - 2025.11" },
        { id: 2, company: "XX 부트캠프", role: "수료생", period: "2025.01 - 2025.06" }
    ],
    educations: [
        { id: 1, school: "OO대학교", major: "컴퓨터 공학", period: "2019 - 2025" }
    ],
    skills: ["React", "Node.js", "JavaScript", "Python", "Figma", "Git"]
};


function MyResume() {
    const navigate = useNavigate();
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- 수정용 상태 ---
    // 1. 자기소개 수정
    const [isEditingIntro, setIsEditingIntro] = useState(false);
    const [introText, setIntroText] = useState('');

    // (TODO: 경력/학력/스킬 수정용 Modal 또는 인라인 폼 상태 추가)


    // 컴포넌트 마운트 시 이력서 정보 불러오기
    useEffect(() => {
        // TODO: 실제로는 '/api/my-resume' 같은 엔드포인트에서 데이터를 가져와야 합니다.
        // 임시로 localStorage 또는 Mock 데이터를 사용합니다.
        try {
            let data = JSON.parse(localStorage.getItem('resume'));
            if (!data) {
                data = mockResumeData; // localStorage에 없으면 목데이터 사용
                localStorage.setItem('resume', JSON.stringify(data));
            }
            
            setResume(data);
            setIntroText(data.intro); // 수정용 상태에도 초기화

        } catch (error) {
            console.error("Failed to load resume data", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // 자기소개 저장 핸들러
    const handleIntroSave = () => {
        // TODO: 백엔드 API 호출 (e.g., PATCH /api/my-resume/intro)
        console.log('Saving intro:', introText);

        // API 성공 시 (가정)
        const updatedResume = { ...resume, intro: introText };
        localStorage.setItem('resume', JSON.stringify(updatedResume)); // (임시)
        setResume(updatedResume);
        setIsEditingIntro(false);
        alert('자기소개가 변경되었습니다.');
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!resume) {
        return (
            <div className="resume-container">
                 <button onClick={() => navigate('/mypage')} className="btn-back">
                    &larr; 마이페이지로
                </button>
                <h2>이력서 관리</h2>
                <div className="resume-empty">
                    <p>아직 작성된 이력서가 없습니다.</p>
                    <button className="btn-action" onClick={() => alert('TODO: 이력서 생성 페이지로 이동')}>
                        이력서 새로 만들기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="resume-container">
            {/* 1. 뒤로가기 버튼 */}
            <button onClick={() => navigate('/mypage')} className="btn-back">
                &larr; 마이페이지로
            </button>
            <h2>이력서 관리</h2>

            {/* --- 2. 자기소개 섹션 --- */}
            <div className="resume-section">
                <h3 className="section-title">자기소개</h3>
                {isEditingIntro ? (
                    <div className="resume-edit-group">
                        <textarea
                            value={introText}
                            onChange={(e) => setIntroText(e.target.value)}
                            rows="5"
                        />
                        <div className="button-group">
                            <button onClick={handleIntroSave} className="btn-save">저장</button>
                            <button onClick={() => setIsEditingIntro(false)} className="btn-cancel">취소</button>
                        </div>
                    </div>
                ) : (
                    <div className="resume-view-group">
                        {/* pre 태그를 사용해 줄바꿈 유지 */}
                        <pre className="resume-intro-text">{resume.intro}</pre>
                        <button onClick={() => setIsEditingIntro(true)} className="btn-edit">수정</button>
                    </div>
                )}
            </div>

            {/* --- 3. 경력 섹션 --- */}
            <div className="resume-section">
                <div className="section-header">
                    <h3 className="section-title">경력</h3>
                    <button className="btn-add" onClick={() => alert('TODO: 경력 추가 폼 열기')}>+ 추가</button>
                </div>
                <div className="resume-list">
                    {resume.experiences.map(exp => (
                        <div key={exp.id} className="resume-item">
                            <div className="item-content">
                                <h4>{exp.role} @ {exp.company}</h4>
                                <p>{exp.period}</p>
                            </div>
                            <div className="item-actions">
                                <button className="btn-edit-item">수정</button>
                                <button className="btn-delete-item">삭제</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- 4. 학력 섹션 --- */}
            <div className="resume-section">
                <div className="section-header">
                    <h3 className="section-title">학력</h3>
                    <button className="btn-add" onClick={() => alert('TODO: 학력 추가 폼 열기')}>+ 추가</button>
                </div>
                <div className="resume-list">
                    {resume.educations.map(edu => (
                        <div key={edu.id} className="resume-item">
                            <div className="item-content">
                                <h4>{edu.school}</h4>
                                <p>{edu.major} ({edu.period})</p>
                            </div>
                            <div className="item-actions">
                                <button className="btn-edit-item">수정</button>
                                <button className="btn-delete-item">삭제</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

             {/* --- 5. 스킬 섹션 --- */}
            <div className="resume-section">
                 <div className="section-header">
                    <h3 className="section-title">보유 스킬</h3>
                    <button className="btn-edit" onClick={() => alert('TODO: 스킬 편집 폼 열기')}>편집</button>
                </div>
                <div className="skill-tags">
                    {resume.skills.map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyResume;