import * as React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function Caro() {
  const width = Dimensions.get('window').width;
  const data = [
    {
      id: 1,
      name: 'All',
      image:
        'https://pcghana.org/wp-content/uploads/2022/06/epharmacy-1200x600.jpg',
    },
    {
      id: 2,
      name: 'Condoms',
      image:
        'https://ghanainsider.com/wp-content/uploads/2021/02/pharmacist.webp',
    },
    {
      id: 3,
      name: 'Contraceptives & Lubricants',
      image:
        'https://static.chitrangana.com/wp-content/uploads/2018/08/Chitrangana_Banner-1-01.png',
    },
  ];
  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={8000}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => (
          <View className="mx-3">
            <Image
              source={{uri: data[index].image}}
              className="w-full h-40 object-center object-cover rounded-lg m-4 "
            />
          </View>
        )}
      />
    </View>
  );
}

export default Caro;
