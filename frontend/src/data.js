import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'vinay',
      email: 'vinay@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'hr',
      email: 'hr@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    }
  ],
  products: [
    {
      name: 'Nike Slim shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: '/images/p1.jpg', // 679px × 829px
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      name: 'Adidas Fit Shirt',
      slug: 'adidas-fit-shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 250,
      countInStock: 20,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Nike Slim Pant',
      slug: 'nike-slim-pant',
      category: 'Pants',
      image: '/images/p3.jpg',
      price: 25,
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      name: 'Adidas Fit Pant',
      slug: 'adidas-fit-pant',
      category: 'Pants',
      image: '/images/p4.jpg',
      price: 65,
      countInStock: 5,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      "name": "goggles",
      "slug": "sunglasses",
      "category": "sunglasses",
      "image": "/images/p7.jpg",
      "price": 35,
      "countInStock": 15,
      "brand": "levis",
      "rating": 4.0,
      "numReviews": 10,
      "description": "high quality product"
    },
    {
      "name": "AC",
      "slug": "AC",
      "category": "AC",
      "image": "/images/p12.jpg",
      "price": 35,
      "countInStock": 15,
      "brand": "panasonic",
      "rating": 4.2,
      "numReviews": 10,
      "description": "avg quality product"
    },
  ],
};
export default data;