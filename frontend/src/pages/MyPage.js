import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.css'; // 1. CSS 파일을 임포트합니다.

function MyPage() {
    const navigate = useNavigate();

    // 사용자 정보 (localStorage 또는 나중에 AuthContext에서 가져올)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 수정용 상태
    const [nickname, setNickname] = useState('');
    const [region, setRegion] = useState('');

    // 수정 모드 토글 상태
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [isEditingRegion, setIsEditingRegion] = useState(false);

    // 컴포넌트 마운트 시 사용자 정보 불러오기 (임시: localStorage)
    useEffect(() => {
        try {
            // TODO: 실제로는 API /auth/me 등으로 토큰을 보내 유저 정보를 가져와야 합니다.
            // 임시로 localStorage에서 'user' 객체를 파싱합니다.
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser) {
                setUser(storedUser);
                setNickname(storedUser.name || '임시 닉네임');
                setRegion(storedUser.region || '캘거리'); // (user 객체에 region이 있다고 가정)
            } else {
                // 유저 정보 없으면 로그인 페이지로 (선택)
                alert('로그인이 필요합니다.');
                navigate('/login');
            }
        } catch (error) {
            console.error("Failed to load user data", error);
            // localStorage 파싱 실패 시
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    // 닉네임 저장 핸들러
    const handleNicknameSave = async () => {
        // TODO: 백엔드 API 호출 (e.g., PATCH /api/users/me/nickname)
        console.log('Saving nickname:', nickname);

        // API 성공 시 (가정)
        const updatedUser = { ...user, name: nickname };
        localStorage.setItem('user', JSON.stringify(updatedUser)); // (임시)
        setUser(updatedUser);
        setIsEditingNickname(false);
        alert('닉네임이 변경되었습니다.');
    };

    // 지역 저장 핸들러
    const handleRegionSave = async () => {
        // TODO: 백엔드 API 호출 (e.g., PATCH /api/users/me/region)
        console.log('Saving region:', region);

        // API 성공 시 (가정)
        const updatedUser = { ...user, region: region };
        localStorage.setItem('user', JSON.stringify(updatedUser)); // (임시)
        setUser(updatedUser);
        setIsEditingRegion(false);
        alert('지역이 변경되었습니다.');
    };

    // 로그아웃 (기존 로직)
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('로그아웃되었습니다.');
        navigate('/login');
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="mypage-container">
            <h2>마이페이지</h2>

            {/* --- 1. 프로필 관리 --- */}
            <div className="mypage-section">
                <h3 className="section-title">프로필 관리</h3>

                {/* 닉네임 변경 */}
                <div className="profile-item">
                    <label>닉네임</label>
                    {isEditingNickname ? (
                        <div className="profile-edit-group">
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                            <button onClick={handleNicknameSave} className="btn-save">저장</button>
                            <button onClick={() => setIsEditingNickname(false)} className="btn-cancel">취소</button>
                        </div>
                    ) : (
                        <div className="profile-view-group">
                            <span>{user?.name}</span>
                            <button onClick={() => setIsEditingNickname(true)} className="btn-edit">변경</button>
                        </div>
                    )}
                </div>

                {/* 지역 변경 */}
                <div className="profile-item">
                    <label>대표 지역</label>
                    {isEditingRegion ? (
                        <div className="profile-edit-group">
                            <input
                                type="text"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                placeholder="예: 캘거리 NW"
                            />
                            <button onClick={handleRegionSave} className="btn-save">저장</button>
                            <button onClick={() => setIsEditingRegion(false)} className="btn-cancel">취소</button>
                        </div>
                    ) : (
                        <div className="profile-view-group">
                            <span>{user?.region || '지역 미설정'}</span>
                            <button onClick={() => setIsEditingRegion(true)} className="btn-edit">변경</button>
                        </div>
                    )}
                </div>

                {/* 이력서 관리 (링크/버튼) */}
                <div className="profile-item-action">
                    <button className="btn-action" onClick={() => navigate('/my-resume')}>
                        📄 내 이력서 관리
                    </button>
                </div>
            </div>

            {/* --- 2. 나의 활동 --- */}
            <div className="mypage-section">
                <h3 className="section-title">나의 활동</h3>
                <div className="action-list">
                    <button className="btn-action" onClick={() => navigate('/my-posts')}>
                        📝 내가 쓴 공고
                    </button>
                    <button className="btn-action" onClick={() => navigate('/my-applications')}>
                        ✅ 내가 지원한 공고
                    </button>
                </div>
            </div>

            {/* --- 3. 계정 관리 --- */}
            <div className="mypage-section">
                <h3 className="section-title">계정 관리</h3>
                <div className="account-actions">
                    <button className="btn-action" onClick={() => navigate('/change-password')}>
                        🔒 비밀번호 변경
                    </button>
                    <button className="btn-logout" onClick={handleLogout}>
                        로그아웃
                    </button>
                    <button className="btn-delete-account" onClick={() => alert('TODO: 회원 탈퇴 처리')}>
                        회원 탈퇴
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyPage;