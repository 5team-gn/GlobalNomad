**Input (Common Component)**

TL;DR

기본 입력은 Input을 사용합니다.
아이콘·버튼·상태 로직이 필요하면 Input을 감싸는 조합 컴포넌트를 만듭니다.
아직 사용되지 않는 입력 UI는 미리 만들지 않습니다.

개요

Input 컴포넌트는 GlobalNomad 프로젝트에서 사용되는 모든 입력 UI의 기준 컴포넌트입니다.

이 컴포넌트는 순수한 입력 필드 역할만 담당하며,
아이콘, 버튼, 상태 토글(비밀번호 보기, 검색 등), 비즈니스 로직은 포함하지 않습니다.

해당 기능이 필요한 경우,
Input을 감싸는 조합 컴포넌트(Composition Component)로 확장합니다.

**기본 사용법**

```tsx
<Input placeholder="이메일을 입력하세요" />
```

기본 사이즈는 md이며,
별도 설정 없이 공통 스타일이 적용됩니다.

**Props**

Input Props

    label (string)
    입력 필드 상단에 표시되는 라벨

    placeholder (string)
    입력 필드 내부에 표시되는 힌트 텍스트

    helperText (string)
    입력 가이드 텍스트
    입력 규칙이나 설명을 제공하며, 입력 중에도 사라지지 않습니다.

    error (string)
    에러 메시지
    존재 시 에러 스타일이 적용되며 helperText는 표시되지 않습니다.

    inputSize ('sm' | 'md' | 'lg')
    인풋 크기 (기본값: md)

    className (string)
    Tailwind CSS 커스텀 클래스

**기타**
value, onChange, disabled 등 기본 HTML input 속성 사용 가능
접근성을 위해 label 사용 시 input과 연결되는 id 사용을 권장합니다.

placeholder와 helperText의 차이

placeholder는 입력 필드 내부에 표시되는 힌트로,
입력을 시작하면 사라지며 “어디에 무엇을 입력하는지”를 안내합니다.

helperText는 입력 필드 하단에 표시되는 안내 문구로,
입력 중에도 유지되며 “어떻게 입력해야 하는지”를 설명합니다.

**사용 예시**

기본 입력

```tsx
<Input label="이메일" placeholder="example@email.com" />
```

HelperText 사용 예시

```tsx
<Input label="비밀번호" type="password" helperText="8자 이상 입력해주세요" />
```

Error 상태 예시

```tsx
<Input label="비밀번호" type="password" error="비밀번호가 너무 짧습니다" />
```

**디자인 및 설계 규칙 (중요)**

Input은 입력 역할만 담당합니다.

다음 요소들은 포함하지 않습니다.

아이콘 (돋보기, 눈 모양 등)
버튼
상태 토글 로직
비즈니스 로직

기능이 필요한 경우,
Input을 기반으로 한 조합 컴포넌트를 생성합니다.

조합 컴포넌트 가이드

아래와 같은 입력 UI는 조합 컴포넌트로 구현합니다.

PasswordInput
SearchInput

**구조 예시 (PasswordInput)**

```tsx
const PasswordInput = () => {
  return (
    <div className="relative">
      <Input type="password" className="pr-10" />
      비밀번호 표시/숨김 아이콘
    </div>
  );
};
```

**구조 예시 (SearchInput)**

```tsx
const SearchInput = () => {
  return (
    <div className="flex items-center gap-2">
      <Input placeholder="검색어를 입력하세요" />
      검색 버튼 또는 아이콘
    </div>
  );
};
```

조합 컴포넌트는 실제 사용 요구가 생겼을 때 생성하는 것을 원칙으로 합니다.

**권장하지 않는 사용**

1. Input에 아이콘이나 토글 로직을 직접 추가하는 것

2. 모든 케이스를 props로 처리하는 만능 Input

3. 아직 요구사항이 없는 조합 컴포넌트를 미리 구현하는 것

**정리**

공통 Input의 완성 기준은
모든 입력 컴포넌트를 미리 만드는 것이 아니라,
필요한 입력 UI를 언제든 확장할 수 있는 기반을 제공하는 것입니다.
