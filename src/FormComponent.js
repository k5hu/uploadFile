import React,{ useState } from "react";
import {Button, FileInput, TextInput} from 'flowbite-react';

export default function FormComponent() {
    return (
      <div className="min-h-screen bg-black flex ">
        <form id = 'form'className="flex max-w-md flex-col gap-4 p-8 bg-black ">
            <div className = "container flex-row items-cente p-2">
                <label htmlFor="text" className="text-white text-sm mb-2">TextInput:</label>
                <TextInput id="text" type="text" className=" rounded bg-black border border-black" />
            </div>
            <div className = "container flex-row p-2">
                <label htmlFor="file_upload" className="block text-white text-sm mb-2">FileInput: </label>
                <FileInput id="file_upload" className="rounded" />
            </div>
            <div className="p-2">
                <Button type="submit" className="border rounded">Submit</Button>
            </div>
        </form>
      </div>
    );
  };
