# React Native Animation 학습

## 학습 목표
React Native에서 제공하는 다양한 애니메이션 기법을 학습하고 실무에 적용할 수 있는 능력을 기릅니다.

---

## 📖 목차
1. [Animated 심화 실습](#1-animated-심화-실습)
2. LayoutAnimation (예정)
3. Interaction Manager (예정)
4. PanResponder를 활용한 제스처 인식 (예정)
5. LayoutEvent로 상호작용 감지하기 (예정)
6. FlatList 스크롤 데이터 감지 (예정)
7. 유튜브 뮤직 클론 코딩 (예정)

---

## 1. Animated 심화 실습

React Native의 `Animated` API를 활용하여 다양한 UI 컴포넌트를 구현하는 실습입니다.

### 1.1 Snackbar 만들기

<video src="./screenshot/snackbar.mp4" width="300" controls loop muted><Video>

#### 📝 설명
하단에서 올라오는 알림 메시지(Snackbar)를 구현합니다. 버튼을 클릭하면 애니메이션과 함께 Snackbar가 나타났다가 2초 후 자동으로 사라집니다.

#### 🎯 주요 학습 내용
- `Animated.sequence`: 여러 애니메이션을 순차적으로 실행
- `Animated.delay`: 애니메이션 사이에 지연 시간 추가
- `translateY` 변환을 활용한 슬라이드 애니메이션
- `Easing` 함수로 자연스러운 움직임 구현

#### 💻 핵심 코드
```tsx
// src/chapter3/Snackbar.tsx
const translateYAnim = useRef(new Animated.Value(100)).current;

const onPressButton = () => {
  Animated.sequence([
    // 1. 위로 올라오기
    Animated.timing(translateYAnim, {
      toValue: 0,
      useNativeDriver: true,
      easing: Easing.out(Easing.circle),
    }),
    // 2. 2초 대기
    Animated.delay(2000),
    // 3. 아래로 내려가기
    Animated.timing(translateYAnim, {
      toValue: 100,
      useNativeDriver: true,
      easing: Easing.in(Easing.circle),
    }),
  ]).start();
};
```

#### 🔑 핵심 포인트
- `sequence`를 사용하여 "올라오기 → 대기 → 내려가기" 3단계 애니메이션 구현
- `useNativeDriver: true`로 성능 최적화
- `translateY`로 수직 이동 애니메이션 적용

---

### 1.2 Drawer Menu 만들기

#### 📸 스크린샷
> *스크린샷 추가 예정*

#### 📝 설명
왼쪽에서 슬라이드되어 나오는 Drawer 메뉴를 구현합니다. 메뉴 버튼을 누르면 메뉴가 나타나고, 배경 또는 닫기 버튼을 누르면 사라집니다.

#### 🎯 주요 학습 내용
- `translateX`를 활용한 가로 슬라이드 애니메이션
- `interpolate`로 여러 스타일 속성 동시 제어
- Backdrop 배경 효과 구현
- `Dimensions`로 화면 크기에 반응하는 애니메이션

#### 💻 핵심 코드
```tsx
// src/chapter3/DrawerMenu.tsx
const interpolateAnim = useRef(new Animated.Value(0)).current;
const width = Dimensions.get('window').width;

// 메뉴 슬라이드 애니메이션
<Animated.View
  style={[
    styles.menuContainer,
    {
      transform: [
        {
          translateX: interpolateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [width * -0.9, 0], // 화면 왼쪽 밖에서 안으로
          }),
        },
      ],
    },
  ]}
>
  {/* 메뉴 내용 */}
</Animated.View>

// 배경 어둡게 처리
<Animated.View
  style={[
    styles.backdrop,
    {
      width: interpolateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '2000%'],
      }),
      backgroundColor: interpolateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#00000000', '#00000090'], // 투명 → 반투명
      }),
    },
  ]}
/>
```

#### 🔑 핵심 포인트
- 하나의 `Animated.Value`로 메뉴 위치와 배경 투명도를 동시에 제어
- `interpolate`의 `outputRange`에 컬러 값도 적용 가능
- `Dimensions`로 다양한 화면 크기에 대응

---

### 1.3 Collapse (아코디언) 만들기

#### 📸 스크린샷
> *스크린샷 추가 예정*

#### 📝 설명
FAQ 형태의 접을 수 있는 아코디언 UI를 구현합니다. 질문을 클릭하면 답변이 펼쳐지고, 다시 클릭하면 접힙니다.

#### 🎯 주요 학습 내용
- 동적 `height` 애니메이션
- `rotate` 변환으로 아이콘 회전 효과
- 토글 상태 관리와 애니메이션 연동
- 여러 아이템을 독립적으로 애니메이션 처리

#### 💻 핵심 코드
```tsx
// src/chapter3/Collapse.tsx
const interpolateAnim = useRef(new Animated.Value(0)).current;
let isOpened = false;

const onPress = () => {
  Animated.timing(interpolateAnim, {
    toValue: isOpened ? 0 : 1,
    duration: 200,
    useNativeDriver: false, // height는 native driver 미지원
  }).start(() => {
    isOpened = !isOpened;
  });
};

// 답변 영역 높이 애니메이션
<Animated.View
  style={[
    styles.answer,
    {
      height: interpolateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100], // 0 → 100px
      }),
    },
  ]}
>
  <Text>{item.a}</Text>
</Animated.View>

// 화살표 아이콘 회전
<Animated.View
  style={{
    transform: [
      {
        rotate: interpolateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'], // 0도 → 180도
        }),
      },
    ],
  }}
>
  <MaterialIcons name="expand-more" />
</Animated.View>
```

#### 🔑 핵심 포인트
- `height` 애니메이션은 `useNativeDriver: false` 필수
- `rotate` 값에 문자열 (`'180deg'`) 사용 가능
- 각 아이템마다 독립적인 `Animated.Value` 사용

---

### 1.4 Progress Bar 만들기

#### 📸 스크린샷
> *스크린샷 추가 예정*

#### 📝 설명
진행 상황을 시각적으로 표시하는 Progress Bar를 구현합니다. 수동으로 단계별로 진행하거나, 자동으로 진행시킬 수 있습니다.

#### 🎯 주요 학습 내용
- `width` 애니메이션으로 진행률 표현
- `Animated.spring`을 활용한 탄성 효과
- `Animated.sequence`로 단계별 진행 구현
- `interpolate`로 퍼센트 값 변환

#### 💻 핵심 코드
```tsx
// src/chapter3/ProgressBar.tsx
const interpolateAnim = useRef(new Animated.Value(0)).current;
const clickCount = useRef(1);

// 수동 진행 (20%씩)
const onPressRun = () => {
  if (clickCount.current > 5) return;
  
  const targetValue = 20 * clickCount.current;
  Animated.spring(interpolateAnim, {
    toValue: targetValue,
    friction: 7,    // 마찰력 (값이 클수록 빨리 멈춤)
    tension: 40,    // 장력 (값이 클수록 빠르게 움직임)
    useNativeDriver: false,
  }).start();
  clickCount.current++;
};

// 자동 진행 (20% → 70% → 100%)
const onPressAutoRun = () => {
  Animated.sequence([
    Animated.spring(interpolateAnim, { toValue: 20, friction: 7, tension: 40, useNativeDriver: false }),
    Animated.spring(interpolateAnim, { toValue: 70, friction: 7, tension: 40, useNativeDriver: false }),
    Animated.spring(interpolateAnim, { toValue: 100, friction: 7, tension: 40, useNativeDriver: false }),
  ]).start();
};

// Progress Bar UI
<Animated.View
  style={[
    styles.progressBarMoving,
    {
      width: interpolateAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'], // 0~100 값을 퍼센트로 변환
      }),
    },
  ]}
/>
```

#### 🔑 핵심 포인트
- `spring` 애니메이션으로 자연스러운 탄성 효과
- `sequence`로 여러 단계를 순차적으로 진행
- `interpolate`로 숫자 값을 퍼센트 문자열로 변환
- `ref`로 클릭 횟수 추적 및 제한

---

### 1.5 Skeleton 로딩 UI 만들기

#### 📸 스크린샷
> *스크린샷 추가 예정*

#### 📝 설명
콘텐츠 로딩 중 표시되는 Skeleton UI를 구현합니다. 빛나는 효과가 좌측에서 우측으로 반복적으로 이동합니다.

#### 🎯 주요 학습 내용
- `Animated.loop`로 무한 반복 애니메이션
- `LinearGradient`와 애니메이션 결합
- `translateX`를 활용한 가로 이동 효과
- `Dimensions`로 화면 너비 기반 애니메이션

#### 💻 핵심 코드
```tsx
// src/chapter3/Skeleton.tsx
const interpolateAnim = useRef(new Animated.Value(0)).current;
const windowWidth = Dimensions.get('window').width;

useEffect(() => {
  Animated.loop(
    Animated.timing(interpolateAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000,
    }),
  ).start();
}, []);

// 빛나는 효과
<Animated.View
  style={{
    position: 'absolute',
    top: -30,
    transform: [
      {
        translateX: interpolateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-windowWidth * 0.2, windowWidth * 1.3], // 좌측 밖 → 우측 밖
        }),
      },
      { rotate: '20deg' },
    ],
  }}
>
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={['#ffffff00', '#ffffff90', '#ffffff00']} // 투명 → 흰색 → 투명
  >
    <View style={{ width: 40, height: 100 }} />
  </LinearGradient>
</Animated.View>
```

#### 🔑 핵심 포인트
- `Animated.loop`로 무한 반복 애니메이션 구현
- `LinearGradient`로 빛나는 효과 표현
- `useNativeDriver: true`로 성능 최적화 (translateX는 지원)
- **주의**: `left` 속성은 native driver 미지원 → `translateX` 사용 필수

#### ⚠️ 주의사항
Native Driver 사용 시 지원되는 속성:
- ✅ `transform` (translateX, translateY, scale, rotate)
- ✅ `opacity`
- ❌ `left`, `right`, `top`, `bottom`, `width`, `height`

---

### 1.6 눈 내리는 배경 만들기

#### 📸 스크린샷
> *스크린샷 추가 예정*

#### 📝 설명
겨울 느낌의 눈이 내리는 배경 애니메이션을 구현합니다. 50개의 눈송이가 랜덤한 위치에서 각각 다른 타이밍으로 떨어집니다.

#### 🎯 주요 학습 내용
- 다수의 독립적인 애니메이션 동시 실행
- `delay`를 활용한 시간차 애니메이션
- `Math.random()`으로 랜덤 위치 생성
- Icon 컴포넌트와 애니메이션 결합

#### 💻 핵심 코드
```tsx
// src/chapter3/SnowAnimation.tsx
<View style={{ backgroundColor: '#121723', flex: 1 }}>
  {Array.from({ length: 50 }).map((_, index) => {
    const interpolateAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
      Animated.loop(
        Animated.timing(interpolateAnim, {
          toValue: 1,
          duration: 5000,
          delay: index * 100, // 각 눈송이마다 100ms씩 딜레이
          useNativeDriver: false,
        }),
      ).start();
    });
    
    return (
      <Animated.View
        key={index}
        style={{
          position: 'absolute',
          left: `${Math.floor(Math.random() * 100)}%`, // 랜덤 가로 위치
          top: interpolateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['-10%', '110%'], // 화면 위 → 아래
          }),
        }}
      >
        <Icon name="snowflake" size={16} color="#fff" />
      </Animated.View>
    );
  })}
</View>
```

#### 🔑 핵심 포인트
- `Array.from({ length: 50 })`로 50개의 눈송이 생성
- 각 눈송이마다 독립적인 `Animated.Value` 사용
- `delay`를 인덱스에 비례하게 설정하여 자연스러운 효과
- `Math.random()`으로 랜덤한 가로 위치 배치
- `position: 'absolute'`로 요소들을 겹쳐서 배치

---

## 🎓 학습 요약

### Animated API 핵심 메서드
| 메서드 | 설명 | 사용 예제 |
|--------|------|-----------|
| `Animated.timing` | 시간 기반 선형 애니메이션 | Snackbar, Skeleton, SnowAnimation |
| `Animated.spring` | 물리 기반 탄성 애니메이션 | ProgressBar |
| `Animated.sequence` | 애니메이션 순차 실행 | Snackbar, ProgressBar |
| `Animated.loop` | 애니메이션 무한 반복 | Skeleton, SnowAnimation |
| `Animated.delay` | 지연 시간 추가 | Snackbar, SnowAnimation |

### interpolate 활용
`interpolate`는 하나의 Animated.Value를 다양한 범위로 변환할 때 사용합니다.

```tsx
// 숫자 변환
width: animValue.interpolate({
  inputRange: [0, 100],
  outputRange: [0, 300],
})

// 퍼센트 변환
width: animValue.interpolate({
  inputRange: [0, 100],
  outputRange: ['0%', '100%'],
})

// 색상 변환
backgroundColor: animValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['#ffffff', '#000000'],
})

// 각도 변환
rotate: animValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '180deg'],
})
```

### useNativeDriver 사용 가이드

**사용 가능한 속성 (useNativeDriver: true)**
- ✅ `opacity`
- ✅ `transform` 계열
  - `translateX`, `translateY`
  - `scale`, `scaleX`, `scaleY`
  - `rotate`, `rotateX`, `rotateY`, `rotateZ`

**사용 불가능한 속성 (useNativeDriver: false 필요)**
- ❌ `width`, `height`
- ❌ `left`, `right`, `top`, `bottom`
- ❌ `backgroundColor` (일부 플랫폼)
- ❌ `padding`, `margin`

### 성능 최적화 팁
1. 가능한 경우 항상 `useNativeDriver: true` 사용
2. 레이아웃 속성(width, height) 대신 `transform` 사용
3. 많은 수의 애니메이션은 `useNativeDriver`로 최적화 필수
4. `requestAnimationFrame` 대신 Animated API 사용

---

## 📂 프로젝트 구조
```
RNAnimation/
├── src/
│   ├── chapter2/          # Animated 기초
│   ├── chapter3/          # Animated 심화 실습 ⭐
│   │   ├── Snackbar.tsx
│   │   ├── DrawerMenu.tsx
│   │   ├── Collapse.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Skeleton.tsx
│   │   └── SnowAnimation.tsx
│   └── utils/
│       └── data.js
├── App.tsx
└── README.md
```

---

## 📖 참고 자료
- [React Native Animated API 공식 문서](https://reactnative.dev/docs/animated)
- [React Native Easing 함수](https://reactnative.dev/docs/easing)
- [useNativeDriver 사용 가이드](https://reactnative.dev/docs/animations#using-the-native-driver)


*다음 챕터: LayoutAnimation, Interaction Manager, PanResponder 등이 추가될 예정입니다.*

