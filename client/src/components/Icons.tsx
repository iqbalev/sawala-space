import { UserInitialIconProps } from "../types/index";

export const BurgerIcon = () => {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
};

export const ChevronDownIcon = () => {
  return (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <rect width="24" height="24" fill="none"></rect>
        <path
          d="M17 9.5L12 14.5L7 9.5"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export const ChevronUpIcon = () => {
  return (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <rect width="24" height="24" fill="none"></rect>
        <path
          d="M7 14.5L12 9.5L17 14.5"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export const UserInitialIcon = ({ userName, size }: UserInitialIconProps) => {
  let nameInitial: string;
  let dimensionsSize;
  let textSize;

  const userNameArray = userName.split(" ");
  if (userNameArray.length < 3) {
    nameInitial = userNameArray
      .map((initial: string) => initial.charAt(0))
      .join("")
      .toUpperCase();
  } else {
    nameInitial = userNameArray
      .slice(0, 2)
      .map((initial: string) => initial.charAt(0))
      .join("")
      .toUpperCase();
  }

  switch (size) {
    case "xs":
      textSize = "text-xs";
      dimensionsSize = "h-5 w-5";
      break;
    case "sm":
      textSize = "text-sm";
      dimensionsSize = "h-7 w-7";
      break;
    case "xl":
      textSize = "text-4xl";
      dimensionsSize = "h-20 w-20";
      break;
    default:
      textSize = "text-sm";
      dimensionsSize = "h-7 w-7";
  }

  return (
    <div
      className={`flex ${dimensionsSize} flex-col items-center justify-center rounded-full bg-gray-300`}
    >
      <div className={`${textSize} text-blue-400`}>{nameInitial}</div>
    </div>
  );
};
