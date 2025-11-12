# 🚀 GigFinder: Calgary

캘거리(Calgary) 지역의 고용주와 단기 구직자(워홀러 등)를 연결하는 단기 일자리(Gig) 매칭 플랫폼입니다.

GigFinder is a short-term job matching platform designed to connect employers with job seekers (such as working holiday participants) in Calgary.

<br>

## 🖼️ 스크린샷 (Screenshots)

| Home Page | Gigs Page | Create Page | My Page |
| :---: | :---: | :---: | :---: |
| <img width="250" alt="Home Page" src="https://github.com/user-attachments/assets/5c69a811-bc1d-4ed5-99b0-61061cef91b5" /> | <img width="250" alt="Gigs Page" src="https://github.com/user-attachments/assets/17d30b56-440d-4471-9100-4e3395ad3207" /> | <img width="250" alt="Create Page" src="https://github.com/user-attachments/assets/f54d7c9a-ca48-4837-87cd-99ebb84f7b18" /> | <img width="250" alt="My Page" src="https://github.com/user-attachments/assets/9664a5e3-1888-4bfd-9c64-3ea759e55af7" /> |

<br>

## ✨ 주요 기능 (Key Features)

* **☕️ 구인 공고 (Gigs):** 직종별(카페, 음식점 등) 공고 필터링 및 목록 조회
* **📝 공고 등록 (Create):** 고용주가 시급, 위치, 근무 기간 등을 포함한 새 공고 작성
* **🔐 사용자 인증:** 회원가입, 로그인, 인증 토큰(JWT)을 사용한 세션 관리
* **👤 마이페이지 (MyPage):** 사용자 닉네임 변경 및 프로필 정보 관리 (구현 중)
* **💬 채팅 (Chatting):** 고용주와 구직자 간의 1:1 실시간 채팅 (구현 중)

<br>

## 💻 기술 스택 (Tech Stack)

| Category | Technology |
| :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) |

MongoDB - MongoDBAtlas 사용

<br>

## 🚀 앞으로의 계획 (Future Plans)

### 마이페이지 기능 완성 (Complete MyPage)
- [x] 닉네임 변경
- [ ] 프로필 정보(소개, 스킬 등) 수정
- [ ] 내가 쓴 공고 / 내가 지원한 공고 목록 조회

### 실시간 채팅 기능 구현 (Implement Chat)
- [ ] WebSocket (Socket.io)을 사용한 1:1 채팅방
- [ ] 채팅방 목록 및 안 읽은 메시지 표시

### 공고 기능 (Gig Features)
- [ ] 구직자의 '지원하기' 기능
- [ ] 고용주에게 지원 알림 전송
