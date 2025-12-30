🧩 Input / Form 컴포넌트 구조 가이드

이 문서는 프로젝트 내 Input 관련 컴포넌트 설계 원칙과 사용 방법을 정리한 문서입니다.
확장성과 유지보수를 고려한 구조로 설계되어 있으며, 실무에서 바로 사용할 수 있도록 구성되었습니다.

---

📦 전체 구조

```CSS
components/
 └─ input/
     ├─ Input.tsx         // 순수 Input 컴포넌트
     ├─ InputField.tsx    // label / error / helper 담당
     ├─ PasswordInput.tsx // 비밀번호 전용 Input
     └─ SearchInput.tsx   // 검색 전용 Input
```

---

1️⃣ Input (가장 기본이 되는 컴포넌트)
역할

1.  HTML <input> 태그의 래퍼

2.  스타일만 담당

3.  상태, 라벨, 에러 로직 없음

4.  모든 입력 컴포넌트의 기반

특징

1.  가장 작은 단위

2.  재사용성 최상

3.  어떤 페이지에서도 안전하게 사용 가능

예시

```TSX
import { Input } from "@/components/input/Input";

<Input
  type="text"
  placeholder="이름을 입력하세요"
  className="w-full"
/>
```

2️⃣ InputField (폼 단위 컴포넌트)
역할

1.  label, helper, error를 포함한 폼 단위 UI

2.  내부적으로 Input을 사용

3.  실질적인 폼 구성 단위

예시

```TSX
import { InputField } from "@/components/input/InputField";

<InputField
  label="이메일"
  helperText="이메일 형식으로 입력해주세요"
  inputProps={{
    placeholder: "example@email.com",
  }}
/>

에러 표시 예시
<InputField
  label="비밀번호"
  error="비밀번호를 입력해주세요"
  inputProps={{ type: "password" }}
/>
```

3️⃣ PasswordInput (비밀번호 전용 컴포넌트)
역할

1.  비밀번호 표시 / 숨김 토글 제공

2.  Input 위에 UI 기능을 조합한 컴포넌트

사용 예시

```TSX
import { PasswordInput } from "@/components/input/PasswordInput";

<PasswordInput className="w-full" />
```

필요 시 InputField로 감싸서 라벨·에러를 함께 사용

4️⃣ SearchInput (검색 전용 컴포넌트)
역할

1.  검색 아이콘 포함

2.  검색 UI에 특화된 입력 필드

```TSX
import { SearchInput } from "@/components/input/SearchInput";

<SearchInput placeholder="검색어를 입력하세요" />
```

5️⃣ 크기(size)는 어디서 조절하나요?
원칙

Input은 기본 스타일만 가진다.
크기 조절은 사용하는 쪽에서 한다.

예시

```TSX
<Input className="h-12 px-4" />     // 기본
<Input className="h-10 px-3" />     // 작은 사이즈
<Input className="h-14 text-lg" />  // 큰 입력
```

Input 자체에 size prop은 두지 않음
필요 시 className으로 자유롭게 조절

6️⃣ React Hook Form은 언제 사용하나요?
사용하는 경우

로그인 / 회원가입

유효성 검증이 필요한 폼

서버로 데이터 전송이 필요한 경우

```TSX
import { useForm } from "react-hook-form";

const { register, formState } = useForm();

<InputField
  label="이메일"
  inputProps={{
    ...register("email", { required: "이메일을 입력하세요" }),
  }}
  error={formState.errors.email?.message}
/>
```

사용하지 않아도 되는 경우

단순 UI 테스트

검색창

실시간 입력 UI

✅ 설계 요약

Input : 가장 기본적인 input
InputField : label / helper / error 담당
PasswordInput : 비밀번호 전용 UI
SearchInput : 검색 전용 UI
React Hook Form : 폼 상태 관리 (선택)
