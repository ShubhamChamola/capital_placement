import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: Props) {
  return (
    <div className="rounded-xl shadow-md flex flex-col max-w-450">
      <div className="bg-custom_grey px-5 py-4 ">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <>{children}</>
    </div>
  );
}
