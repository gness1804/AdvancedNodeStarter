import * as React from 'react';

const FileUpload = ({onFileChange}) => {
  const _onFileChange = (event) => {
    const file = event.target.files[0];
    onFileChange(file);
  }

  return (
    <div>
      <h6><strong>Add an Image</strong></h6>
      <input
        type="file"
        accept="image/*"
        onChange={_onFileChange}
      />
    </div>
  );
}

export default FileUpload;
