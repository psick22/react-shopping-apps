import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

function FileUpload({ refreshFunction }) {
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
        const newImages = [...Images, response.data.filePath];
        setImages(newImages);
        refreshFunction(newImages);
      } else {
        alert('파일 저장 실패');
      }
    });
  };

  const onClickDelete = index => {
    const newImages = [...Images];
    newImages.splice(index, 1);
    setImages(newImages);
    refreshFunction(newImages);
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
            onClick={() => onClickDelete(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
