export interface Reservation {
  id: number;
  title: string;
  duration: string;
  region: string;
  departureDate: string;
  arrivalDate: string;
  meetingDate: string;
  meetingTime: string;
  meetingPlace: string;
  manager: string;
  reservationMaker: string;
  reservationMakerContact: string;
  importantDocs?: string;
  currencyInfo?: string;
  otherItems?: string;
  memo?: string;
  createdAt: string;
} 