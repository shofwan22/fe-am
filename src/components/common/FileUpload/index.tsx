import { useState } from 'react';
import './styles.css';
import type { FileUploadProps } from './types';

const FileUpload = (props: FileUploadProps) => {
  const { onChange } = props;
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onChange(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="file-upload">
      <input type="file" accept="image/*" onChange={handleFile} />
      {preview && <img src={preview} alt="preview" width={100} />}
    </div>
  );
};

export default FileUpload;
