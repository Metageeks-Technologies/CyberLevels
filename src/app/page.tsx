"use client";
import { useEffect, useState } from "react";
import Header from "@/layouts/headers/header";
import HeroBanner from "./components/hero-banners/hero-banner";
import CategorySection from "./components/category/category-section";
import FeatureOne from "./components/features/feature-one";
import HowItWorks from "./components/how-it-works/how-it-works";
import ExpertsOne from "./components/experts/experts-one";
import FeedbackOne from "./components/feedBacks/feedback-one";
import FeatureTwo from "./components/features/feature-two";
import BlogOne from "./components/blogs/blog-one";
import FancyBanner from "./components/fancy-banner/fancy-banner";
import JobPortalIntro from "./components/job-portal-intro/job-portal-intro";
import FooterOne from "@/layouts/footers/footer-one";
import Wrapper from "@/layouts/wrapper";
import Pagination from "@/ui/pagination";
const text = "hello world";
const url =
  "https://www.naukri.com/job-listings-web-designer-php-laravel-internship-permanent-360-digital-idea-new-delhi-delhi-delhi-ncr-0-to-2-years-171023010795?src=drecomm_dashboard";
export default function Home() {
  return (
    <Wrapper>
      {/* header start */}
      <Header />
      {/* header end */}
      {/* hero banner start */}
      <HeroBanner />
      {/* hero banner end */}
      {/* category section start */}
      <CategorySection />
      {/* category section end */}
      <a
        target="_blank"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
      >
        share on Ln
      </a>
      <a
        target="_blank"
        href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
      >
        share on twitter
      </a>

      {/* feature one start */}
      <FeatureOne />
      {/* feature one end */}
      {/* how works start */}
      <HowItWorks />
      {/* how works end */}
      {/* expert one section start */}
      <ExpertsOne />
      {/* expert one section end */}
      {/* feedback one start */}
      <FeedbackOne />
      {/* feedback one end */}
      {/* text feature two start */}
      <FeatureTwo />
      {/* text feature two end */}
      {/* blog section one start */}
      <BlogOne />
      {/* blog section one end */}
      {/* fancy banner start */}
      <FancyBanner />
      {/* fancy banner end */}
      {/* job portal intro start */}
      <JobPortalIntro />
      {/* job portal intro end */}
      {/* footer start */}
      <FooterOne />
      {/* footer end */}
    </Wrapper>
  );
}
