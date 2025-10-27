import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface CategoryHeaderProps {
  selectedCategory: number | undefined;
  setSelectedCategory: (category: number | undefined) => void;
  headerAnim: Animated.Value;
}
const CategoryHeader = ({
  selectedCategory,
  setSelectedCategory,
  headerAnim,
}: CategoryHeaderProps) => {
  // 휴식, 에너지 충전, 집중, 운동, 출퇴근/등하교 로 배열 만들어줘 변수명은 category
  const category = ['휴식', '에너지 충전', '집중', '운동', '출퇴근/등하교'];
  const onPressCategory = (index: number) => {
    const data = selectedCategory === index ? undefined : index;
    setSelectedCategory(data);
  };

  const getItemBackgroundColor = (index: number) => {
    return selectedCategory === index ? '#ffffff' : '#ffffff10';
  };
  const getItemTextColor = (index: number) => {
    return selectedCategory === index ? '#111' : 'white';
  };
  return (
    <View style={{}}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexDirection: 'row',
          paddingVertical: 20,
          paddingBottom: 5,
          borderBottomWidth: headerAnim.interpolate({
            inputRange: [0, 40],
            outputRange: [0, 0.5],
          }),
          borderBottomColor: '#555',
        }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {category.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => onPressCategory(index)}>
            <View
              style={{
                padding: 8,
                paddingHorizontal: 16,
                borderWidth: 0.5,
                backgroundColor: getItemBackgroundColor(index),
                borderColor: '#ffffff30',
                marginHorizontal: 4,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: getItemTextColor(index) }}>{item}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default CategoryHeader;
