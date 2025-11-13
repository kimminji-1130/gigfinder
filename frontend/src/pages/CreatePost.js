import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate 임포트
// import { useContext } from 'react'; 
// import AuthContext from '../context/AuthContext'; 
import './CreatePost.css'; // 폼을 꾸미기 위한 CSS 파일을 임포트합니다.

function CreatePost() {
    // 각 입력 필드에 대한 상태(state)를 생성합니다.
    const [title, setTitle] = useState('');
    
    // 2. user 상태는 null로 시작 (localStorage에서 불러올 예정)
    const [user, setUser] = useState(null); 
    
    const [location, setLocation] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const [jobType, setJobType] = useState('cafe');
    const [pay, setPay] = useState('');
    const [error, setError] = useState(''); // 3. 에러 메시지 상태
    
    const navigate = useNavigate(); // 4. 리디렉션을 위한 navigate 함수

    // --- 5. (삭제) 임시 사용자 정보 제거 ---
    /*
    const user = {
        _id: "temp-user-id-12345",
        name: "Calgary-based Employer" 
    };
    */
    // ---

    // 6. 컴포넌트 로드 시 localStorage에서 사용자 정보 불러오기
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        // 사용자 정보나 토큰이 없으면 로그인 페이지로 리디렉션
        if (!storedUser || !token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        // 사용자 정보를 상태에 저장
        setUser(JSON.parse(storedUser));
    }, [navigate]); // 의존성 배열에 navigate 추가


    // 폼 제출 시 호출될 함수 (async/await 사용)
    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼의 기본 새로고침 동작을 막습니다.
        setError(''); // 에러 초기화

        // user 상태가 아직 로드되지 않았다면 중단
        if (!user) {
            alert("사용자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        setLoading(true); // 로딩 시작

        // 7. localStorage에서 토큰 가져오기
        const token = localStorage.getItem('token');
        if (!token) {
            setError('인증 토큰이 없습니다. 다시 로그인해주세요.');
            setLoading(false);
            navigate('/login');
            return;
        }

        // 백엔드로 보낼 데이터 객체 (Mongoose 모델과 일치)
        const newGigPost = {
            title,
            jobType,
            pay: Number(pay), 
            authorName: user.name,  // user '상태'에서 이름 사용
            authorId: user._id,   // user '상태'에서 ID 사용
            location,
            dateFrom,
            dateTo,
            description,
        };

        try {
            const response = await fetch('/api/gigs', { // Gig API 엔드포인트
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 8. (중요) Authorization 헤더에 토큰 추가
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(newGigPost), 
            });

            // 9. (중요) 토큰 인증 실패(401) 시 예외 처리
            if (response.status === 401) {
                setError('세션이 만료되었거나 인증에 실패했습니다. 다시 로그인해주세요.');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }

            if (response.ok) {
                const savedGig = await response.json(); 
                console.log('✅ Gig 저장 성공:', savedGig);
                alert('공고가 성공적으로 등록되었습니다!');

                // 제출 후 폼 초기화 (성공 시 홈으로 이동해도 됩니다)
                // navigate('/'); // 예시: 성공 시 홈으로 이동

                // 폼 초기화 (기존 로직)
                setTitle('');
                setLocation('');
                setDateFrom('');
                setDateTo('');
                setDescription('');
                setJobType('cafe'); 
                setPay(''); 

            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || '서버에서 응답이 왔으나, 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('❌ Gig 저장 오류:', error);
            setError(`오류 발생: ${error.message}`); // alert 대신 상태에 저장
        } finally {
            setLoading(false); // 로딩 종료 (성공/실패 여부와 관계없이)
        }
    };

    // 10. user 정보가 로드되기 전(null)이면 로딩 화면 표시
    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="create-post-container">
            <div className="form-wrapper">
                <h2>새로운 Gig 등록하기</h2>
                <p>채용 공고의 세부 내용을 입력해주세요.</p>

                <form onSubmit={handleSubmit} className="post-form">

                    {/* --- 에러 메시지 표시 --- */}
                    {error && <p style={{ color: 'red', border: '1px solid red', padding: '10px', borderRadius: '5px' }}>{error}</p>}

                    {/* --- 제목 --- */}
                    <div className="form-group">
                        <label htmlFor="title">제목 (Title)</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="예: 주말 바리스타 구인 (다운타운)"
                            required
                            disabled={loading} // 로딩 중일 때 비활성화
                        />
                    </div>

                    {/* --- 이름 (고정) --- */}
                    <div className="form-group">
                        <label htmlFor="name">이름 (Author)</label>
                        <input
                            type="text"
                            id="name"
                            value={user?.name || ''} // '상태'의 user 객체 이름 표시
                            disabled // 항상 수정 불가능
                            style={{ backgroundColor: '#f4f4f4', cursor: 'not-allowed' }} // 수정 불가 시각적 피드백
                        />
                    </div>

                    {/* --- 날짜 (언제부터 언제까지) --- */}
                    <div className="form-group date-group">
                        <div className="date-input">
                            <label htmlFor="dateFrom">시작일 (From)</label>
                            <input
                                type="date"
                                id="dateFrom"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="date-input">
                            <label htmlFor="dateTo">종료일 (To)</label>
                            <input
                                type="date"
                                id="dateTo"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* --- 위치 (일하는 곳) --- */}
                    <div className="form-group">
                        <label htmlFor="location">위치 (Location)</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="예: 123 Stephen Ave SW, Calgary"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* --- 시급(Pay) 및 직종(Job Type) (한 줄에 2개) --- */}
                    <div className="form-group-row">
                        <div className="form-group" style={{ flex: 1 }}>
                            <label htmlFor="pay">시급 (Pay per hour)</label>
                            <input
                                type="number" 
                                id="pay"
                                value={pay}
                                onChange={(e) => setPay(e.target.value)}
                                placeholder="예: 17.50"
                                required
                                min="0" 
                                step="0.01" 
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group" style={{ flex: 1 }}>
                            <label htmlFor="jobType">직종 (Job Type)</label>
                            <select
                                id="jobType"
                                value={jobType}
                                onChange={(e) => setJobType(e.target.value)}
                                required
                                disabled={loading}
                            >
                                <option value="cafe">☕️ 카페</option>
                                <option value="restaurant">🍔 음식점</option>
                                <option value="office">💼 사무보조</option>
                                <option value="field">👷 현장업무</option>
                                <option value="other">📦 기타</option>
                            </select>
                        </div>
                    </div>


                    {/* --- 내용 (어떤 일 하는지) --- */}
                    <div className="form-group">
                        <label htmlFor="description">내용 (Description)</label>
                        <textarea
                            id="description"
                            rows="8"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="담당할 업무, 자격 요건 등 상세 내용을 적어주세요."
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* --- 제출 버튼 --- */}
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? '등록 중...' : '공고 올리기 (Post Gig)'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;