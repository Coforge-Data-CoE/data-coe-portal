import React, { SyntheticEvent, FC, MutableRefObject, useRef } from "react";
import Inbox from "../../../assets/images/Inbox.png";
import { Box } from "@mui/material";
import "./index.scss";
import Input from "../Input";

type FileUploadType = {
  text1: string;
  text2: string;
  getFile: Function;
  name: string;
};

const FileUpload: FC<FileUploadType> = ({
  text1,
  text2,
  getFile,
  name,
}: FileUploadType) => {
  const hiddenFileInputRef = useRef<MutableRefObject<HTMLInputElement>>(null);
  const processFiles = (event: SyntheticEvent) => {
    const inputFileElement: any = event?.target as HTMLInputElement;
    const file = inputFileElement?.files[0];
    const extension = file?.name.split(".");
    if (extension[extension.length - 1] !== "json") {
      alert("file should only json format");
    }
    getFile({
      target: {
        name: inputFileElement?.name,
        value: file,
      },
    });
  };
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    const inputFileElement: any = hiddenFileInputRef?.current;
    inputFileElement?.click();
  };
  return (
    <Box
      sx={{
        width: "100%",
        mt: "20px",
        backgroundColor: "#fafafa",
        border: "1px solid #d9d9d9",
        display: "flex",
        justifyContent: "center",
        borderRadius: "3px",
      }}
    >
      <form className="file-upload-form">
        <Input
          type="file"
          onChange={processFiles}
          inputRef={hiddenFileInputRef}
          name={name}
          style={{ display: "none" }}
        />
        <Box className="upload-button" onClick={handleClick}>
          <img src={Inbox} alt="v" width={48} height={48} />
          <p className="drag-file">{text1}</p>
          <p className="only-json">{text2}</p>
        </Box>
      </form>
    </Box>
  );
};

export default FileUpload;
