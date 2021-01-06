import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

function FileUpload() {
  const [Images, setImages] = useState([]);
  const dropHandler = files => {
    let formData = new FormData();

    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/product/image', formData, config).then(response => {
      if (response.data.success) {
        console.log(response.data);
        setImages([...Images, response.data.filePath]);
      } else {
        alert('파일 저장 실패');
      }
    });
  };

  const onClickDelete = e => {
    console.log(e.currentTarget);
    console.log(Images);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: '1px solid lightgray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div>
                <PlusOutlined
                  style={{ fontSize: '2.5rem', color: 'darkgray' }}
                />
              </div>
            </div>
          </section>
        )}
      </Dropzone>

      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'scroll',
          overflowY: 'hidden',
        }}
      >
        {Images.map((item, index) => (
          <img
            key={index}
            style={{
              minWidth: '300px',
              width: '300px',
              height: '240px',
              margin: '0px 20px',
            }}
            src={`http://localhost:5000/${item}`}
            onClick={onClickDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
