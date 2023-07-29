import * as React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function Caro() {
  const width = Dimensions.get('window').width;
  const data = [
    {
      id: 1,
      name: 'All',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      name: 'Condoms',
      image:
        'https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBoYXJtYWN5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 3,
      name: 'Contraceptives & Lubricants',
      image:
        'https://images.unsplash.com/photo-1576091358783-a212ec293ff3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
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
          <Image
            source={{uri: data[index].image}}
            className="w-full h-40 object-center object-cover rounded-lg m-4 shadow-lg "
          />
        )}
      />
    </View>
  );
}

export default Caro;
