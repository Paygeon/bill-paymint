import React, { useRef } from 'react';
import './styles.css';

interface FileUploadComponentProps {
    handleFileUpload: (file: File) => void;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({ handleFileUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handling a change in file uploaded
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            handleFileUpload(event.target.files[0]);
        }
    };

    // Handling choosing a file from file input
    const handleChooseFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div>
            <input type='file' accept='image/*, application/pdf' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
            <button onClick={handleChooseFile} className='custom-button' >
                Choose File
            </button>
        </div>

    );
};

export default FileUploadComponent;