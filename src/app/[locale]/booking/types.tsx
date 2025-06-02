export interface FormDataBooking {
    name: string;
    email: string;
    specialRequests: string;
    dateCheckIn: Date | null;
    dateCheckOut: Date | null;
    services: Service[];
    petName: string;
    petBreed: string;
    petAge: string;
    petWeight: string;
  }
  
  export interface Service {
    id: string;
    name: string;
    icon: string;
    description: string;
    price: number;
  }
  
  export interface ServicesResponse {
    items: Service[];
  }