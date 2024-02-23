export interface ICoupon {
    id: number;
   code:string;
   expirationDate:Date | null;
   discountPercentage:number;
   description:string;
  }