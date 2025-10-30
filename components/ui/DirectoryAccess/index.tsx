import { FC, MouseEvent } from "react";
import { Box } from "@mui/material";
import Inbox from "../../../assets/images/Inbox.png";
import "./index.scss";

type DirectoryAccessType = {
  onSelect: Function;
};

declare global {
  interface Window {
    showDirectoryPicker?: any;
  }
}

const DirectoryAccess: FC<DirectoryAccessType> = ({
  onSelect,
}: DirectoryAccessType) => {
  const openDirectory = async (mode = "read") => {
    // Feature detection. The API needs to be supported
    // and the app not run in an iframe.
    const supportsFileSystemAccess =
      "showDirectoryPicker" in window &&
      (() => {
        try {
          return window.self === window.top;
        } catch {
          return false;
        }
      })();
    // If the File System Access API is supported…
    if (supportsFileSystemAccess) {
      let directoryStructure = undefined;

      // Recursive function that walks the directory structure.
      const getFiles: any = async (dirHandle: any, path = dirHandle.name) => {
        const dirs = [];
        const files = [];
        for await (const entry of dirHandle.values()) {
          const nestedPath = `${path}/${entry.name}`;
          if (entry.kind === "file") {
            files.push(
              entry.getFile().then((file: any) => {
                file.directoryHandle = dirHandle;
                file.handle = entry;
                return Object.defineProperty(file, "webkitRelativePath", {
                  configurable: true,
                  enumerable: true,
                  get: () => nestedPath,
                });
              })
            );
          } else if (entry.kind === "directory") {
            dirs.push(getFiles(entry, nestedPath));
          }
        }
        return [
          ...(await Promise.all(dirs)).flat(),
          ...(await Promise.all(files)),
        ];
      };

      try {
        // Open the directory.
        const handle = await window.showDirectoryPicker();
        // Get the directory structure.
        onSelect(handle?.name);
        directoryStructure = getFiles(handle, undefined);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err.name, err.message);
        }
      }
      return directoryStructure;
    }
    // Fallback if the File System Access API is not supported.
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.webkitdirectory = true;

      input.addEventListener("change", () => {
        // let files = Array.from(input.files);
        // resolve(files);
      });
      if ("showPicker" in HTMLInputElement.prototype) {
        input.showPicker();
      } else {
        input.click();
      }
    });
  };
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    openDirectory();
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
        <Box className="upload-button" onClick={handleClick}>
          <img src={Inbox} alt="v" width={48} height={48} />
          <p className="directory-path">Select Directory</p>
        </Box>
      </form>
    </Box>
  );
};

export default DirectoryAccess;
