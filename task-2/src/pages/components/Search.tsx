import React from "react";

interface Props {
  handleSearch: (query: string) => void;
}

export default function Search({ handleSearch }: Props) {
  return (
    <div className="w-full flex items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3">
      <svg
        className="flex-shrink-0"
        width="12px"
        height="12px"
        fill="#B0BABF"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 612.01 612.01"
      >
        <g id="_x34__4_">
          <g>
            <path
              d="M606.209,578.714L448.198,423.228C489.576,378.272,515,318.817,515,253.393C514.98,113.439,399.704,0,257.493,0
				C115.282,0,0.006,113.439,0.006,253.393s115.276,253.393,257.487,253.393c61.445,0,117.801-21.253,162.068-56.586
				l158.624,156.099c7.729,7.614,20.277,7.614,28.006,0C613.938,598.686,613.938,586.328,606.209,578.714z M257.493,467.8
				c-120.326,0-217.869-95.993-217.869-214.407S137.167,38.986,257.493,38.986c120.327,0,217.869,95.993,217.869,214.407
				S377.82,467.8,257.493,467.8z"
            />
          </g>
        </g>
      </svg>

      <input
        className="flex-1 text-sm text-gray-400 placeholder:text-gray-400 outline-none"
        type="text"
        name="search"
        placeholder="Serach by name, edu, exp or #tag"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}
