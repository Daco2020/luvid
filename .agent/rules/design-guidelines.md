---
trigger: model_decision
description: This must be referenced for any UI implementation or design change that affects the screen.
---

# Luvid Design Guidelines

This document defines the visual language and user interface standards for **Luvid**.
Designed for **dating beginners (20-30s)** who need warm guidance and reassurance.

## 1. Design Philosophy

- **Keyword**: `Warm` + `Friendly` + `Reassuring`
- **Concept**: A supportive companion that guides you through your dating journey with empathy.
- **Target Emotion**: "I'm not alone. Someone understands me and will help me."
- **Visual Style**: Soft, rounded, playful yet sincere. Like a caring friend, not a clinical tool.

### Minimalism & Apple Design Principles

> "Simplicity is the ultimate sophistication." - Steve Jobs

- **Less is More**: 한 화면에 하나의 핵심 메시지만. 불필요한 요소는 과감히 제거.
- **Clarity Over Cleverness**: 영리한 디자인보다 명확한 디자인. 사용자가 고민하지 않게.
- **Whitespace as Design**: 여백은 비어있는 공간이 아니라 집중을 위한 디자인 요소.
- **Purposeful Every Pixel**: 모든 요소는 명확한 목적이 있어야 함. 장식을 위한 장식은 없음.
- **Progressive Disclosure**: 필요한 정보만 단계적으로 보여주기. 한 번에 모든 걸 보여주지 않음.
- **Invisible UI**: 최고의 UI는 눈에 띄지 않는 UI. 콘텐츠가 주인공.

**구현 원칙**:

- 한 화면 = 하나의 질문 또는 하나의 액션
- 버튼은 최대 2개 (Primary 1개 + Secondary 1개)
- 텍스트는 짧고 명확하게 (한 문장 = 한 생각)
- 불필요한 아이콘, 그래픽 제거
- 컬러는 의미 전달에만 사용 (장식 X)

## 2. Tone & Manner

### Voice

- **Encouraging**: "괜찮아요, 천천히 알아가요" not "데이터를 분석하세요"
- **Empathetic**: Acknowledge fears ("거절이 무서운 건 당연해요")
- **Conversational**: Use casual language, avoid jargon
- **Positive**: Focus on growth, not failure

### Terminology

- ❌ "Relationship Architecture", "Data-driven", "Metrics"
- ✅ "연애 여정", "마음 이해하기", "함께 알아가기"

## 3. Layout Structure

- **Mobile First**: Primary experience on mobile (where dating anxiety happens)
- **Single Column Flow**: Simple, linear progression (no overwhelming dashboards)
- **Progress Indicators**: Show journey progress with encouraging milestones
- **Breathing Room**: Generous whitespace to reduce cognitive load

## 4. Component Styling

### Cards & Surfaces

- **Shape**: Very rounded corners (`rounded-3xl`) for softness
- **Surface**: White with warm shadows (not cold gray)
- **Effect**: Gentle, glowing shadows that feel inviting

### Color Palette (Luvid Theme)

- **Concept**: _Warm Pastel_ - Comforting, safe, optimistic
- **Brand Colors**:
  - **Primary (Heart)**: `Coral Pink` (`#FF8096`) - Warm, approachable love
  - **Secondary (Support)**: `Soft Lavender` (`#B8A4E8`) - Calming, trustworthy
  - **Accent (Joy)**: `Peach` (`#FFB88C`) - Encouraging, cheerful
  - **Success**: `Mint Green` (`#A8E6CF`) - Growth, progress
- **Surfaces**:
  - **Background**: `Cream` (`#FFFBF5`) - Warm, not clinical white
  - **Card**: `White` (`#FFFFFF`) with warm glow
- **Text**:
  - **Headings**: `Soft Black` (`#2D2D2D`) - Readable but not harsh
  - **Body**: `Warm Gray` (`#6B6B6B`) - Friendly, not cold

### Typography

- **Font Family**:
  - **Headings**: `Nunito` (Rounded, Friendly, Approachable)
  - **Body**: `Geist Sans` (Clean, Easy to read)
- **Scale**: Comfortable reading, not cramped
  - **Hero Titles**: `text-3xl` or `text-4xl` (Bold, Welcoming)
  - **Section Titles**: `text-lg` (Medium weight)
  - **Body Text**: `text-base` (Regular, 16px minimum)
  - **Helper Text**: `text-sm` (Gentle guidance)
- **Line Height**: Generous (`leading-relaxed`) for easy reading

### Micro-interactions & Feedback

- **Animations**: Gentle, bouncy (not robotic)
- **Success States**: Celebrate with confetti/sparkles
- **Loading**: Friendly messages ("잠시만 기다려주세요 💭")
- **Errors**: Empathetic, not blaming ("앗, 다시 한번 확인해주세요")

### Iconography & Illustrations

- **Icons**: Rounded, friendly (Lucide with rounded variant)
- **Illustrations**: Hand-drawn feel, warm characters
- **Emojis**: Use liberally for warmth (💕, 🌟, 💭, 🎉)
- **Empty States**: Encouraging illustrations, not just text

### Buttons & CTAs

- **Shape**: Pill-shaped (`rounded-full`) for friendliness
- **Size**: Large, easy to tap (`h-12` minimum)
- **Primary**: Gradient or solid with soft shadow
- **Copy**: Action-oriented and encouraging
  - ❌ "Submit", "Next"
  - ✅ "시작하기", "알아보기", "함께 해볼까요?"

## 5. Implementation Rules (Tailwind CSS)

- **Border Radius**: `rounded-3xl` for cards, `rounded-full` for buttons
- **Spacing**: Generous padding (`p-6` minimum, `p-8` preferred)
- **Shadows**: Warm, soft glows (not harsh drop shadows)
- **Transitions**: Smooth, bouncy (`ease-out`, `duration-300`)

## 6. UI Implementation Precautions

### 6.1 Emotional Design

- **Reduce Anxiety**: Use progress bars, clear next steps
- **Build Confidence**: Celebrate small wins with micro-animations
- **Provide Safety**: Always show "뒤로가기" option, auto-save progress

### 6.2 Responsiveness

- **Mobile First**: Design for phone (where anxiety is highest)
- **Touch Targets**: Minimum `48px` for anxious tapping
- **Thumb Zone**: Important actions in easy-to-reach areas

### 6.3 Accessibility & Usability

- **Contrast**: WCAG AA minimum (readable when anxious)
- **Focus States**: Clear, friendly focus rings
- **Error Prevention**: Validate gently, guide proactively

### 6.4 Content Strategy

- **Chunking**: Break complex tasks into tiny steps
- **Encouragement**: Add supportive messages throughout
- **Examples**: Show real examples, not abstract concepts
- **Privacy**: Reassure that data is safe and private

---

**Reference**: Inspired by Headspace (mental health), Duolingo (gamification), and Notion (friendly productivity).
