export interface Picture{
  id?: number;
  lienImage: string;
}

export interface Housing{
  id?: number;
  title: string;
  description: string;
  numberOfRoom: number;
  numberOfPersson: number;
  washingMachine: boolean;
  piscine: boolean;
  diswasher: boolean;
  numberWC: number;
  adresse: string;
  numberBathroom:number;
}

export interface View{
  id?: number;
  name: string;
  description: string;
  note: number;
  id_user: number;
  replies: string;
}

export interface Store{
  id?: number;
  type: string;
  name: string;
  adresse: string;
  phone: string;

}

export interface Activity{
  id?: number;
  title: string;
  category: string;
  description: string
  picture: string;
  site: string;
  id_user?: number;
  thumbnailLink: "",
}
 export interface User{
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthdate: string;
  rôle?: string;

 }
export interface Reservation{
  id: number;
  startDate: string;
  endDate: string;
  priceTotal: number;
  numberOfAdult: number;
  numberOfChildren: number
  status?: string;
  id_user?: number;
  optionMenage: boolean;
}

export interface DateRange{
  startDate: string;
  enDate: Date;
}
