import React from 'react';
import { ScrollView } from 'react-native';
import Testimonial from './Testimonial'; 
import CustomCarousel from '../../custom/CustomCarousel';

const testimonialsData = [
  {
    name: 'Alice Johnson',
    role: 'Product Manager',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    review: 'This app changed the way I organize my tasks. Highly recommended!',
  },
  {
    name: 'Bob Smith',
    role: 'Developer',
    photo: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4,
    review: 'Great UI and easy to use. Just wish it had dark mode support.',
  },
  {
    name: 'Charlie Brown',
    photo: 'https://randomuser.me/api/portraits/men/33.jpg',
    rating: 3,
    review: 'It’s okay, but there are some bugs that need fixing.',
  },
  {
    name: 'Diana Prince',
    role: 'Designer',
    photo: 'https://randomuser.me/api/portraits/women/50.jpg',
    rating: 5,
    review: 'Love the clean design and intuitive experience!',
  },
];

const TestimonialsList = () => {
  return (
    <ScrollView>
      <CustomCarousel 
      data={testimonialsData.map((item, index) => ({ item, index }))}
      renderItem={({item, index}: {item: any, index: number}) =>
        <Testimonial
          name={item.name}
          role={item.role}
          photo={item.photo}
          rating={item.rating}
          review={item.review}
        />
      }
      height={258}
      width={320}
      autoPlayInterval={3000}
      loop={true}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      paginationDotStyle={{ backgroundColor: 'white', borderRadius: 50 }}
      paginationContainerStyle={{ gap: 5, }}
      style={{ marginBottom: 20 }}
      
       />
     
    </ScrollView>
  );
};

export default TestimonialsList;
