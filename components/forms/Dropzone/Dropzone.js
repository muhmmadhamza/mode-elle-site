import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { ConnectForm } from "../ConnectForm/ConnectForm";

const Wrapper = styled.div`
  height: 360px;
  position: relative;
  margin-right: 16px;
`;

const thumbsContainer = {};

const thumb = {
  borderRadius: 1,
  border: "1px solid #eaeaea",
  padding: 6,
  boxSizing: "border-box",
};

const thumbInner = {
  height: "360px",
};

const img = {
  height: "360px",
};

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const DropzoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  border-width: 2px;
  border-radius: 1px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.2s ease-in-out;
  text-align: center;
  max-width: 290px;
  height: 360px;

  em {
    font-size: 11px;
  }

  &:hover {
    cursor: pointer;
    border-color: #d8d8d8;
  }
`;

function DropzoneComponent(props) {
  const { setValue } = useFormContext();
  const [myFiles, setMyFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setMyFiles([
        ...myFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
      console.log(props.onChange);
      acceptedFiles.map((file) => {
        console.log("FILE PROPERTIES:", file);
        props.onChange((event) => {
          return file;
        });
      });
    },
    [myFiles]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: "image/jpeg, image/png, image/webp",
    maxFiles: 1,
    multiple: false,
    minSize: 1,
    maxSize: 15000000,
    onDrop,
  });

  const removeFile = (file) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);

    props.onChange((event) => {
      return "";
    });
  };

  const removeAll = () => {
    setMyFiles([]);
  };

  const thumbs = myFiles.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
      <button onClick={removeFile(file)}>Remove File</button>
    </div>
  ));

  console.log("field:", props.fieldState);

  return (
    <Wrapper key={props.registerName}>
      <div className="container">
        {myFiles.length === 0 ? (
          <DropzoneContainer
            {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
          >
            <input
              id={props.registerName}
              name={props.registerName}
              {...getInputProps()}
              {...props.field}
            />
            <p>Drag and drop a photo here, or click/tap to select</p>
            <em>Max. 15MB. Formats: jpg, png or webp.</em>
          </DropzoneContainer>
        ) : (
          <>
            <aside style={thumbsContainer}>{thumbs}</aside>
          </>
        )}
      </div>
    </Wrapper>
  );
}

export default DropzoneComponent;
