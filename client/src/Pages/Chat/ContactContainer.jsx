import React from 'react';
import ProfileInfo from './ProfileInfo';
import NewDm from './Messages/NewDm';

const ContactContainer = () => {
  return (
    <div className="relative w-full md:w-[45vw] lg:w-[35vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] shadow-lg">
      <div className="pt-6">
        <Logo />
      </div>
      <div className="my-6">
        <div className="flex items-center justify-center pr-5 md:pr-10">
          <Title text="Contacts" />
          <NewDm />
        </div>
      </div>
      <div className="my-6">
        <div className="flex items-center justify-center pr-5 md:pr-10">
          <Title text="Channels" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactContainer;

const Logo = () => {
  return (
    <div className="flex p-4 md:p-6 justify-start items-center gap-3 transition-transform duration-300 hover:scale-105">
      <svg
        id="logo-38"
        width="64"
        height="28"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
          className="custom"
          fill="#8383ec"
        />
        <path
          d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
          className="ccompl11"
          fill="#975aed"
        />
        <path
          d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
          className="ccompl12"
          fill="#a16ee8"
        />
      </svg>
      <span className="text-2xl md:text-3xl font-semibold text-white drop-shadow-md transition-colors duration-300 hover:text-purple-500">
        Synchronous
      </span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-5 md:pl-10 font-light text-opacity-90 text-sm md:text-lg lg:text-xl transition-transform duration-300 hover:scale-105">
      {text}
    </h6>
  );
};
