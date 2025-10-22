import {
  FlatList,
  Text,
  View,
  ViewabilityConfigCallbackPair,
  ViewabilityConfigCallbackPairs,
  ViewToken,
} from 'react-native';
import { faker } from '@faker-js/faker';
import { useRef } from 'react';

type ItemProps = {
  item: string;
  index: number;
};
const Item = ({ item, index }: ItemProps) => {
  return (
    <View
      style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
    >
      <Text>{`${index}: ${item}`}</Text>
    </View>
  );
};
const FlatListCheckRenderItems = () => {
  // 텍스트 배열 타입의 useRef
  const rederedItems = useRef<string[]>([]);
  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>(
    [
      {
        onViewableItemsChanged: (info: {
          viewableItems: Array<ViewToken>;
          changed: Array<ViewToken>;
        }) => {
          console.log(info);
          const ViewableItems = info.viewableItems.map(item =>
            JSON.stringify(item),
          );
          ViewableItems.forEach(item => {
            if (rederedItems.current.findIndex(i => i === item) === -1) {
              console.log(`${item} is rendered`);
              rederedItems.current.concat(item);
            }
          });
        },
        viewabilityConfig: {
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 1000,
          waitForInteraction: true,
        },
      },
    ],
  );

  return (
    <View>
      <FlatList
        data={Array.from({ length: 40 }, () => faker.lorem.sentence())}
        renderItem={({ item, index }: ItemProps) => (
          <Item item={item} index={index} />
        )}
        keyExtractor={item => item}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  );
};

export default FlatListCheckRenderItems;
