import React from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';

function FileUpload() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
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
    </div>
  );
}

export default FileUpload;
