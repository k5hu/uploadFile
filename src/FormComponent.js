import React,{ useState } from "react";
import {Button, FileInput, TextInput} from 'flowbite-react';
import {nanoid} from 'nanoid';
import AWS, { LexRuntime } from 'aws-sdk';
const s3 = new AWS.S3();

export default function FormComponent() {
  const [input, setInput] = useState("");
  const [fileInput, setFile] = useState(null);
  // handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value); // Update the text state
};
// handle file change
const handleFileChange = (e) => {
  setFile(e.target.files[0]); // Update the file state
};

// handle submit button, push all info to backend
const handleSubmit = async(e) => {
  e.preventDefault();
  // ----- get a presigned url from lambda -----
  const file = fileInput.files[0];
  const fileName = file.name;
  const contentType = file.type;
  const response = await fetch('https://7luh6x4oke.execute-api.us-west-2.amazonaws.com/test/generate-presigned-url?fileName=${encodeURIComponent(fileName)}&contentType=${encodeURIComponent(contentType)}');
  const data = await response.json();
  const url = data.url;

  console.log(url)
  // ----- put the file direclty to the s3 bucket with presigned url ----
  const uploadResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      
    },
    body: file,
  });

  // ---- store metadata in dynamodb ----
  // 1. get bucket name and input_file_path
  let urlObject = new URL(url);
  const host = urlObject.host;
  const parts = host.pathname.split('.');
  const bucketName = parts[0];
  const input_file_path = bucketName + '/' + fileName;

  // 2. store metadata in dynamodb
  const metadata = {
    id: nanoid(),
    input_text: input,
    input_file_path: input_file_path,
  }
  const metadataResponse = await fetch('https://7luh6x4oke.execute-api.us-west-2.amazonaws.com/test/store-metadata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
});

  
};
    return (
      <div className="min-h-screen bg-black flex ">
        <form id = 'form'className="p-4" onSubmit={handleSubmit}>
            <div className = "container flex-row items-center mb-4">
                <label htmlFor="text" className="block text-white mb-2">TextInput:</label>
                <TextInput id="input" type="text" className="w-full" onChange={handleInputChange} />
            </div>
            <div className = "container flex-row mb-4">
                <label htmlFor="file_upload" className="block text-white mb-2">FileInput: </label>
                <FileInput id="fileInput" className="w-full mb-2 " onChange={handleFileChange} />
            </div>
            <div>
                <Button type="submit" className="border border-white text-white font-large me-2 mb-2 px-1.5 hover:bg-white hover:text-black w-1/5">Submit</Button>
            </div>
        </form>
      </div>
    );
  };
