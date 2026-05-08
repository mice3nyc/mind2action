# MIND2ACTION — 진행 작업 (TASKS)

> 현재 단계: **Phase 1 ✅ + Phase 2 부분 완료 (Supabase 연결 + 관리자 + 배포)**

## Phase 1: 설문 + 점수 계산 ✅

### 1-1. 프로젝트 세팅
- [x] React 프로젝트 초기화 (Vite + React)
- [x] PRAXI 스타일 CSS → Paperlogy 폰트 + #0012de/#f3e700 액센트
- [x] 기본 레이아웃 (Header + Footer + MIND2ACTION 브랜딩)

### 1-2. 설문 데이터 준비
- [x] 엑셀에서 50문항 텍스트 추출 → `questions.json`
- [x] 기본정보 필드 정의 (8개: 이름/생년월일/경력/회사/소속/직무/소득/리크루팅)
- [x] 문항→자아상태 매핑 검증 (엑셀 원본 대조)

### 1-3. 설문 폼 UI
- [x] 랜딩 페이지 (참여 코드 입력 — 망원동/서교동/합정동)
- [x] 기본정보 입력 화면 (그룹 뱃지 표시)
- [x] 문항 응답 화면 (50문항, 5개씩 페이지네이션)
- [x] 10단계 서클 스텝 마커 (채워지며 진행)
- [x] 전체 응답 완료 확인 + 제출

### 1-4. 점수 계산 엔진
- [x] 자아상태별 합산 (5개 × 0~20)
- [x] 점수 구간 분류 (극고/고/중/저/극저)
- [x] TOP1 / TOP2 / BOTTOM 결정 (동점 시 CP > A > NP > AC > FC)
- [x] 교차 검증 (엑셀 샘플 342명 중 5명 — 전원 일치)

### 1-5. 결과 화면
- [x] 5개 자아상태 점수 + 구간 표시
- [x] 막대 그래프 (본인 점수 + 성공구간 점선 비교)
- [x] TOP1 / TOP2 / BOTTOM 태그 (에고 유형 컬러코딩)
- [x] 결과 요약 한 줄 + 총점

---

## Phase 2: Supabase 연결 — 부분 완료

### 2-1. DB 연결 ✅
- [x] Supabase 프로젝트 생성 (피터공, dkpsbsmpizjnukkpmgrq)
- [x] responses 테이블 생성 (SQL Editor)
- [x] RLS 정책 설정 (insert/select/delete open)
- [x] @supabase/supabase-js 연결
- [x] storage.js localStorage → Supabase async 전환
- [x] 설문 완료 시 DB 저장 확인

### 2-2. 관리자 대시보드 ✅
- [x] 참여자/관리자 경로 분리 (HashRouter: / vs /#/admin)
- [x] 관리자 로그인 (임시 비밀번호: sonson)
- [x] 결과 테이블 — 전 컬럼 표시 (그룹/이름/생년월일/경력/소속/직무/소득/리크루팅/5점수/총점/TOP/BOT)
- [x] 에고 유형 컬러코딩 (CP빨강/NP주황/A하늘/FC초록/AC보라)
- [x] 그룹 뱃지 색 분리 + 그룹별 필터 (건수 표시)
- [x] 점수 셀 bottom-to-top 바 그래프
- [x] CSV 다운로드
- [x] 개별 삭제 / 전체 삭제
- [x] 샘플 20명 로드 (엑셀 실데이터 기반)

### 2-3. 배포 ✅
- [x] GitHub Pages 배포 (`/mind2action/egogram/`)
- [x] gh-pages 서브폴더 구조 (다른 프로젝트 추가 가능)

### 2-4. 미착수
- [ ] 이메일 OTP 인증 (Supabase Auth)
- [ ] 조직/그룹 동적 관리 (현재 하드코딩 3개)
- [ ] 관리자 인증 강화 (현재 임시 비밀번호)

---

## Phase 3: 리포트 생성 (미착수)

- [ ] 엑셀 CM 3종 → JSON 변환 스크립트
- [ ] CM 조회 엔진 (점수 + TOP/BOTTOM → 텍스트 매칭)
- [ ] 리포트 웹페이지 템플릿 (직군별)
- [ ] 리포트 링크 생성 + 접근 제어

## Phase 4: 관리자 고도화 (미착수)

- [ ] 조직별 설문 링크 생성
- [ ] 리포트 생성 관리
- [ ] 통계 요약 (그룹별 평균, 분포)

---

## 빌드 히스토리

| 날짜 | 커밋 | 내용 |
|------|------|------|
| 5/7 | — | PLAN + SPEC + TASKS 세팅 |
| 5/8 | fc14ae7 | Phase 1 완료 — 설문+점수+결과+관리자 |
| 5/8 | 2fce66b | 디자인 개선 — Paperlogy, 컬러코딩, 바그래프, 샘플20명 |
| 5/8 | 60b20a7 | Supabase 연결 — DB 저장 + async 전환 |
| 5/8 | f42e27d | GitHub Pages 배포 (/mind2action/egogram/) |
| 5/8 | 3ee24f9 | 설문 업데이트 — 직무 7종, 회사 필드, 질문 교차 배치 |
