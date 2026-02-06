# 📊 Google Analytics (GA4) 시작하기: 초보자 가이드

이 문서는 **누구나(심지어 중학생도!)** 따라 하기만 하면 우리 사이트에 방문자 수를 셀 수 있는 **Google Analytics(GA)** 를 붙일 수 있도록 작성된 친절한 설명서입니다.

---

## 🚀 1단계: 구글 애널리틱스(GA) 계정 만들고 ID 발급받기

가장 먼저 구글에게 "나 이 사이트 분석할 거야!"라고 신고하고, **ID표(측정 ID)**를 받아야 합니다.

1.  **구글 애널리틱스 접속**: [analytics.google.com](https://analytics.google.com) 으로 들어갑니다. (구글 로그인 필요)
2.  **계정 생성 시작**: 화면 중앙에 있는 **[측정 시작]** 또는 왼쪽 아래 톱니바퀴 아이콘 **[관리]** → **[만들기]** → **[계정]** 버튼을 누릅니다.
3.  **계정 이름 입력**:
    - **계정 이름**: `Luvid` (또는 프로젝트 이름)라고 적습니다.
    - 아래 데이터 공유 설정 체크박스는 그대로 두고 **[다음]** 버튼을 누릅니다.
4.  **속성 만들기**:
    - **속성 이름**: `Luvid Web` (알아보기 쉽게 짓습니다).
    - **비고**: 보고서 시간대(대한민국), 통화(KRW)는 편한 대로 설정합니다.
    - **[다음]** → 비즈니스 정보는 대충 선택하고 **[다음]** → 비즈니스 목표도 '사용자 행동 검토' 등을 선택하고 **[만들기]**를 누릅니다.
5.  **약관 동의**: 대한민국으로 바꾸고 체크박스 동의 후 **[동의함]**을 누릅니다.
6.  **데이터 수집 플랫폼 선택**: **[웹]** (Web) 버튼을 누릅니다.
7.  **데이터 스트림 설정**:
    - **웹사이트 URL**: 지금은 `localhost`라도 나중에 배포할 주소(예: `luvid.vercel.app`)나 없으면 `example.com`이라고 적어도 됩니다. (나중에 수정 가능)
    - **스트림 이름**: `Luvid Web Stream`
    - **[스트림 만들기]** 버튼을 클릭합니다.
8.  **⭐ 측정 ID 복사하기**:
    - 화면에 **`측정 ID`** 라고 적힌 **`G-`** 로 시작하는 코드가 보일 거예요. (예: `G-ABC1234567`)
    - 오른쪽의 **복사 아이콘**을 눌러 복사해두세요. 이따가 쓰입니다!

---

## 🛠️ 2단계: 프로젝트에 도구 설치하기 (터미널)

이제 우리 코딩 프로젝트에 "구글 도구 좀 쓸게~" 하고 라이브러리를 설치해야 합니다.

1.  **터미널 열기**: VS Code에서 `Ctrl + ~` (물결표시)를 눌러 터미널을 엽니다.
2.  **명령어 입력**: 아래 글자를 복사해서 붙여넣고 엔터(Enter)를 치세요.

```bash
npm install @next/third-parties
```

_(설치가 완료될 때까지 잠시 기다려주세요.)_

---

## 📝 3단계: 환경 변수 설정하기 (비밀번호처럼 관리하기)

복사해둔 `G-` 코드를 코드에 직접 적지 않고, 따로 파일에 적어두는 것이 안전하고 관리하기 좋습니다.

1.  **파일 찾기/만들기**: 프로젝트 폴더 최상위(package.json이 있는 곳)에 `.env.local` 이라는 파일이 있는지 봅니다.
    - 없으면: 왼쪽 파일 탐색기 빈 곳 우클릭 → **[새 파일]** → `.env.local` 이라고 입력해서 만듭니다.
2.  **내용 적기**: 그 파일 안에 아까 복사한 ID를 다음과 같이 적고 저장(`Cmd + S`)하세요.

```env
# .env.local 파일 내용
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

_(위 `G-XXXXXXXXXX` 자리에 아까 복사한 여러분의 ID를 붙여넣으세요!)_

---

## 💻 4단계: 코드에 연결하기 (딱 한 번만 하면 끝!)

이제 설치한 도구를 우리 웹사이트의 **가장 큰 뼈대(Layout)**에 끼워 넣으면 됩니다.

1.  **파일 열기**: `src/app/layout.tsx` 파일을 엽니다.
2.  **코드 수정하기**: 아래 **두 군데**를 수정합니다.

**① 맨 위에 import 추가하기**

```tsx
// 원래 있던 import들 아래에 추가하세요
import { GoogleAnalytics } from "@next/third-parties/google";
```

**② HTML 안에 컴포넌트 넣기**

```tsx
// ... 중간 생략 ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body ... >
        {children}
      </body>

      {/* 🟢 여기! </body> 태그 바로 밑, </html> 태그 닫히기 전에 추가하세요 */}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />

    </html>
  );
}
```

> **주의**: `gaId`에 직접 `G-XXX`를 넣기보다, 위처럼 `process.env...`를 쓰는 게 좋습니다. 혹시 빨간 줄이 뜨면 일단 무시하거나, 직접 ID를 문자열로 넣어서 테스트해보셔도 됩니다.

---

## ✅ 5단계: 잘 되는지 확인하기

1.  **서버 실행**: 터미널에 `npm run dev`를 입력해서 사이트를 켭니다.
2.  **사이트 접속**: 웹 브라우저로 `http://localhost:3000`에 들어갑니다. (새로고침 몇 번 해주세요)
3.  **구글 애널리틱스 확인**:
    - 아까 구글 애널리틱스 창으로 돌아갑니다.
    - 왼쪽 메뉴에서 **[보고서]** (그래프 아이콘) → **[실시간]**을 누릅니다.
    - **"지난 30분 동안의 사용자"** 가 **1** (또는 그 이상)로 올라가면 성공! 🎉

---

## 🎯 6단계 (심화): 특정 시점에 이벤트 추적하기

기본적으로 GA는 페이지 이동만 추적하지만, **"이 버튼을 몇 번 눌렀는지"**, **"어떤 기능을 사용했는지"** 같은 걸 직접 기록할 수도 있어요!

### 📌 언제 사용하나요?

- 버튼 클릭 추적 (예: "Luv ID 발급하기" 버튼을 몇 명이 눌렀는지)
- 중요한 액션 추적 (예: 사용자가 설명서 완성, 궁합 분석 완료 등)
- 모달 열림/닫힘, 폼 제출 등

### 🛠️ 사용법

**① Client Component에서 추적하기**

먼저 파일 맨 위에 `"use client"`를 적어야 합니다. (이미 있다면 생략)

```tsx
"use client";

import { sendGAEvent } from "@next/third-parties/google";

export default function MyComponent() {
  const handleButtonClick = () => {
    // 🟢 이벤트 전송!
    sendGAEvent({
      event: "button_click", // 이벤트 이름 (영어로, 띄어쓰기 대신 _ 사용)
      value: "luv_id_create_button", // 어떤 버튼인지 구분값
    });

    // 실제 버튼 동작
    console.log("버튼이 눌렸어요!");
  };

  return <button onClick={handleButtonClick}>Luv ID 발급하기</button>;
}
```

**② 실제 프로젝트 예시**

예를 들어 `src/app/page.tsx`의 "Luv ID 발급하기" 버튼에 추적을 붙인다면:

```tsx
"use client";

import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

export default function Home() {
  const handleLuvIdClick = () => {
    sendGAEvent({
      event: "luv_id_button_click",
      value: "home_page",
    });
  };

  return (
    <Link href="/luvid/create" onClick={handleLuvIdClick}>
      <button>Luv ID 발급하기</button>
    </Link>
  );
}
```

**③ 다양한 이벤트 예시**

```tsx
// 폼 제출 추적
const handleSubmit = () => {
  sendGAEvent({
    event: "form_submit",
    value: "user_manual_complete",
  });
};

// 모달 열기 추적
const handleModalOpen = () => {
  sendGAEvent({
    event: "modal_open",
    value: "compatibility_modal",
  });
};

// 공유 버튼 클릭 추적
const handleShare = () => {
  sendGAEvent({
    event: "share_button_click",
    value: "luv_id_card",
  });
};
```

### ✅ 이벤트가 잘 전송되었는지 확인하기

1.  **구글 애널리틱스 접속**: [analytics.google.com](https://analytics.google.com)
2.  **실시간 확인**: 왼쪽 메뉴 **[보고서]** → **[실시간]** → **[이벤트 (지난 30분)]**
3.  **버튼 클릭**: 실제로 추적을 붙인 버튼을 눌러보세요.
4.  **이벤트 이름 확인**: 아까 적은 이벤트 이름 (예: `button_click`, `luv_id_button_click`)이 목록에 뜨면 성공! 🎉

### 💡 팁

- **이벤트 이름은 영어로**: 나중에 보고서에서 보기 편해요.
- **의미있는 이름 사용**: `button_click` 보다는 `luv_id_create_start` 같이 구체적으로.
- **너무 많이 추적하지 말기**: 정말 중요한 액션만 추적하세요. (모든 클릭을 다 추적하면 데이터가 복잡해져요)

---

### 🎉 축하합니다!

이제 여러분의 웹사이트에 누가 들어오는지 구글이 다 기록해줍니다.

- 어느 페이지를 많이 보는지
- 어떤 버튼을 누르는지
- 핸드폰으로 오는지 컴퓨터로 오는지

**그리고 이제는 특정 버튼 클릭이나 중요한 사용자 행동까지도** 직접 추적할 수 있게 되었습니다! 고생하셨습니다. 👍
