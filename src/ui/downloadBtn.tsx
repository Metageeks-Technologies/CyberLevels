import instance from "@/lib/axios";
import React from "react";

const ResumeDownloadButton = ({
  fileName,
  s3Key,
  text,
  style,
}: {
  fileName: string;
  s3Key: string;
  text?: string;
  style?: string;
}) => {
  const handleDownloadClick = async () => {
    const { data } = await instance.post("/candidate/download", { s3Key });
    const { data: resume } = await instance(data.url, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([resume]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button className={`${style ? style : ""}`} onClick={handleDownloadClick}>
        {text ? text : "Download"}{" "}
      </button>
    </div>
  );
};

export default ResumeDownloadButton;