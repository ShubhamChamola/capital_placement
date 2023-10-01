import Filters from "./components/Filters";
import Search from "./components/Search";
import { Select } from "antd";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";
import users from "../users";

const icons: React.ReactNode[] = [
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path
      d="M12.9601 5.28003L19.3426 11.6625C20.1001 12.42 20.1001 13.6425 19.3426 14.4L13.7701 19.9725C13.0126 20.73 11.7901 20.73 11.0326 19.9725L4.65008 13.59C4.29008 13.23 4.08008 12.735 4.08008 12.225V6.65253C4.08008 5.58753 4.95008 4.71753 6.01508 4.71753H11.5876C12.1051 4.71753 12.6001 4.92003 12.9601 5.28003Z"
      stroke="#444444"
      stroke-width="0.7"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.5801 10.2525C9.15585 10.2525 9.6226 9.7858 9.6226 9.21004C9.6226 8.63428 9.15585 8.16754 8.5801 8.16754C8.00434 8.16754 7.5376 8.63428 7.5376 9.21004C7.5376 9.7858 8.00434 10.2525 8.5801 10.2525Z"
      stroke="#444444"
      stroke-width="0.7"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path
      d="M15 19C15 16.7909 12.3137 15 9 15C5.68629 15 3 16.7909 3 19M17 14L21 10M17 10L21 14M9 12C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8C13 10.2091 11.2091 12 9 12Z"
      stroke="#A80000"
      stroke-width="0.7"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path
      d="M15 19C15 16.7909 12.3137 15 9 15C5.68629 15 3 16.7909 3 19M21 10L17 14L15 12M9 12C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8C13 10.2091 11.2091 12 9 12Z"
      stroke="#0B0B0B"
      stroke-width="0.7"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path
      d="M15 19C15 16.7909 12.3137 15 9 15C5.68629 15 3 16.7909 3 19M16.8281 5.17163C17.1996 5.54307 17.4942 5.98402 17.6952 6.46932C17.8962 6.95463 17.9998 7.47469 17.9998 7.99997C17.9998 8.52526 17.8963 9.04543 17.6953 9.53073C17.4943 10.016 17.1996 10.457 16.8281 10.8285M19 3C19.6566 3.65661 20.1775 4.43612 20.5328 5.29402C20.8882 6.15192 21.071 7.07134 21.071 7.99993C21.071 8.92851 20.8881 9.84808 20.5327 10.706C20.1774 11.5639 19.6566 12.3435 19 13.0001M9 12C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8C13 10.2091 11.2091 12 9 12Z"
      stroke="#0B0B0B"
      stroke-width="0.7"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 6L12.2286 12L19.9999 6M21 8.19995V15.8C21 16.9201 21.0002 17.4802 20.7822 17.908C20.5905 18.2844 20.2841 18.5902 19.9078 18.782C19.48 19 18.9203 19 17.8002 19H6.2002C5.08009 19 4.51962 19 4.0918 18.782C3.71547 18.5902 3.40973 18.2844 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.19995C3 7.07985 3 6.51986 3.21799 6.09204C3.40973 5.71572 3.71547 5.40973 4.0918 5.21799C4.51962 5 5.08009 5 6.2002 5H17.8002C18.9203 5 19.48 5 19.9078 5.21799C20.2841 5.40973 20.5905 5.71572 20.7822 6.09204C21.0002 6.51986 21 7.07985 21 8.19995Z"
      stroke="#0B0B0B"
      stroke-width="0.7"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>,
];

export default function Home() {
  const selectOptions = [
    { value: "applied", label: "Applied" },
    { value: "shortlisted", label: "Shortlisted" },
    { value: "technicalInterview", label: "Technical Interview" },
    { value: "opportunityBrowsing", label: "Opportunity Browsing" },
    { value: "videoInterview1", label: "Video Interview I" },
    { value: "videoInterview2", label: "Video Interview II" },
    { value: "videoInterview3", label: "Video Interview III" },
    { value: "offer", label: "Offer" },
    { value: "withdrawn", label: "Withdrawn" },
  ];
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [displayedUsers, setDisplayedUsers] = useState(users);

  const handleSearch = (query: string) => {
    const filteredData = users.filter((item) =>
      item.Name.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedUsers(filteredData);
  };

  function handleChange(value: string) {
    console.log(value);
  }

  function onCheckAllChange(e: CheckboxChangeEvent) {
    setIsCheckedAll(e.target.value);
  }

  return (
    <section id="home" className="w-full h-full px-10 pt-10">
      <div className="flex flex-col justify-between h-14">
        <h3 className="text-custom_blue text-xl font-semibold">
          London Internship Program
        </h3>
        <span className="text-sm">London</span>
      </div>
      <div className="flex align-top justify-between h-14">
        <div>
          <Select
            className="w-72 h-12"
            defaultValue={selectOptions[0].value}
            onChange={handleChange}
            options={selectOptions}
          />
        </div>
        <div className="flex gap-5">
          {icons.map((icon) => (
            <div
              style={{
                boxShadow: "0px 4px 25px 0px rgba(141, 141, 141, 0.05)",
              }}
              className="aspect-square h-12 cursor-pointer bg-white rounded-lg grid place-content-center"
            >
              {<span className="w-6 aspect-square">{icon}</span>}
            </div>
          ))}
          <div className="cursor-pointer px-4 text-white bg-custom_blue rounded-lg h-12 flex items-center">
            <span>Move To Video Interview I</span>
            <span
              style={{ width: "1px" }}
              className="h-full bg-white mx-4"
            ></span>
            <svg
              fill="white"
              className="w-4 aspect-square"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_2" data-name="Layer 2">
                <path d="m16 22a1 1 0 0 1 -.71-.29l-10-10a1 1 0 0 1 1.42-1.42l9.29 9.3 9.29-9.3a1 1 0 0 1 1.42 1.42l-10 10a1 1 0 0 1 -.71.29z" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <Search handleSearch={handleSearch} />
        <Filters />
      </div>
      <div className="rounded-lg h-full bg-white overflow-hidden">
        <div className="mx-5 flex items-center gap-8 py-6 border-b-gray-200 border-opacity-40 border-b-2">
          <Checkbox onChange={onCheckAllChange} />
          <span className="text-lg text-custom_blue font-medium">
            {displayedUsers.length} Candidates
          </span>
          <div className="flex items-center gap-5 ml-auto">
            <span className="text-lg text-custom_blue font-medium">
              Qualified
            </span>
            <span
              style={{ width: "2px", height: "15px" }}
              className="bg-slate-200 bg-opacity-60"
            ></span>
            <span className="text-lg font-medium flex items-center gap-3">
              Task
              <span className="text-xs font-extralight aspect-square p-1 rounded-full bg-slate-400 bg-opacity-5">
                25
              </span>
            </span>
            <span
              style={{ width: "2px", height: "15px" }}
              className="bg-slate-200 bg-opacity-60"
            ></span>
            <span className="text-lg font-medium flex items-center gap-3">
              Disqualified
              <span className="text-xs font-extralight aspect-square p-1 rounded-full bg-slate-400 bg-opacity-5">
                78
              </span>
            </span>
          </div>
        </div>
        <div className="h-full overflow-auto px-5">
          {displayedUsers.map((user) => (
            <>
              <div
                key={user.Name}
                className="flex items-center gap-8 py-6 border-b-gray-200 border-opacity-40 border-b-2"
              >
                <Checkbox />
                <div
                  className="grid place-content-center aspect-square w-20 rounded-full"
                  style={{ background: "#EDF4FF" }}
                >
                  <span className="text-3xl font-semibold text-light_custom_blue">
                    {user.Name.charAt(0) + user.Name.split(" ")[1]?.charAt(0) ||
                      ""}
                  </span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold mb-3">{user.Name}</h3>
                  <span className="text-sm font-medium mb-2">
                    {user.State}, {user.Country}
                  </span>
                  <span className="text-sm mb-2">
                    {user.Course} - {user.College} ({user["Course timeline"]})
                  </span>
                  <span className="mb-3 flex gap-3 text-xs text-custom_blue">
                    <span>#top_candidate</span>
                    <span>#top_candidate</span>
                  </span>
                  <span className="flex gap-3">
                    <span className="bg-slate-50 rounded-full px-3 py-1 font-medium text-xs text-slate-500">
                      New York
                    </span>
                    <span className="bg-slate-50 rounded-full px-3 py-1 font-medium text-xs text-slate-500">
                      Marketing
                    </span>
                    <span className="bg-slate-50 rounded-full px-3 py-1 font-medium text-xs text-slate-500">
                      London
                    </span>
                  </span>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
