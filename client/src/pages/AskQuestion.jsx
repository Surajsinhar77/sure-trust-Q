import { useState } from "react";
import { FaUserCircle } from 'react-icons/fa';

const uploadImages = async (files, projectName) => {
  return ;
};


export default function Example(){
  const [spaceRef, setSpaceRef] = useState("");
  const [files, setFile] = useState([]);
  let nOffFeacture = [1];
  let nOffTechStack = [1];
  let AddMoreTechStack = () => {
    
  }
  const [formData, setFormData] = useState({
    projectName: "",
    dateStart: "",
    dateEnd: "",
    projectsTags: "",
    projectLink: "",
    githubLink: "",
    projectOverview: "",
    feature: [""],
    techStack: [""],
    imageFolderName: "",
    imageRef: "",
    youtubeLink: "",
  });
  
  // Handle image function
  const handleImage = (e) => {
    e.preventDefault();
    const file = e.target.files;
    setFile([...file]);
  }

  // Handle change function 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Save button function 
  function handleSave(e) {
  }



  // handle submit function
  async function handleSubmit(e) {
    console.log("Form Data : before api call", formData);
    // e.preventDefault();
    // try{
    //   const res = await axios.post('/api/dashboard', formData);
    //   if(res.status === 200){
    //     console.log("Response", res);
    //     alert("Project uploaded successfully");
    //     return ;
    //   }
    //   throw new Error("from the response part Error uploading project"); 
    // } catch (error) {
    //   console.log("Error", error);
    //   alert("Error uploading project");
    // }
  }

  return (
    <div className="flex justify-center items-center bg-white py-20">
      <div className="mx-auto max-w-2xl">
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Upload Project</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                {/* This is for the Project name   start */}
                <div className="sm:col-span-4">
                  <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">
                    Project Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">/projects/</span>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="projectName"
                        id="projectName"
                        autoComplete="projectName"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="janesmith"
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* This is for the Project name   End */}


                {/* PROJECT DURACTION  START */}
                <div className="sm:col-span-4">
                  <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">
                    Project Period
                  </label>

                  <div className="mt-2 flex gap-x-3">
                    {/* Input one */}
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md items-center pl-3">
                      <label className="font-semibold text-blue-700">Start data</label>
                      <input
                        onChange={handleChange}
                        type="date"
                        name="dateStart"
                        id="dateStart"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="janesmith"
                        required
                      />
                    </div>

                    {/* Input two */}

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md items-center pl-3">
                      <label className="font-semibold text-blue-700">End data</label>
                      <input
                        onChange={handleChange}
                        type="date"
                        name="dateEnd"
                        id="dateEnd"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="janesmith"
                        required
                      />
                    </div>
                  </div>
                </div>


                <div className="sm:col-span-4">
                  <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">
                    Project Domain
                  </label>

                  <div className="mt-2 flex gap-x-3">
                    {/* Input one */}
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md items-center pl-3">
                      <input
                        onChange={handleChange}
                        type="text"
                        name="projectsTags"
                        id="projectsTags"
                        autoComplete="projectsTags"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Web Development"
                        required
                      />
                    </div>

                    {/* Input two */}
                      {/* <button className="text-black px-3 border rounded">Add</button> */}
                  </div>
                </div>



                <div className="sm:col-span-6">
                  <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">
                    Project links
                  </label>

                  <div className="mt-2 flex gap-x-3">
                    {/* Input one */}
                    <div className="w-3/4 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md items-center pl-3">
                      <input
                        type="text"
                        onChange={handleChange}
                        name="projectLink"
                        id="projectLink"
                        autoComplete="projectLink"
                        className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Project link"
                        required
                      />
                    </div>
                    <div className="w-3/4 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md items-center pl-3">
                      <input
                        onChange={handleChange}
                        type="text"
                        name="githubLink"
                        id="githubLink"
                        autoComplete="githubLink"
                        className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Github link"
                        required
                      />
                    </div>
                    <div className="w-3/4 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md items-center pl-3">
                      <input
                        onChange={handleChange}
                        type="text"
                        name="youtubeLink"
                        id="youtubeLink"
                        autoComplete="youtubeLink"
                        className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Youtube link"
                        required
                      />
                    </div>
                  </div>
                </div>


                  <div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Project images
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <FaUserCircle className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input 
                            onChange={handleImage}
                            id="file-upload" 
                            name="ProjectImages" 
                            type="file" 
                            className="sr-only" 
                            multiple 
                            required
                          />
                        </label>
                        {/* {
                          files.forEach((file, index) => {
                            return <p key={index} className="pl-1">{file.name}</p>
                          })
                        } */}
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>


              </div>
            </div>


            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Project Discription</h2>
              {/*<p className="mt-1 text-sm leading-6 text-gray-600">Fill all possible field</p>*/}

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                    Project Overview
                  </label>
                  <div className="mt-2">
                    <textarea
                      onChange={handleChange}
                      id="projectOverview"
                      name="projectOverview"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                    />
                  </div>
                  {/*<p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about project.</p>*/}
                </div>


                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                      Key feature of yours Projects
                  </label>
                </div>

                
                  {nOffFeacture?.map((item, index) => 
                    <div className="sm:col-span-3" key={index}>
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Feature {index + 1}
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name={`feature-${index}`}
                          id="feature"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          required
                        />
                      </div>
                    </div>
                  )}
                    
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Button to add Feature
                  </label>
                  <div className="mt-2 bg-black  rounded-lg">
                    <button  
                      // onClick={AddMoreFeature}
                      className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"> Add more Feature</button>
                  </div>
                </div>

              {nOffTechStack.map((item, index) =>
                <div className="sm:col-span-4" key={index}>
                  <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">
                    Tech Stack
                  </label>

                  <div className="mt-2 flex gap-x-3">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md items-center pl-3">
                      <input
                        type="text"
                        name="techStack"
                        id={`techStack`}
                        autoComplete="techStack"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="React.js"
                        required
                      />
                    </div>
                      <button onClick={AddMoreTechStack} className="text-black px-3 border rounded">Add</button>
                  </div>
                </div>
              )}

              </div>
            </div>

            {/* <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                We'll always let you know about important changes, but you pick what else you want to hear about.
              </p>

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                  <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          // onChange={handleChange}
                          id="comments"
                          name="comments"
                          type="checkbox"
                          required
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="comments" className="font-medium text-gray-900">
                          Comments
                        </label>
                        <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          // onChange={handleChange}
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          required
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="candidates" className="font-medium text-gray-900">
                          Candidates
                        </label>
                        <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          required
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="offers" className="font-medium text-gray-900">
                          Offers
                        </label>
                        <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        required
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                        Everything
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        required
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                        Same as email
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        required
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                        No push notifications
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div> */}
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-3">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-200 ">
              Cancel
            </button>
            <button
              onClick={null}
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}