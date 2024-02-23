export interface ICoupon {
    _id: string;
   code:string;
   expirationDate:Date | null;
   discountPercentage:number;
   description:string;
  }