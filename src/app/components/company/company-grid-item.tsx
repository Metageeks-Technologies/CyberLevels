import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ICompany } from "@/types/company";
import team_img_1 from "@/assets/images/assets/img_42.png";
// item.isFav

const CompanyGridItem = ({ item }: { item: ICompany }) => {
  return (
    <div className={`company-grid-layout ${false ? "favourite" : ""} mb-30`}>
      <Link
        href="/company-details"
        className="company-logo me-auto ms-auto rounded-circle"
      >
        <Image
          src={team_img_1}
          alt="image"
          className="lazy-img rounded-circle"
        />
      </Link>
      <h5 className="text-center">
        <Link href="/company-details" className="company-name tran3s">
          {item.name}
        </Link>
      </h5>
      <p className="text-center mb-auto">
        {item.location[0].city}, {item.location[0].country}
      </p>
      <div className="bottom-line d-flex">
        <Link href="/company-details">{item.benefits.length} Vacancy</Link>
        <Link href="/company-details">
          <i className="bi bi-bookmark-dash"></i> Save
        </Link>
      </div>
    </div>
  );
};

export default CompanyGridItem;
