import React, { useState } from "react";
import { Link } from "react-router-dom";
import translationsMap from "../components/locales/translationsMap";

function RoomsRobots() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState(""); // Track animation
  const [tempIndex, setTempIndex] = useState(currentIndex); // Temporary index for animation
  const [rooms, setRooms] = useState([
    { img: "/image/living_room.jpg", name: "Living Room" },
    { img: "/image/kitchen.jpg", name: "Kitchen" },
    { img: "/image/bathroom.jpg", name: "Bathroom" },
    { img: "/image/master.jpg", name: "Master" },
    { img: "/image/guest.jpeg", name: "Guest Room" },
    { img: "/image/study.jpg", name: "Study" },
    { img: "/image/garage.jpg", name: "Garage" },
    { img: "/image/plus.png", name: "Add Room" },
  ]);

  const totalPages = Math.ceil(rooms.length / 4);
  const currentPage = Math.floor(currentIndex / 4);

  const prevItems = () => {
    if (currentIndex === 0) return;
    setAnimationClass("animate-slide-in-prev");
    setTempIndex(currentIndex - 4);
  };

  const nextItems = () => {
    if (currentIndex + 4 >= rooms.length) return;
    setAnimationClass("animate-slide-in-next");
    setTempIndex(currentIndex + 4);
  };

  const handleAnimationEnd = () => {
    setAnimationClass("");
    setCurrentIndex(tempIndex);
  };

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const translations = translationsMap[language] || translationsMap["en"];

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[3fr,1.2fr] p-4 gap-4">
      {/* Rooms Section */}
      <div className="rounded-lg p-4 baseGreen2 mb-4 relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-bold mb-2">
            {translations.rooms}
          </h2>
        </div>

        <div className="transition-all duration-500 ease-in-out">
          <div
            className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500 ease-in-out ${animationClass}`}
            onAnimationEnd={handleAnimationEnd}
          >
            {rooms.slice(tempIndex, tempIndex + 4).map((room, index) => (
              <div
                key={index}
                className="bg-white rounded-lg mb-4 p-4 flex flex-col justify-end"
              >
                <div className="flex justify-center items-center mb-4 h-[170px]">
                  <Link to={room.name === "Add Room" ? "/rooms/new" : `/rooms/devices/${room.name}`}>
                    <img
                      src={room.img}
                      alt={room.name}
                      className="rounded-lg object-contain cursor-pointer"
                      style={{ maxHeight: "100%" }}
                    />
                  </Link>
                </div>
                <Link to={room.name === "Add Room" ? "/rooms/new" : `/rooms/devices/${room.name}`}>
                  <div className="relative bg-white text-gray-800 rounded-full text-sm py-2 px-4 flex justify-center items-center cursor-pointer">
                    {room.name}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`text-2xl ${index === currentPage ? "teal-text" : "text-white"}`}
            >
              •
            </span>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-y-1/2 w-[95%] flex justify-between items-center">
          <button
            onClick={prevItems}
            disabled={currentIndex === 0}
            className="bg-white text-gray-800 p-2 rounded-full"
          >
            <i className={"fas fa-chevron-left"}></i>
          </button>
          <button
            onClick={nextItems}
            disabled={currentIndex + 4 >= rooms.length}
            className="bg-white text-gray-800 p-2 rounded-full"
          >
            <i className={"fas fa-chevron-right"}></i>
          </button>
        </div>
      </div>

      {/* Track Robot Section */}
      <div className="baseGreen2 rounded-lg mb-4 p-4 flex flex-col justify-center">
        <img
          src="/image/robot.jpg"
          alt="Robot"
          className="rounded-lg mb-4"
          style={{ height: "300px" }}
        />
        <a href="/robots">
          <div className="relative bg-white text-gray-800 rounded-full text-[12px] md:text-[15px] lg:text-[18px] py-2 px-4 flex justify-center items-center cursor-pointer">
            {translations.trackRobot}
          </div>
        </a>
      </div>
    </div>
  );
}

export default RoomsRobots;
