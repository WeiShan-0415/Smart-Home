import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import translationsMap from "../locales/translationsMap";
import Sidebar from "./Sidebar";
import MainContentHeader from "./MainContentHeader";

function CalendarPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const today = new Date();
  const [events, setEvents] = useState([]);
  const [eventDate, setEventDate] = useState(null); // Date object for event selection
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  // States for time components
  const [selectedHour, setSelectedHour] = useState(today.getHours());
  const [selectedMinute, setSelectedMinute] = useState(today.getMinutes());

  // Generate options for dropdowns
  const generateOptions = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
      (value) => (
        <option key={value} value={value}>
          {value.toString().padStart(2, "0")}
        </option>
      )
    );
  };

  // Switch
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  // Devices
  const devices = [
    {
      name: "xiaomi",
      type: "vacuum",
    },
    { name: "Daikin", type: "aircon" },
  ];

  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [favorites, setFavorites] = useState([]); // Favorite devices
  const [selectedDevices, setSelectedDevices] = useState([]); // Selected devices

  // Modal Handlers
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Toggle Favorite
  const toggleFavorite = (deviceName) => {
    setFavorites(
      (prevFavorites) =>
        prevFavorites.includes(deviceName)
          ? prevFavorites.filter((name) => name !== deviceName) // Remove from favorites
          : [...prevFavorites, deviceName] // Add to favorites
    );
  };

  // Toggle Selected State for Modal
  const toggleSelected = (deviceName) => {
    setSelectedDevices(
      (prevSelected) =>
        prevSelected.includes(deviceName)
          ? prevSelected.filter((name) => name !== deviceName) // Remove from selected
          : [...prevSelected, deviceName] // Add to selected
    );
  };

  // Add a new event
  const addEvent = () => {
    if (eventDate && eventTitle) {
      const eventDetails = new Date(eventDate);
      eventDetails.setHours(selectedHour, selectedMinute);

      // Get the list of selected devices (that are also favorited)
      const selectedFavoritedDevices = favorites.filter((device) =>
        selectedDevices.includes(device)
      );

      setEvents([
        ...events,
        {
          id: Date.now(),
          date: eventDetails,
          title: eventTitle,
          description: eventDescription,
          repeat: isOn, // Add the repeat state to the event
          devices: selectedFavoritedDevices, // Only include the selected devices
        },
      ]);

      // Reset input fields
      setEventDate(null);
      setSelectedHour(new Date().getHours());
      setSelectedMinute(new Date().getMinutes());
      setEventTitle("");
      setEventDescription("");
      setIsOn(false); // Reset the repeat switch
      setSelectedDevices([]); // Reset the selected devices state
    }
  };

  // Delete an event by ID
  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // translation
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const translations = translationsMap[language] || translationsMap["en"];

  return (
    <div className="baseBG font-sans leading-normal tracking-normal h-screen overflow-hidden">
      <div className="p-2 grid grid-cols-[auto_1fr] h-full">
        <div className="relative flex">
          <Sidebar
            isCollapsed={isCollapsed}
            toggleSidebar={toggleSidebar}
            language={language}
          />
        </div>

        {/* Main Content */}
        <div
          className={`main-content flex flex-col flex-1 transition-all duration-300 overflow-y-auto`}
        >
          <div className="px-4 grid grid-rows-[5rem_1fr] flex-1">
            {/* Main Content Header */}
            <MainContentHeader
              isCollapsed={isCollapsed}
              toggleSidebar={toggleSidebar}
              translations={translations}
            />

            {/* <!-- Main Content --> */}
            <div class="flex flex-col flex-1">
              {/* <!-- Main Content --> */}
              <div class="flex flex-col flex-1 gap-4">
                {/* Internet Usage Section */}
                <div className="grid grid-cols-[auto,1fr] items-center mt-5 w-full">
                  <a className="relative pl-4" href="/">
                    <i className="fa fa-2x fa-arrow-left"></i>
                  </a>
                  <h1 className="text-center md:text-4xl lg:text-4xl w-full ml-[-5%]">
                    {translations.calendar}
                  </h1>
                </div>

                {/* ==================== */}
                <div className="wrapper p-4">
                  <div className="container-calendar grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Section */}
                    <div
                      id="right"
                      className="flex items-center justify-center bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                      <div className="calendar-wrapper grid grid-rows-[auto] gap-4">
                        <DatePicker
                          selected={eventDate}
                          onChange={(date) => setEventDate(date)}
                          inline
                          dateFormat="yyyy-MM-dd"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />

                        {/* Time Selection */}
                        <div className="time-selection flex items-center space-x-4 flex items-center justify-center">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              {translations.hour}:
                            </label>
                            <select
                              value={selectedHour}
                              onChange={(e) =>
                                setSelectedHour(parseInt(e.target.value))
                              }
                              className="border border-gray-300 rounded p-2"
                            >
                              {generateOptions(0, 23)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              {translations.minute}:
                            </label>
                            <select
                              value={selectedMinute}
                              onChange={(e) =>
                                setSelectedMinute(parseInt(e.target.value))
                              }
                              className="border border-gray-300 rounded p-2"
                            >
                              {generateOptions(0, 59)}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - DatePicker */}
                    <div
                      id="left"
                      className="bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                      <div id="reminder-section">
                        <h3 className="text-xl font-semibold mb-3">
                          {translations.reminder}
                        </h3>
                        <ul id="reminderList" className="space-y-2">
                          {events.map((event) => (
                            <li
                              key={event.id}
                              className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                            >
                              <div>
                                <strong className="block text-sm font-bold">
                                  {event.title}
                                </strong>
                                <span className="text-sm text-gray-600">
                                  {event.description} on{" "}
                                  {new Date(event.date).toLocaleDateString()} at{" "}
                                  {new Date(event.date).toLocaleTimeString()}
                                </span>

                                {/* Conditionally render repeat status */}
                                {event.repeat && (
                                  <div className="text-sm text-green-600 mt-2">
                                    <strong>Repeat: </strong> This event is set
                                    to repeat.
                                  </div>
                                )}

                                {/* Conditionally render devices */}
                                {event.devices && event.devices.length > 0 && (
                                  <div className="mt-2">
                                    <strong className="block text-sm font-bold">
                                      Selected Devices:
                                    </strong>
                                    <ul className="list-disc pl-4">
                                      {event.devices.map((device, index) => (
                                        <li
                                          key={index}
                                          className="text-sm text-gray-700"
                                        >
                                          {device}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>

                              <button
                                className="delete-event text-red-500 hover:text-red-700 text-sm"
                                onClick={() => deleteEvent(event.id)}
                              >
                                Delete
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Event Form */}
                  <div className="event-form bg-gray-100 p-4 mt-4 rounded-lg shadow-md grid grid-cols-[auto, 1fr, auto] gap-4">
                    <div className="grid grid-rows-[auto] space-y-3">
                      <h3 className="text-xl font-semibold mb-3">
                        {translations.add_event}
                      </h3>
                      <input
                        type="text"
                        placeholder={translations.event_title}
                        className="w-full border border-gray-300 rounded p-2"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                      />
                      <textarea
                        placeholder={translations.event_description}
                        className="w-full border border-gray-300 rounded p-2"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                      ></textarea>

                      {/* ======================== */}
                      <div className="flex items-center space-x-4">
                        {/* Switch */}
                        <div
                          className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                            isOn ? "bg-green-500" : "bg-gray-400"
                          }`}
                          onClick={toggleSwitch}
                        >
                          <div
                            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                              isOn ? "translate-x-6" : "translate-x-0"
                            }`}
                          ></div>
                        </div>
                        {/* Label */}
                        <span className="text-lg font-medium">
                          {isOn
                            ? `${translations.on_repeat}`
                            : `${translations.off_repeat}`}
                        </span>
                      </div>
                      {/* ======================== */}

                      <div className="grid grid-rows-[auto] border border-gray-300 bg-white rounded-lg">
                        <div className="grid grid-cols-2">
                          {/* Left Section */}
                          <h3 className="text-xl font-semibold m-5">
                            {translations.select_device}
                          </h3>

                          {/* Right Section */}
                          <div className="p-4 flex justify-end items-center">
                            {/* Trigger Button */}
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                              onClick={openModal}
                            >
                              {translations.view_all}
                            </button>

                            {/* Modal */}
                            {isOpen && (
                              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white w-11/12 max-w-3xl p-6 rounded-lg shadow-lg">
                                  {/* Header */}
                                  <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">
                                      View All Items
                                    </h2>
                                    <button
                                      className="text-gray-500 hover:text-gray-700 transition"
                                      onClick={closeModal}
                                    >
                                      <i className="fas fa-times"></i>
                                    </button>
                                  </div>

                                  {/* Content */}
                                  <div className="overflow-y-auto max-h-96">
                                    <ul className="space-y-4">
                                      {devices.map((device) => (
                                        <li
                                          key={device.name}
                                          className={`p-4 rounded-lg shadow-sm transition flex justify-between items-center ${
                                            selectedDevices.includes(
                                              device.name
                                            )
                                              ? "bg-blue-200"
                                              : "bg-gray-100 hover:bg-gray-200"
                                          }`}
                                        >
                                          <div className="relative w-full">
                                            <span>
                                              {device.name} ({device.type})
                                            </span>

                                            {/* Green Check Mark for Selected Devices */}
                                            {selectedDevices.includes(
                                              device.name
                                            ) && (
                                              <div className="absolute top-0 right-0 bg-green-500 text-white rounded-full p-1">
                                                <i className="fas fa-check"></i>
                                              </div>
                                            )}
                                          </div>

                                          <button
                                            onClick={() =>
                                              toggleFavorite(device.name)
                                            }
                                            className={`text-sm px-3 py-1 rounded-md ${
                                              favorites.includes(device.name)
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-300 text-black"
                                            }`}
                                          >
                                            {favorites.includes(device.name)
                                              ? translations.favorited
                                              : translations.favorite}
                                          </button>

                                          <button
                                            onClick={() =>
                                              toggleSelected(device.name)
                                            }
                                            className={`text-sm px-3 py-1 rounded-md ml-2 ${
                                              selectedDevices.includes(
                                                device.name
                                              )
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-300 text-black"
                                            }`}
                                          >
                                            {selectedDevices.includes(
                                              device.name
                                            )
                                              ? translations.deselect
                                              : translations.select}
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2 justify-center items-center p-3">
                          {/* Dynamically added blocks for Selected Devices */}
                          {selectedDevices.map((selectedDevice) => (
                            <div
                              key={selectedDevice}
                              className="rounded-lg border-[2px] border-gray-300 bg-white flex flex-col justify-center items-center p-3 cursor-pointer"
                              onClick={() => toggleSelected(selectedDevice)} // Toggle selection when clicked
                            >
                              <div className="grid sm:grid-cols-1 items-center gap-4 p-4">
                                <img
                                  src=""
                                  alt=""
                                  className="border border-black rounded-lg mb-4 mx-auto"
                                  style={{ height: "100px", width: "100px" }}
                                />
                                <div className="relative w-full">
                                  <div className="grid grid-rows-3 teal-text text-sm sm:text-base w-full mb-2 text-center">
                                    <div className="mb-2">{selectedDevice}</div>
                                  </div>

                                  {/* Green Check Mark for Selected Devices */}
                                  <div className="absolute top-0 right-0 bg-green-500 text-white rounded-full p-1">
                                    <i className="fas fa-check"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Message if no selected devices */}
                          {selectedDevices.length === 0 && (
                            <p className="text-gray-500 col-span-4 text-center">
                              {translations.no_selected_devices}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* ======================== */}

                      <button
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                        onClick={addEvent}
                      >
                        {translations.add_event}
                      </button>
                    </div>

                    {/* <div className="space-y-3">
                      <h3 className="text-xl font-semibold mb-3">
                        {translations.generate_report}
                      </h3>
                      <a href="/calendar/report">
                        <div className="rounded-lg border-[2px] border-gray-300 bg-white flex flex-col bg-white p-3 rounded-lg">
                          <div className="items-center gap-4">
                            <div className="teal-text text-sm sm:text-base w-full mb-2 text-center">
                              <div className="mb-2">
                                {translations.choose_date}
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
