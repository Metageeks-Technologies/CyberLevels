import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { setFile } from "@/redux/features/globalSlice";
import { useAppDispatch } from "@/redux/hook";
import Image from "next/image";
import icon from "@/assets/images/icon/icon_11.svg";

const DropZone = ({
  showIcon,
  style,
  text,
}: {
  text: string;
  showIcon?: boolean;
  style?: string;
}) => {
  const dispatch = useAppDispatch();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      console.log(acceptedFiles[0]);
      dispatch(setFile(acceptedFiles[0]));
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className=" d-flex align-items-center">
          {showIcon && <Image src={icon} alt="icon" className="lazy-img" />}
          <span className={`fw-500 ms-2 ${style}`}>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default DropZone;