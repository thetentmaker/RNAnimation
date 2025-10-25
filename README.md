# React Native Animation 학습

## 학습 목표

React Native에서 제공하는 다양한 애니메이션 기법을 학습하고 실무에 적용할 수 있는 능력을 기릅니다.

---

## 📖 목차

1. [Animated 심화 실습](#1-animated-심화-실습)
2. [PanResponder를 활용한 제스처 인식](#2-panresponder를-활용한-제스처-인식)
3. 유튜브 뮤직 클론 코딩 (예정)

---

## 1. Animated 심화 실습

React Native의 `Animated` API를 활용하여 다양한 UI 컴포넌트를 구현하는 실습입니다.

### 1.1 Snackbar 만들기

<img src="./screenshot/ch03_snackbar.jpg" width="200"/>

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

---

### 1.2 Drawer Menu 만들기

<img src="./screenshot/ch03_drawer_menu.jpg" width="200"/>

#### 📝 설명

왼쪽에서 슬라이드되어 나오는 Drawer 메뉴를 구현합니다. 메뉴 버튼을 누르면 메뉴가 나타나고, 배경 또는 닫기 버튼을 누르면 사라집니다.

#### 🎯 주요 학습 내용

- `translateX`를 활용한 가로 슬라이드 애니메이션
- `interpolate`로 여러 스타일 속성 동시 제어

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

---

### 1.3 Collapse 만들기

<img src="./screenshot/ch03_collapse.jpg" width="200"/>

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

---

### 1.4 Progress Bar 만들기

<img src="./screenshot/ch03_progress_bar.jpg" width="200"/>

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
    friction: 7, // 마찰력 (값이 클수록 빨리 멈춤)
    tension: 40, // 장력 (값이 클수록 빠르게 움직임)
    useNativeDriver: false,
  }).start();
  clickCount.current++;
};

// 자동 진행 (20% → 70% → 100%)
const onPressAutoRun = () => {
  Animated.sequence([
    Animated.spring(interpolateAnim, {
      toValue: 20,
      friction: 7,
      tension: 40,
      useNativeDriver: false,
    }),
    Animated.spring(interpolateAnim, {
      toValue: 70,
      friction: 7,
      tension: 40,
      useNativeDriver: false,
    }),
    Animated.spring(interpolateAnim, {
      toValue: 100,
      friction: 7,
      tension: 40,
      useNativeDriver: false,
    }),
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
/>;
```

---

### 1.5 Skeleton 로딩 UI 만들기

<img src="./screenshot/ch03_skeleton.jpg" width="200"/>

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
</Animated.View>;
```

---

### 1.6 눈 내리는 배경 만들기

<img src="./screenshot/ch03_snow.jpg" width="200"/>

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

---

## 🎓 학습 요약

### Animated API 핵심 메서드

| 메서드              | 설명                      | 사용 예제                         |
| ------------------- | ------------------------- | --------------------------------- |
| `Animated.timing`   | 시간 기반 선형 애니메이션 | Snackbar, Skeleton, SnowAnimation |
| `Animated.spring`   | 물리 기반 탄성 애니메이션 | ProgressBar                       |
| `Animated.sequence` | 애니메이션 순차 실행      | Snackbar, ProgressBar             |
| `Animated.loop`     | 애니메이션 무한 반복      | Skeleton, SnowAnimation           |
| `Animated.delay`    | 지연 시간 추가            | Snackbar, SnowAnimation           |

### interpolate 활용

`interpolate`는 하나의 Animated.Value를 다양한 범위로 변환할 때 사용합니다.

```tsx
// 숫자 변환
width: animValue.interpolate({
  inputRange: [0, 100],
  outputRange: [0, 300],
});

// 퍼센트 변환
width: animValue.interpolate({
  inputRange: [0, 100],
  outputRange: ['0%', '100%'],
});

// 색상 변환
backgroundColor: animValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['#ffffff', '#000000'],
});

// 각도 변환
rotate: animValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '180deg'],
});
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

---

## 2. PanResponder를 활용한 제스처 인식

React Native의 `PanResponder` API를 활용하여 사용자의 터치 제스처를 감지하고 인터랙티브한 UI를 구현하는 실습입니다.

### 2.1 공 던지기 애니메이션

<img src="./screenshot/ch06_ball.jpg" width="200"/>

#### 📝 설명

농구공을 드래그하여 던지는 애니메이션을 구현합니다. 공을 터치하여 드래그하면 따라 움직이고, 놓으면 관성에 따라 날아가다가 1.5초 후 원래 위치로 돌아옵니다.

#### 🎯 주요 학습 내용

- `PanResponder` 기본 사용법
- `Animated.ValueXY`로 2D 좌표 애니메이션
- `Animated.event`를 활용한 제스처 추적
- `Animated.decay`로 감속 효과 구현
- `gestureState.vx`, `gestureState.vy`로 속도 기반 물리 효과

#### 💻 핵심 코드

```tsx
// src/chapter6/PanResponderBall.tsx
const panAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

const panResponder = PanResponder.create({
  onMoveShouldSetPanResponder: () => true,
  
  // 터치 중(드래그)일 때 공 이동
  onPanResponderMove: Animated.event(
    [
      null,
      {
        dx: panAnim.x,
        dy: panAnim.y,
      },
    ],
    { useNativeDriver: false },
  ),
  
  // 터치 종료(드래그 종료)일 때 공 이동 및 감속
  onPanResponderEnd(e, gestureState) {
    Animated.decay(panAnim, {
      velocity: { x: gestureState.vx, y: gestureState.vy },
      deceleration: 0.997, // 감속 비율 (1에 가까울수록 천천히 멈춤)
      useNativeDriver: true,
    }).start();
  },
  
  // 1.5초 후 공이 제자리로 돌아오도록
  onPanResponderRelease(e, gestureState) {
    setTimeout(() => {
      panAnim.setValue({ x: 0, y: 50 });
      Animated.spring(panAnim, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }).start();
    }, 1500);
  },
});

// 공 UI
<Animated.View
  {...panResponder.panHandlers}
  style={{
    position: 'absolute',
    bottom: 20,
    transform: [{ translateX: panAnim.x }, { translateY: panAnim.y }],
  }}
>
  <Text style={{ fontSize: 100 }}>🏀</Text>
</Animated.View>
```

---

### 2.2 하단 모달 (Bottom Sheet)

<img src="./screenshot/ch06_modal.jpg" width="200"/>

#### 📝 설명

하단에서 올라오는 모달(Bottom Sheet)을 구현합니다. 버튼을 누르면 모달이 나타나고, 배경을 터치하거나 모달을 아래로 드래그하면 사라집니다.

#### 🎯 주요 학습 내용

- 드래그 방향 감지 (`gestureState.dy`)
- 조건부 제스처 처리 (일정 거리 이상 드래그 시)
- 배경 투명도 애니메이션과 모달 위치 동시 제어
- `useSafeAreaInsets`로 안전 영역 대응

#### 💻 핵심 코드

```tsx
// src/chapter6/PanResponderModal.tsx
const interpolateAnim = useRef(new Animated.Value(0)).current;
const [show, setShow] = useState(false);

const panResponder = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onPanResponderMove: (event, gestureState) => {
    // 아래로 100px 이상 드래그 시 모달 닫기
    if (gestureState.dy > 100) {
      hideMode();
    }
  },
});

const showMode = () => {
  setShow(true);
  Animated.timing(interpolateAnim, {
    toValue: 1,
    duration: 300,
    useNativeDriver: false,
  }).start();
};

const hideMode = () => {
  Animated.timing(interpolateAnim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  }).start(() => {
    setShow(false); // 애니메이션 완료 후 unmount
  });
};

// 배경 어둡게 처리
{show && (
  <Animated.View
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#00000090',
      opacity: interpolateAnim, // 0 → 1
    }}
  />
)}

// 모달 컨텐츠
<Animated.View
  {...panResponder.panHandlers}
  style={{
    position: 'absolute',
    bottom: interpolateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-500, 0], // 화면 아래 → 화면 하단
    }),
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  }}
>
  {/* 모달 내용 */}
</Animated.View>
```

---

### 2.3 배너 슬라이더 (Banner Slider)

<img src="./screenshot/ch06_banner_slider.jpg" width="200"/>

#### 📝 설명

좌우 스와이프로 넘어가는 배너 슬라이더를 구현합니다. 배너를 좌우로 드래그하거나 하단의 인디케이터를 클릭하여 페이지를 이동할 수 있습니다.

#### 🎯 주요 학습 내용

- 좌우 드래그 방향 감지 (`gestureState.dx`)
- 임계값 기반 페이지 전환 (80px 이상 드래그)
- 중복 실행 방지를 위한 `pending` 상태 관리
- 화면 너비 기반 슬라이드 애니메이션

#### 💻 핵심 코드

```tsx
// src/chapter6/PanResponderBannerSlider.tsx
const [focus, setFocus] = useState(0);
const bannerAnim = useRef(new Animated.Value(0)).current;
const pendingRef = useRef(true); // 애니메이션 중복 실행 방지

const { width } = Dimensions.get('window');

const panResponder = PanResponder.create({
  onMoveShouldSetPanResponder: () => true,
  onPanResponderMove: (event, gestureState) => {
    const toRight = gestureState.dx < -80; // 왼쪽으로 80px 이상 드래그
    const toLeft = gestureState.dx > 80;   // 오른쪽으로 80px 이상 드래그
    
    // 오른쪽 페이지로 이동
    if (toRight && pendingRef.current && focus < 3) {
      pendingRef.current = false;
      setFocus(focus + 1);
      Animated.timing(bannerAnim, {
        toValue: -(focus + 1) * width, // 다음 페이지 위치
        duration: 300,
        useNativeDriver: true,
      }).start(() => (pendingRef.current = true));
    } 
    // 왼쪽 페이지로 이동
    else if (toLeft && pendingRef.current && focus > 0) {
      setFocus(focus - 1);
      Animated.timing(bannerAnim, {
        toValue: -(focus - 1) * width, // 이전 페이지 위치
        duration: 300,
        useNativeDriver: true,
      }).start(() => (pendingRef.current = true));
    }
  },
});

// 배너 슬라이더 UI
<Animated.View
  {...panResponder.panHandlers}
  style={{
    flexDirection: 'row',
    transform: [{ translateX: bannerAnim }],
  }}
>
  {repeat(4, index => (
    <View key={index} style={{ width, height: width }}>
      <Text>{index}</Text>
    </View>
  ))}
</Animated.View>
```

---

### 2.4 폰트 크기 슬라이더 (Font Size Slider)

<img src="./screenshot/ch06_font_slider.jpg" width="200"/>

#### 📝 설명

드래그하여 폰트 크기를 조절하는 커스텀 슬라이더를 구현합니다. 슬라이더를 좌우로 드래그하거나 특정 위치를 클릭하여 폰트 크기를 변경할 수 있습니다.

#### 🎯 주요 학습 내용

- 드래그 중 실시간 위치 업데이트
- 드래그 종료 시 가장 가까운 단계로 스냅
- `Math.round`로 단계 계산
- 클릭과 드래그 동시 지원

#### 💻 핵심 코드

```tsx
// src/chapter6/PanResponderFontSlider.tsx
const BOX_SIZE = 50;
const CIRCLE_SIZE = 10;
const FONT = [
  { title: { fontSize: 20 }, body: { fontSize: 12 } },
  { title: { fontSize: 24 }, body: { fontSize: 14 } },
  { title: { fontSize: 30 }, body: { fontSize: 15 } },
  { title: { fontSize: 35 }, body: { fontSize: 19 } },
];

const circleAnim = useRef(new Animated.Value(0)).current;
const [step, setStep] = useState(0);

const panResponder = PanResponder.create({
  onMoveShouldSetPanResponder: () => true,
  onStartShouldSetPanResponder: () => true,
  
  // 드래그 시작: 현재 위치 저장
  onPanResponderStart: (event, gestureState) => {
    circleAnim.setValue(step * BOX_SIZE);
  },
  
  // 드래그 중: 실시간 위치 업데이트
  onPanResponderMove: (event, gestureState) => {
    circleAnim.setValue(gestureState.dx + step * BOX_SIZE);
  },
  
  // 드래그 종료: 가장 가까운 단계로 스냅
  onPanResponderEnd: (event, gestureState) => {
    const fontStep = step + Math.round(gestureState.dx / 50);
    const toValue = fontStep * BOX_SIZE;
    setStep(fontStep);
    
    Animated.spring(circleAnim, {
      toValue,
      friction: 7,
      tension: 50,
      useNativeDriver: true,
    }).start();
  },
});

// 슬라이더 UI
<Animated.View
  {...panResponder.panHandlers}
  style={{
    width: 10,
    height: 10,
    backgroundColor: '#333',
    borderRadius: 100,
    transform: [{ translateX: circleAnim }],
  }}
/>

// 폰트 적용
<Text style={FONT[step].title}>Font Step {step + 1}</Text>
<Text style={FONT[step].body}>font body style</Text>
```

---

## 🎓 PanResponder 학습 요약

### PanResponder 주요 이벤트

| 이벤트 | 설명 | 반환 값 |
| --- | --- | --- |
| `onStartShouldSetPanResponder` | 터치 시작 시 PanResponder를 활성화할지 결정 | boolean |
| `onMoveShouldSetPanResponder` | 터치 이동 시 PanResponder를 활성화할지 결정 | boolean |
| `onPanResponderStart` | 제스처가 시작될 때 호출 | void |
| `onPanResponderMove` | 터치가 이동할 때마다 호출 | void |
| `onPanResponderEnd` | 터치가 종료될 때 호출 (손가락을 뗌) | void |
| `onPanResponderRelease` | 제스처가 성공적으로 완료될 때 호출 | void |

---

## 📖 참고 자료

- [React Native Animated API 공식 문서](https://reactnative.dev/docs/animated)
- [React Native PanResponder 공식 문서](https://reactnative.dev/docs/panresponder)
- [React Native Easing 함수](https://reactnative.dev/docs/easing)
- [useNativeDriver 사용 가이드](https://reactnative.dev/docs/animations#using-the-native-driver)



# Continue...