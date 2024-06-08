import man_1 from "@/assets/images/assets/people-4.jpg";
import girl from "@/assets/images/assets/people-5.jpg";
import man_2 from "@/assets/images/assets/people-6.jpg";
import Image from "next/image";
import Link from "next/link";
// import shape from "@/assets/images/shape/shape_06.svg";
import shape from "@/assets/images/assets/ils_01_02.svg";

// FeatureImgData
export function FeatureImgData() {
  return (
    <div className="img-data position-relative pe-xl-5 me-xl-5 md-mt-50">
      <div className="row">
        <div className="col-md-6 col-sm-8 col-10">
          <Image
            src={man_1}
            width={321}
            height={197}
            alt="man img"
            className="lazy-img img01"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-5">
          <Image
            src={girl}
            width={195}
            height={175}
            alt="girl img"
            className="lazy-img img02 mt-35"
          />
        </div>
        <div className="col-md-6 col-7">
          <Image
            src={man_2}
            width={296}
            height={323}
            alt="man-img-2"
            className="lazy-img img01 mt-35"
          />
        </div>
      </div>
      {/* <Image
        src={screen_1}
        alt="screen_1-img"
        className="lazy-img shapes screen01 wow fadeInRight"
      />
      <Image
        src={screen_2}
        alt="screen_2-img"
        className="lazy-img shapes screen02 wow fadeInUp"
      />
      <Image
        src={screen_3}
        alt="screen_3-img"
        className="lazy-img shapes screen03 wow fadeInUp"
      /> */}
      <Image src={shape} alt="shape" className="lazy-img shapes shape_01" />
    </div>
  );
}

const FeatureOne = () => {
  return (
    <section className="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100 md-pt-80 pb-180 xl-pb-150">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 order-lg-last">
            <div className="ps-xxl-4 wow fadeInRight">
              <div className="title-one">
                <h3>Who we are?</h3>
              </div>
              <p className="mt-20 md-mt-20 mb-40 md-mb-20">
                Welcome to CyberLevels, the future of job searching and
                recruitment. We are an innovative AI-based job portal dedicated
                to transforming the way job seekers and employers connect. Our
                platform leverages cutting-edge artificial intelligence to match
                the right talent with the right opportunities, ensuring a
                seamless and efficient hiring process for all.
              </p>
              {/* <ul className="list-style-one style-none">
                <li>Seamless searching</li>
                <li>Get top 3% experts for your project</li>
                <li>Protected payments system</li>
              </ul> */}
              <div className="title-one">
                <h3>Our Mission</h3>
              </div>
              <p className="mt-20 md-mt-20 mb-40 md-mb-20">
                At CyberLevels, our mission is to bridge the gap between job
                seekers and employers by providing an intelligent, best AI based
                services , user-friendly, and efficient platform that
                revolutionizes the recruitment landscape. We aim to empower
                individuals by helping them find their dream jobs and to support
                companies in discovering the perfect candidates for their needs.
              </p>
              <div className="title-one">
                <h3>What We Do</h3>
              </div>
              <p className="mt-20 md-mt-20 mb-40 md-mb-20">
                We utilize advanced AI algorithms and machine learning
                techniques to analyze and understand job requirements, candidate
                skills, and market trends. Our platform offers:
              </p>
              <ul className="list-style-one style-none">
                <li>
                  <strong> Personalized Job Matches:</strong> Our AI-powered
                  system learns from your preferences and behavior to suggest
                  the most relevant job opportunities tailored just for you.
                </li>
                <li>
                  <strong> Efficient Recruitment:</strong> Employers can find
                  the best-fit candidates quickly and efficiently, thanks to our
                  intelligent matching algorithms that go beyond keywords to
                  understand the nuances of job descriptions and resumes
                </li>
                <li>
                  <strong> Comprehensive Job Listings:</strong> We aggregate job
                  postings from a wide range of industries and locations,
                  ensuring you have access to the most up-to-date and diverse
                  opportunities.
                </li>

                <li>
                  <strong> Comprehensive Job Listings:</strong> We aggregate job
                  postings from a wide range of industries and locations,
                  ensuring you have access to the most up-to-date and diverse
                  opportunities.
                </li>
              </ul>

              <div className="title-one mt-4">
                <h3>Our Values</h3>
              </div>

              <ul className="list-style-one style-none">
                <li>
                  <strong> Innovation: </strong> We are committed to constantly
                  improving and innovating our platform to stay ahead of the
                  curve in the ever-evolving job market.
                </li>
                <li>
                  <strong> Integrity:</strong> We operate with the highest
                  standards of integrity, ensuring transparency and honesty in
                  all our interactions.
                </li>
                <li>
                  <strong> Empowerment:</strong>We strive to empower individuals
                  and businesses alike, helping them achieve their goals through
                  our intelligent matching solutions.
                </li>

                <li>
                  <strong> Diversity:</strong> We celebrate diversity and
                  inclusivity, promoting equal opportunities for all job seekers
                  and creating a diverse talent pool for employers.
                </li>
              </ul>

              <div className="title-one mt-4">
                <h3>Join Us</h3>
              </div>
              <p className="mt-20 md-mt-20 mb-40 md-mb-20">
                Whether you are a job seeker looking for your next career move
                or an employer searching for top talent, CyberLevels is here to
                help you every step of the way. Join us today and experience the
                future of recruitment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureOne;
