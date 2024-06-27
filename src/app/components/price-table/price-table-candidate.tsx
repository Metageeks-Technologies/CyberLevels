import React, { useState, useEffect } from "react";

type StripePlansProps = {
  userId: string;
};

const StripeCandidatePlans: React.FC<StripePlansProps>  = ({userId}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  console.log("pricing table",process.env.NEXT_PUBLIC_STRIPE_CANDIDATE_PRICING_TABLE_ID);
  console.log("publishable key",process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  console.log("client reference id",userId);
  return React.createElement("stripe-pricing-table", {
    "pricing-table-id": process.env.NEXT_PUBLIC_STRIPE_CANDIDATE_PRICING_TABLE_ID,
    "publishable-key": process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    "client-reference-id": userId,
  });
};

export default StripeCandidatePlans;
