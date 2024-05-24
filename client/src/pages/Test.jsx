import { useState } from "react";
import Model from "../components/Model";
import ProfilePicUploader from "../components/ProfilePicUploader";
import FileUploaderCard from "../components/FileUploaderCard";

export default function Test() {
    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    const [selectedFile, setSelectedFile] = useState(null);

    return (
        <div>
        <h1>Test Page</h1>

        {/* <ProfilePicUploader 
            isOpen={open} 
            onClose={onClose} 
            onOpen={onOpen} 
            selectedFile={selectedFile} 
            setSelectedFile={setSelectedFile} 
        /> */}

        <FileUploaderCard />
        <Model>
            <FileUploaderCard />
        </Model>
        </div>
    );
}