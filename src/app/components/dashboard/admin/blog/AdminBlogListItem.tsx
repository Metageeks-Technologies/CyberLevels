import { IBlogPost } from '@/types/for-admin-type';
import { getDate } from '@/utils/helper';
import Link from 'next/link'
import React from 'react'
import ActionDropdown from '../adminBlogDropdown';
import AdminBlogEditModal from './AdminBlogEditModal';

const AdminBlogListItem = ({
    item,
    style_2 = false,
  }: {
    item: IBlogPost;
    style_2?: boolean;
  }) => {
    const isActive = false;
  return (
    <>
      <div
        className={`candidate-profile-card py-2  ${
          isActive ? "favourite" : ""
        } ${style_2 ? "border-0" : ""} list-layout mb-25 `}
      >
        <div className="d-flex">
          {/* <div className="cadidate-avatar online position-relative d-block me-auto ms-auto">
            <Link href="/candidate-profile-v2" className="rounded-circle">
              <Image
                src={job_img_1}
                alt="image"
                className="lazy-img rounded-circle"
              />
            </Link>
          </div> */}
          <div className="right-side justify-content-center ">
            <div className="row gx-1 align-items-center justify-content-center ">
              <div className="col-xl-3">
                <div className="position-relative">
                  <h4 className="candidate-name mb-0">
                    <Link href="/candidate-profile-v2" className="tran3s">
                      {item.title.substring(0,15)}...
                    </Link>
                  </h4>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="candidate-info">
                  {/* <span>{item.email}</span> */}
                  <div>{item.createdBy.name}</div>
                </div>
              </div>
              <div className="col-xl-2 col-md-4 col-sm-6">
                <div className="candidate-info">
                  <div>{getDate(item.createdAt.toString())}</div>
                </div>
              </div>
              
              <div className="col-xl-3 col-md-4">
                <div className="d-flex justify-content-lg-end">
                  <Link
                    target="_blank"
                    href={`/blog-details/${item._id}`}
                    className="profile-btn tran3s ms-md-2 mt-10 sm-mt-20"
                  >
                    View Blog
                  </Link>
                </div>
              </div>
              <div className="col">

          <div className="action-dots float-end">
          <button
            className="action-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
          </button>
          {/* action dropdown start */}
          <ActionDropdown id={item._id} />
          <AdminBlogEditModal />
          {/* <EditCompanyModal /> */}
          {/* action dropdown end */}
        </div>
              </div>
            </div>
          </div>
                  
        </div>
      </div>
    </>
  )
}

export default AdminBlogListItem;