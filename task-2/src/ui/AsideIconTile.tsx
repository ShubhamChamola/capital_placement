interface Props {
  icon: React.ReactNode;
  iconClasses?: string;
}

export default function AsideIconTile({ icon, iconClasses }: Props) {
  return (
    <div
      className={`w-full aspect-square rounded-md hover:bg-light_pink cursor-pointer hover:fill-custom_blue transition-all ease-linear grid place-content-center ${iconClasses}`}
    >
      <div className="w-5 aspect-square">{icon}</div>
    </div>
  );
}
