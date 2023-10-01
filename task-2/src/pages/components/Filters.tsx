const filterType = [
  "Personal Information",
  "Education",
  "Work Experience",
  "Activity Filter",
  "Advanced Filter",
];

export default function Filters() {
  return (
    <div className="flex flex-col rounded-md bg-white">
      <div className="p-5 flex justify-between border-b-gray-200 border-opacity-40 border-b-2">
        <span className="font-medium text-lg">Filters</span>
        <span>0 Selected</span>
      </div>
      {filterType.map((filter, index) => (
        <>
          <div
            className={`p-5 flex justify-between cursor-pointer ${
              index !== 4 && "border-b-gray-200 border-opacity-40 border-b-2"
            } `}
          >
            <span className="flex gap-3 items-center">
              <svg
                className="w-4 aspect-square"
                id="Capa_1"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="m446.605 124.392-119.997-119.997c-2.801-2.802-6.624-4.395-10.608-4.395h-210c-24.813 0-45 20.187-45 45v422c0 24.813 20.187 45 45 45h300c24.813 0 45-20.187 45-45v-332c0-4.09-1.717-7.931-4.395-10.608zm-115.605-73.179 68.787 68.787h-53.787c-8.271 0-15-6.729-15-15zm75 430.787h-300c-8.271 0-15-6.729-15-15v-422c0-8.271 6.729-15 15-15h195v75c0 24.813 20.187 45 45 45h75v317c0 8.271-6.729 15-15 15z" />
                  <path d="m346 212h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
                  <path d="m346 272h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
                  <path d="m346 332h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
                  <path d="m286 392h-120c-8.284 0-15 6.716-15 15s6.716 15 15 15h120c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
                </g>
              </svg>
              {filter}
            </span>
            {index !== 4 && (
              <svg
                className="w-4 aspect-square"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <path d="m16 22a1 1 0 0 1 -.71-.29l-10-10a1 1 0 0 1 1.42-1.42l9.29 9.3 9.29-9.3a1 1 0 0 1 1.42 1.42l-10 10a1 1 0 0 1 -.71.29z" />
                </g>
              </svg>
            )}
          </div>
        </>
      ))}
    </div>
  );
}
