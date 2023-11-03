import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import { getMessages } from "@/redux/features/jobApp/api";
import Messenger from "../../dashboard/candidate/chat/messanger";
const ChatModal = () => {
  const { currUser, userRole } = useAppSelector((s) => s.persistedReducer.user);
  const { currJobApp } = useAppSelector((s) => s.jobApplication);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currJobApp) getMessages(dispatch, currJobApp);
  }, [currJobApp]);

  return (
    <div className="modal fade" id="chatModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container-fluid ">
          <div className="user-data-form modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="text-center">
              {/* <h3 className="mb-30">Chat With Employer</h3> */}
            </div>
            <button>Start Conversation</button>
            {/* chat */}
            <div className="form-wrapper m-auto container-fluid ">
              <Messenger />
            </div>
            {/* input  */}
            {/* <div className="buttonSvg pl-16 w-[50vw] flex">
              <input
                className="w-full text-white p-4 bg-gray-600 placeholder-[#D3D3D3] rounded-md"
                placeholder="Ask the PdfGpt"
                type="text"
                name="text"
                value={""}
                // onChange={(e) => setUserText(e.target.value)}
                id="questionInput"
              />

              <button
                // onClick={}
                id="sendButton"
                className="relative -left-20 pl-10"
              >
                <svg
                  stroke="#D3D3D3"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
