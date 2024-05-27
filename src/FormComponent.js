import React,{ useState } from "react";
import {Button, FileInput, TextInput} from 'flowbite-react';
import axios from 'axios';
import {nanoid} from 'nanoid';

export default function FormComponent() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
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
  const formData = new FormData();
  formData.append('id', nanoid());
  formData.append('text', input);
  formData.append('file', file);
  // use axios post request to send form data
  try {
    const response = await axios.post('/api/form', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("SUCCESS: ", response.data);
  } catch (error) {
    console.error("ERROR: Could not submit form");
  };
};
    return (
      <div className="min-h-screen bg-black flex ">
        <form id = 'form'className="flex max-w-md flex-col gap-4 p-8 bg-black" onSubmit={handleSubmit}>
            <div className = "container flex-row items-cente p-2">
                <label htmlFor="text" className="text-white text-sm mb-2">TextInput:</label>
                <TextInput id="input" type="text" className=" rounded bg-black border border-black"onChange={handleInputChange} />
            </div>
            <div className = "container flex-row p-2">
                <label htmlFor="file_upload" className="block text-white text-sm mb-2">FileInput: </label>
                <FileInput id="file" className="rounded text-white bg-black border" onChange={handleFileChange} />
            </div>
            <div className="p-2">
                <Button type="submit" className="border rounded ">Submit</Button>
            </div>
        </form>
      </div>
    );
  };
