import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import translationsMap from "../locales/translationsMap";
import Sidebar from "./Sidebar";
import MainContentHeader from "./MainContentHeader";

function NewDeviceDetailsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigate = useNavigate();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [RoomList, setRoomList] = useState(""); // Initialize RoomList state

  const toggleSwitch = () => {
    setIsSwitchOn((prevState) => !prevState);
  };

  const { name, type } = useParams();

  // Handle RoomList change (for the dropdown)
  const handleRoomListChange = (e) => {
    setRoomList(e.target.value);
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here (e.g., sending data to DB)
    console.log("Form submitted with data:", {
      RoomList,
      isSwitchOn,
    });

    navigate(`/devices/new/${name}/test`);
  };

  // Handle the check validity button click
  const handleCheckValidity = (e) => {
    e.preventDefault();
    // Your custom validity check logic here
    console.log("Check validity action triggered");
    // No navigation occurs here
  };

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const translations = translationsMap[language] || translationsMap["en"];

  return (
    <div className="baseBG font-sans leading-normal tracking-normal h-screen overflow-hidden">
      <div className="p-2 grid grid-cols-[auto_1fr] h-full">
         <div className="relative flex">
          <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} language={language} />
         </div>
        {/* Main Content */}
        <div
          className={`main-content flex flex-col flex-1 transition-all duration-300 overflow-y-auto`}
        >
          <div className="px-4 grid grid-rows-[5rem_1fr] flex-1">
            {/* Main Content Header */}
            <MainContentHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} translations={translations} />
            
            {/* <!-- Main Content --> */}
            <div class="flex flex-col flex-1">
              {/* <!-- Main Content --> */}
              <div class="flex flex-col flex-1 gap-4">
                {/* Internet Usage Section */}
                <div className="grid grid-cols-[auto,1fr] items-center mt-5 w-full">
                  <a className="relative pl-4" href="/devices/new">
                    <i className="fa fa-2x fa-arrow-left"></i>
                  </a>
                  <h1 className="text-center lg:text-4xl w-full ml-[-5%]">
                    {name}
                  </h1>
                </div>

                {/* ==================== */}
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-rows-[auto,1fr] p-4 mt-2 gap-4 rounded-lg bg-white"
                >
                  <div className="grid sm:grid-cols-1 md:grid-cols-[auto,1fr] border border-gray-300 rounded-lg bg-white p-4 flex items-center justify-between">
                    {/* Label */}
                    <span className="text-lg font-medium text-gray-700">
                      {translations.enter_device_unique_serial_code}
                    </span>

                    {/* Input */}
                    <input
                      type="text"
                      className="border border-gray-300 rounded-lg p-2 ml-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={translations.enter_serial_code}
                    />
                  </div>

                  <div className="grid sm:grid-cols-1 md:grid-cols-[auto,1fr] border border-gray-300 rounded-lg bg-white p-4 flex items-center justify-between">
                    {/* Label */}
                    <span className="text-lg font-medium text-gray-700">
                      {translations.select_which_space_to_add_to}
                    </span>

                    {/* Dropdown */}
                    <select
                      className="ml-5 border border-gray-300 rounded-lg p-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={RoomList}
                      onChange={handleRoomListChange}
                    >
                      <option value="" disabled>
                        {translations.select}
                      </option>
                      {[
                        `${translations.living_room}`,
                        `${translations.kitchen}`,
                        `${translations.bedroom}`,
                        `${translations.bathroom}`,
                        `${translations.garage}`,
                      ].map((room) => (
                        <option key={room} value={room}>
                          {room}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-center items-center h-full w-full">
                    <div className="grid sm:grid-cols-1 md:grid-cols-[auto,1fr] border border-gray-300 rounded-lg bg-white p-4 w-[40%] flex items-center justify-between">
                      {/* Label */}
                      <button
                        onClick={handleCheckValidity}
                        className="text-lg font-medium text-gray-700"
                      >
                        {translations.check_validity}
                      </button>

                      {/* Switch */}
                      <div className="text-green-700 w-full h-full flex items-center justify-center">
                        {translations.valid}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 gap-4 flex justify-end">
                    <button
                      type="submit"
                      className="rounded-lg bg-black text-sm sm:text-base w-full mb-2 text-center sm:w-[15%] md:w-[15%] h-[3rem] flex justify-center items-center"
                    >
                      <div className="text-1xl text-white">
                        {translations.done}
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDeviceDetailsPage;
