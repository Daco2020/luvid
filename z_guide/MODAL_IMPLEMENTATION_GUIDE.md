# 모달 구현 가이드 및 뒤로가기 방지 패턴

본 문서는 `src/shared/components/Modal.tsx` 공용 컴포넌트 사용법과 `Wizard` 페이지에 적용된 브라우저 뒤로가기 가로채기(History Trap) 패턴에 대해 설명합니다.

## 1. 공용 모달 컴포넌트 (Modal)

**경로**: `src/shared/components/Modal.tsx`

`framer-motion`을 사용하여 부드러운 애니메이션이 적용된 모달입니다.

### Props 명세

| Prop 이름      | 타입                              | 설명                                                                                | 기본값    |
| -------------- | --------------------------------- | ----------------------------------------------------------------------------------- | --------- |
| `isOpen`       | `boolean`                         | 모달 표시 여부 제어                                                                 | **필수**  |
| `onClose`      | `() => void`                      | 모달 닫기(취소/X버튼/배경클릭) 핸들러                                               | **필수**  |
| `title`        | `string`                          | 모달 상단 제목                                                                      | -         |
| `description`  | `string`                          | 본문 텍스트 (`\n`으로 줄바꿈 가능)                                                  | -         |
| `confirmLabel` | `string`                          | 확인 버튼 라벨                                                                      | "확인"    |
| `cancelLabel`  | `string`                          | 취소 버튼 라벨 (onConfirm이 있을 때만 표시)                                         | "취소"    |
| `onConfirm`    | `() => void`                      | 확인 버튼 클릭 핸들러. **이 값이 없으면 확인 버튼 하나만 있는 알림 모달이 됩니다.** | -         |
| `variant`      | `"default" \| "danger" \| "info"` | 버튼 스타일 (`danger`: 빨간색 버튼)                                                 | "default" |
| `children`     | `React.ReactNode`                 | 텍스트 외 커스텀 컨텐츠가 필요할 때 사용                                            | -         |

### 기본 사용법 (Alert 형태)

```tsx
<Modal
  isOpen={showError}
  onClose={() => setShowError(false)}
  title="오류 발생"
  description="처리에 실패했습니다."
/>
```

### 컨펌 모달 사용법 (Confirm 형태)

`onConfirm`을 전달하면 '취소' 버튼이 자동으로 함께 표시됩니다.

```tsx
<Modal
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  title="삭제 확인"
  description="정말 삭제하시겠습니까?"
  confirmLabel="삭제하기"
  onConfirm={handleDelete}
  variant="danger" // 빨간색 버튼 적용
/>
```

---

## 2. 브라우저 뒤로가기 가로채기 (History Trap 패턴)

브라우저의 뒤로가기 버튼, 마우스 보조 버튼(Back), 트랙패드 스와이프 제스처를 모두 방지하고 모달을 띄우기 위한 패턴입니다. Next.js의 `router.back()`이나 브라우저 기본 동작으로는 이탈 전에 모달을 띄우고 취소하는 것이 완벽하지 않으므로, **"Trap(함정)"**을 설치하는 방식을 사용합니다.

### 동작 원리

1.  **Mount 시 Trap 설치**: `useEffect`에서 `history.pushState`를 호출하여 가상의 히스토리를 하나 쌓습니다.
2.  **이탈 감지 (`popstate`)**: 사용자가 뒤로가기를 시도하면 `popstate` 이벤트가 발생합니다.
3.  **이탈 방지**: 이벤트 핸들러 내에서 즉시 `history.pushState`를 다시 호출하여, URL 변경 없이 현재 페이지에 머무르게 합니다.
4.  **모달 표시**: 이탈을 막은 상태에서 '정말 나가시겠습니까?' 모달을 띄웁니다.
5.  **진짜 이탈 처리**: 사용자가 모달에서 '나가기'를 누르면 `history.go(-2)`를 호출합니다.
    - `(-1)`이 아니라 `(-2)`인 이유: Trap 설치로 인해 현재 스택이 하나 더 쌓여있으므로, 원래 이전 페이지로 가기 위해서는 두 단계를 거슬러 올라가야 합니다.

### 구현 코드 예시

```tsx
// Wizard.tsx

import { useEffect, useRef, useState } from "react";

export function Wizard() {
  const [showExitModal, setShowExitModal] = useState(false);

  // popstate 핸들러에서 최신 state를 참조하기 위한 Ref
  const isProgrammaticBackRef = useRef(false);

  useEffect(() => {
    // 1. Trap 설치 (현재 URL을 스택에 한번 더 push)
    history.pushState(null, "", location.href);

    const handlePopState = (e: PopStateEvent) => {
      // 프로그램적으로 뒤로가는 중이면(나가기 버튼 클릭 시) 막지 않음
      if (isProgrammaticBackRef.current) return;

      // 2. 뒤로가기 시도 시, 다시 push 하여 제자리 유지
      history.pushState(null, "", location.href);

      // 3. 모달 띄우기 (또는 내부 스텝 이동 로직)
      setShowExitModal(true);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <>
      <Modal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="나가시겠습니까?"
        onConfirm={() => {
          // 4. Trap을 탈출하여 진짜 뒤로가기 실행
          isProgrammaticBackRef.current = true;
          setShowExitModal(false);
          history.go(-2); // Trap 포함 2단계 뒤로 이동
        }}
        variant="danger"
      />
    </>
  );
}
```
