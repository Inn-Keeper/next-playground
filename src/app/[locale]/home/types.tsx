export interface Service {
    id: string;
    name: string;
    icon: string;
    description: string;
    price: number;
    image: string;
  }
  
  export interface ServicesResponse {
    items: Service[];
  }
  
  export interface Testimonial {
    id: string;
    name: string;
    role: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
    petName: string;
    petType: string;
  }