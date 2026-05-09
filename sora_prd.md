# Sora (하루 구슬) - Product Requirements Document

**Version:** 1.0
**Last Updated:** 2026-04-25
**Author:** Solbee
**Platform:** iOS (Native)
**Status:** Draft

---

## 1. Product Overview

### 1.1 Product Name
**Sora (하루 구슬)** — 일상의 행복을 모으는 디지털 행복 저장소

### 1.2 One-liner
"소소한 행복을 차곡차곡 모아, 삶의 소중함을 느끼다."

### 1.3 Vision Statement
어린 시절 종이학을 접어 유리병에 채우던 아날로그 경험을 디지털로 재해석한다. 사용자가 일상 속 작은 행복의 순간을 텍스트로 기록하면, 이를 빛나는 구슬(Orb)로 변환해 월별 유리병에 저장한다. 1년 후, 12개의 병에 담긴 구슬들은 AI를 통해 개인의 행복 연대기로 재구성된다.

### 1.4 Target User
- 일상의 작은 행복을 기록하고 싶은 20-40대 사용자
- 감사일기, 회고 앱을 사용해본 경험이 있는 사용자
- 시각적/탠저블한 경험을 선호하는 감성적인 사용자
- 자기성찰과 마음챙김(Mindfulness)에 관심 있는 사용자

### 1.5 Core Value Propositions
1. **Tangible Gratitude**: 글이 아닌 '물건'처럼 느껴지는 행복의 시각화
2. **Serendipitous Recall**: 잊고 있던 행복을 우연히 마주치는 경험
3. **Personal Narrative**: AI가 생성하는 나만의 1년 행복 서사

---

## 2. Design Philosophy

### 2.1 Core Values
- **감사 (Gratitude)**: 일상의 작은 순간에 의미 부여
- **회고 (Reflection)**: 시간의 흐름 속에서 자신을 발견
- **힐링 (Healing)**: 부정적 감정에 휩쓸리지 않는 긍정의 아카이브
- **탠저블 (Tangible)**: 디지털이지만 물리적으로 느껴지는 경험

### 2.2 Target Emotion
몽환적임 · 따뜻함 · 신비로움 · 뿌듯함

### 2.3 Anti-goals (하지 않는 것)
- ❌ SNS 기반의 공개적 자랑/비교 문화
- ❌ 부정적 감정의 토로 공간 (감정 일기 ≠ 행복 일기)
- ❌ 게이미피케이션을 통한 강제적 인게이지먼트 (스트릭, 푸시 폭격 등)
- ❌ 복잡한 카테고리 분류나 태깅 강요

---

## 3. User Stories & Use Cases

### 3.1 Primary User Stories

| # | As a... | I want to... | So that... |
|---|---------|-------------|-----------|
| US-1 | 사용자 | 오늘의 행복한 순간을 빠르게 기록하고 싶다 | 잊어버리기 전에 남길 수 있다 |
| US-2 | 사용자 | 내가 쌓은 행복을 시각적으로 보고 싶다 | 뿌듯함과 성취감을 느낄 수 있다 |
| US-3 | 사용자 | 과거에 기록한 행복을 우연히 마주치고 싶다 | 잊고 있던 좋은 기억을 떠올릴 수 있다 |
| US-4 | 사용자 | 1년의 행복을 한눈에 돌아보고 싶다 | 나의 한 해를 되돌아볼 수 있다 |
| US-5 | 사용자 | 나의 행복 데이터를 SNS에 공유하고 싶다 | 의미있는 회고를 가까운 사람과 나눌 수 있다 |

### 3.2 Key User Flows

**Flow 1: 첫 구슬 만들기 (First-time Onboarding)**
```
앱 실행 → 온보딩 (3 screens) → 권한 요청 → 메인 화면 (현재 월 빈 병) → 
'+' 탭 → 입력 → "행복 담기" → 구슬 생성 애니메이션 → 병에 안착
```

**Flow 2: 일상적 기록 (Daily Capture)**
```
앱 실행 → 메인 화면 → '+' 탭 → 텍스트 입력 → "행복 담기" → 
햅틱 피드백 + 구슬 떨어지는 애니메이션 → 자동 종료 또는 추가 작성
```

**Flow 3: 회상 (Recall via Shake)**
```
메인 화면 → 병 탭 → 상세 보기 진입 → 디바이스 흔들기 → 
구슬들 충돌 + 햅틱 → Phantom Text 등장 → 자동 페이드아웃
```

**Flow 4: 연간 회고 (Yearly Review)**
```
메인 화면 → "연간 회고" 버튼 → 챕터 1-12 스크롤 → 
Hierarchy of Light 시각화 → 손글씨 편지 → 이미지 저장/공유
```

---

## 4. Information Architecture

```
Sora App
│
├── 1. Main (Monthly Shelves)
│   ├── Horizontal Scroll View (12 Jars)
│   ├── Current Month (Center, Glowing)
│   ├── Past Months (Left, Sealed)
│   ├── Future Months (Right, Translucent)
│   └── Floating Action Button (+)
│
├── 2. Capture Modal
│   ├── Text Input
│   ├── "행복 담기" CTA
│   └── Materialization Animation
│
├── 3. Jar Detail View
│   ├── Single Jar Focus
│   ├── Shake-to-Mix Interaction
│   ├── Phantom Text Display
│   └── Orb Tap → Memo Detail
│
├── 4. Yearbook (AI Yearly Review)
│   ├── Step 1: Monthly Chapters
│   ├── Step 2: Hierarchy of Light
│   └── Step 3: Letter from Yesterday
│
└── 5. Settings
    ├── Notification Preferences
    ├── Data Export / Backup
    ├── Theme (Future)
    └── About
```

---

## 5. Functional Requirements

### 5.1 Main Shelf (메인 선반)

#### F-1.1 Horizontal Scroll Navigation
- **요구사항**: 1월~12월 12개의 병이 가로 스크롤로 탐색 가능
- **기본 진입 위치**: 현재 월 (Today's Month) 중앙
- **상호작용**:
  - 좌우 스와이프로 월 간 이동
  - Snap-to-jar 스크롤링 (각 병 중앙 정렬)
  - 상하단 인디케이터에 현재 월 표시

#### F-1.2 Jar States (병의 상태)
| State | Visual | Interaction |
|-------|--------|-------------|
| Current | 가장 크고 밝게 발광, 뚜껑 열림 | 탭 → 상세 보기 + 구슬 추가 가능 |
| Past | 뚜껑 닫힘, 은은한 발광 | 탭 → 상세 보기 (조회만) |
| Future | 반투명 실루엣, 잠금 아이콘 | 탭 → "아직 채울 수 없는 병" 메시지 |

#### F-1.3 Empty State
- 현재 월 병이 비어있을 때: "첫 번째 행복을 담아보세요" 안내 텍스트
- 빈 병 내부에 은은한 빛 효과로 사용자 유도

### 5.2 Capture Experience (입력 경험)

#### F-2.1 Input Modal
- **트리거**: 메인 화면 하단 중앙 '+' 버튼
- **UI 구성**:
  - 상단: "오늘의 행복한 순간 ✨" 타이틀
  - 중앙: 멀티라인 텍스트 입력창 (최대 200자)
  - 하단: [취소] / [행복 담기 ✨] 버튼
- **백그라운드**: Blurred 다크 그라데이션 + 부유하는 빛 입자

#### F-2.2 Materialization Animation
- **단계별 애니메이션** (총 1.5~2초):
  1. 텍스트가 빛으로 응축 (0~0.5s)
  2. 빛이 원형 구슬로 변환 (0.5~1s)
  3. 구슬이 병 입구로 이동 (1~1.2s)
  4. 물리 엔진 기반 낙하 + 기존 구슬과 충돌 (1.2~2s)
- **햅틱 피드백 (필수)**:
  - 구슬 변환 순간: Light Impact
  - 병 입구 도달: Medium Impact
  - 다른 구슬과 충돌: Soft Impact (per collision)

#### F-2.3 Orb Properties
- **색상**: 감정 자동 분류 결과에 따라 매핑 (5.5 참조)
- **크기**: 텍스트 길이에 비례 (30~50pt 범위)
- **재질감**: Subsurface Scattering 효과 (Glass Material)
- **고유 ID**: Timestamp + Random Hash

### 5.3 Jar Detail View (병 상세 보기)

#### F-3.1 Tangible View
- **진입**: 메인 화면에서 병 탭
- **레이아웃**: 단일 병 화면 가득 채움
- **카메라**: 살짝 기울어진 3/4 뷰 (입체감)

#### F-3.2 Shake to Mix
- **트리거**: 디바이스 자이로센서 감지 (CMMotionManager)
- **임계값**: 가속도 2.0G 이상
- **반응**:
  - 구슬들이 물리 법칙에 따라 튕김
  - 각 충돌 시 햅틱 피드백
  - 0.5초간 격렬한 흔들림 후 자연스럽게 정착

#### F-3.3 Phantom Text (유령 텍스트)
- **트리거 조건**:
  - Shake 도중 강한 충돌 발생
  - 사용자가 구슬을 손가락으로 튕길 때
- **UI 동작**:
  - 충돌한 구슬에 담긴 메모가 공중에 부드럽게 떠오름
  - 손글씨 스타일 폰트로 렌더링
  - 1.5~2초 후 위로 떠오르며 페이드아웃
- **목적**: 잊고 있던 행복과의 우연한 조우

#### F-3.4 Orb Tap (직접 조회)
- **상호작용**: 구슬 탭 시 해당 메모를 카드 형태로 표시
- **카드 정보**: 메모 텍스트, 작성 일자, 감정 카테고리
- **편집 가능**: 메모 수정 / 삭제

### 5.4 AI Features: Happiness Yearbook (연간 회고)

#### F-4.1 Step 1: Monthly Chapters (월별 서사화)
- **트리거**: 메인 화면 우측 상단 "연간 회고" 버튼
- **활성화 조건**: 최소 3개월 이상 데이터 누적 시
- **AI 처리**:
  - **Input**: 해당 월의 모든 메모 데이터
  - **Output**: 이달의 제목 (한 줄) + 한 줄 요약
  - **Tone**: 시적, 감성적, 사용자 말투 일부 반영
- **UI**: 영화 크레딧 형태의 세로 스크롤
- **예시**:
  - 3월: "낯선 시작, 그리고 설렘의 온도"
  - 8월: "뜨거운 태양 아래 잠시 멈춤"

#### F-4.2 Step 2: Hierarchy of Light (감정의 시각화)
- **AI 분류 카테고리** (5종):

| 카테고리 | 대표 컬러 | 키워드 예시 |
|---------|----------|------------|
| 열정/성취 | Red (#FF6B9D) | 도전, 성공, 노력, 인정 |
| 평온/휴식 | Blue (#4ECDC4) | 힐링, 산책, 잠, 여유 |
| 기쁨/즐거움 | Yellow (#FFE66D) | 맛집, 친구, 웃음, 취미 |
| 감사/사랑 | Purple (#A259FF) | 가족, 연인, 선물, 배려 |
| 설렘/기대 | Pink (#FF8B94) | 새 시작, 여행, 만남 |

- **시각적 위계 규칙**:
  - 빈도 % 높을수록 → `scale` 증가, `shadowBlur` 강화
  - 가장 빈도 높은 감정이 화면 중앙 거대 발광체로 배치
  - 나머지 감정들은 위성처럼 주변을 공전

#### F-4.3 Step 3: A Letter from Yesterday (손글씨 편지)
- **AI 학습 (Few-shot Learning)**:
  - **Input Features**: 1년치 메모의 말투, 어휘, 문장 길이, 이모지 사용 패턴
  - **Generation Target**: 과거의 내가 현재의 나에게 보내는 격려/감사 편지
  - **Constraint**: 제3자 관찰자 시점 ❌ / 1인칭 자기 대화체 ✅
- **렌더링**:
  - 폰트: 손글씨 스타일 (Noto Handwriting / 자체 폰트)
  - 배경: 종이 질감 텍스처
  - 컬러: Step 2의 감정 컬러를 은은하게 배경에 적용
- **출력 옵션**:
  - [이미지 저장]: 갤러리 저장
  - [공유]: SNS 공유 시트 (Instagram Stories, Twitter, etc.)

---

## 6. Non-Functional Requirements

### 6.1 Performance
- 앱 실행~메인 화면 진입: 2초 이내
- 구슬 생성 애니메이션: 60fps 유지
- 구슬 100개 이상 시에도 Shake 인터랙션 끊김 없음
- AI Yearbook 생성: 10초 이내

### 6.2 Privacy & Security
- 모든 메모 데이터는 **로컬 우선 저장** (Core Data)
- iCloud 백업은 옵션 (사용자 동의 기반)
- AI 처리 시 데이터 익명화 후 전송
- 개인정보 보호 준수 (PIPA, GDPR 고려)

### 6.3 Accessibility
- VoiceOver 지원 (모든 구슬에 메모 텍스트 라벨링)
- Dynamic Type 대응
- Reduce Motion 옵션 제공 (애니메이션 단순화)
- 컬러 외 형태/위치로도 정보 전달 (색맹 고려)

### 6.4 Offline Support
- 로컬에서 구슬 생성/조회 완전 동작
- AI Yearbook은 네트워크 필요 (오프라인 시 안내)

---

## 7. Visual Design Specifications

### 7.1 Color Palette: "Midnight Glow"

**Background Gradient**
```
Top:    #0F172A  (Deep Navy)
Bottom: #1E1B4B  (Deep Indigo)
```

**Orb Colors (Self-illuminating Pastel)**
```
Passion:    #FF6B9D
Peace:      #4ECDC4
Joy:        #FFE66D
Gratitude:  #A259FF
Excitement: #FF8B94
```

**UI Accent**
```
Primary CTA: linear-gradient(135deg, #A259FF 0%, #FF6B9D 100%)
Text Primary:   #E2E8F0
Text Secondary: rgba(226, 232, 240, 0.7)
Border:         rgba(148, 163, 184, 0.2)
```

### 7.2 Typography
- **Primary**: SF Pro Display (iOS System)
- **Handwriting (Letter)**: Custom Korean Handwriting Font (TBD)
- **Phantom Text**: SF Pro Italic + Glow Effect

### 7.3 Material & Texture
- **Jar**: Frosted Glass (Backdrop Blur 10px + Subtle Border)
- **Orb**: 
  - Surface: Smooth radial gradient
  - Inner: Subsurface scattering simulation
  - Outer: Bloom effect (`shadowBlur` ∝ size)

### 7.4 Animation Principles
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1) (Material-style)
- **Float**: 3s ease-in-out infinite (병 안 구슬들)
- **Drop**: 1.5s ease-out (새 구슬 낙하)
- **Glow Pulse**: 4s ease-in-out infinite (현재 월 병)

### 7.5 Logo & Branding
- **앱 이름**: Sora
- **마스코트**: 흰색 둥근 캐릭터 (귀여운 영혼/구슬 의인화)
- **앱 아이콘**: 다크 배경 + 발광 구슬이 담긴 병

---

## 8. Technical Specifications

### 8.1 Tech Stack (Proposed)
- **Language**: Swift 5.9+
- **UI Framework**: SwiftUI (Primary) + UIKit (Physics)
- **Physics Engine**: SpriteKit (병 안 구슬 시뮬레이션)
- **Animation**: Core Animation + SwiftUI Animation
- **Local Storage**: Core Data + CloudKit
- **AI Backend**: Claude API (via Anthropic)
- **Sensors**: CoreMotion (자이로센서, 가속도계)
- **Haptics**: Core Haptics (Custom Patterns)

### 8.2 Data Model

**Orb Entity**
```swift
struct Orb {
    let id: UUID
    let text: String
    let createdAt: Date
    let monthIndex: Int        // 0-11
    let yearIndex: Int          // e.g., 2026
    let emotionCategory: EmotionCategory
    let color: String           // Hex
    let size: Double
    let position: CGPoint?      // 마지막 위치 저장
}

enum EmotionCategory {
    case passion, peace, joy, gratitude, excitement
}
```

**Jar Entity (Computed)**
```swift
struct Jar {
    let monthIndex: Int
    let yearIndex: Int
    let orbs: [Orb]
    var dominantEmotion: EmotionCategory? {
        // Compute from orbs frequency
    }
}
```

**Yearbook Entity**
```swift
struct Yearbook {
    let yearIndex: Int
    let chapters: [MonthlyChapter]
    let emotionHierarchy: [EmotionCategory: Double] // 감정별 비율
    let letter: HandwrittenLetter
    let generatedAt: Date
}
```

### 8.3 Claude API Integration

**Use Cases**
1. **감정 분류**: 메모 입력 시 실시간 감정 카테고리 분류
2. **월별 챕터 생성**: Yearbook Step 1
3. **편지 생성**: Yearbook Step 3 (말투 학습 기반)

**Prompt Engineering Strategy**
- Few-shot examples로 사용자 말투 학습
- JSON 출력 강제 (구조화된 응답)
- 한국어/영어 사용자 자동 감지

---

## 9. Success Metrics (KPIs)

### 9.1 Engagement
- **DAU/MAU 비율**: > 30%
- **주간 평균 구슬 생성 수**: > 3개/유저
- **연간 리텐션 (D365)**: > 25%

### 9.2 Quality
- **앱스토어 평점**: > 4.6
- **Yearbook 생성률**: 활성 유저 중 70% 이상이 연말에 생성

### 9.3 Behavioral
- **Shake 인터랙션 사용률**: 월 1회 이상 50%
- **Yearbook 공유율**: 생성자 중 30% 이상

---

## 10. Roadmap & Milestones

### Phase 1: MVP (3개월)
- [ ] 메인 선반 (12 Jars Horizontal Scroll)
- [ ] 구슬 입력 & Materialization
- [ ] Jar Detail + Shake to Mix
- [ ] Phantom Text
- [ ] 기본 데이터 저장 (Core Data)

### Phase 2: AI Layer (1.5개월)
- [ ] Claude API 연동
- [ ] 감정 분류 (실시간)
- [ ] Yearbook Step 1 (월별 챕터)
- [ ] Yearbook Step 2 (감정 시각화)

### Phase 3: Polish & Launch (1.5개월)
- [ ] Yearbook Step 3 (손글씨 편지)
- [ ] 이미지 내보내기 & SNS 공유
- [ ] 햅틱 패턴 정교화
- [ ] iCloud 동기화
- [ ] 앱스토어 출시

### Phase 4: Post-launch (Future)
- [ ] iPad / Mac Catalyst 지원
- [ ] Apple Watch 컴패니언 (빠른 입력)
- [ ] 위젯 (오늘의 구슬)
- [ ] 다년간 데이터 비교 ("작년 이맘때")
- [ ] 다국어 지원 확대

---

## 11. Open Questions & Risks

### 11.1 Open Questions
1. 사용자가 부정적 감정을 입력할 경우의 처리 방침은? (감정 분류 거부 vs 별도 카테고리)
2. 12월 31일 → 1월 1일 전환 시 이전 해의 병들은 어떻게 보관/표시할 것인가? (아카이브 뷰?)
3. 월별 구슬 개수 상한은? (병의 시각적 한계 vs 사용자 경험)
4. 무료/유료 모델 정책은? (Yearbook 유료화 가능성?)

### 11.2 Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| 물리 시뮬레이션 성능 저하 | High | 구슬 100개 초과 시 LOD 처리 |
| AI API 비용 부담 | Medium | 캐싱 전략 + 배치 처리 |
| 사용자 진입 후 빠른 이탈 | High | 강력한 온보딩 + 첫 주 푸시 전략 |
| 손글씨 폰트 라이선스 | Low | 자체 제작 또는 오픈 폰트 활용 |

---

## 12. Appendix

### 12.1 Reference Inspirations
- 종이학 / 행운병 (아날로그 메타포)
- iOS Memoji / Dynamic Island (Material design)
- Calm / Headspace (감성적 UX)
- 디즈니/픽사 빛 표현 (Visual reference)

### 12.2 Glossary
- **Orb (구슬)**: 사용자의 행복 메모 1건이 시각화된 빛나는 구체
- **Jar (병)**: 1개월 단위로 구슬을 보관하는 프로스트 글래스 컨테이너
- **Phantom Text (유령 텍스트)**: Shake 인터랙션 시 잠시 떠오르는 메모
- **Hierarchy of Light**: AI가 분석한 감정 분포의 시각적 위계
- **Materialization**: 텍스트가 구슬로 변환되는 핵심 애니메이션

---

**Document Status**: Living Document — 개발 진행에 따라 지속 업데이트
