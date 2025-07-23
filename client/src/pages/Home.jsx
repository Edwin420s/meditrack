// client/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f9fbf8] overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#eaf3e8] px-10 py-3">
        <div className="flex items-center gap-4 text-[#111b0e]">
          <div className="size-4">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-[#111b0e] text-lg font-bold leading-tight tracking-[-0.015em]">
            MediTrack
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <Link
              to="/about"
              className="text-[#111b0e] text-sm font-medium leading-normal"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-[#111b0e] text-sm font-medium leading-normal"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-[#111b0e] text-sm font-medium leading-normal"
            >
              Contact
            </Link>
          </div>
          <div className="flex gap-2">
            <Link
              to="/login"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#4fdf1f] text-[#111b0e] text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Login</span>
            </Link>
            <Link
              to="/register"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#eaf3e8] text-[#111b0e] text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Register</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="@container">
            <div className="@[480px]:p-4">
              <div
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDfnuY5ZSvgP9VYMcstOnStWLcigbjvJ0b4Fr7tKdq-uLGh1AfLDC58uyja8uwdlkSTBa7brPyHXXYFaBcBi6mHD7AV0l8ux-LOnWqBKqSkNDLopNCwJHjyFU90u5LsKdsJ1LnUNW0ldbkOKnS030cGEJ0dzBXDvfcyp8kttO4OePv1dQz7DRB-hbVowRlMWgcnBj7cDx8nvWyRUWkZJZsfiTZ1Z_ceqgCwqHP8darjNIdynFwvksKN_1AUcSGkGwCxMguSCDMiRjnq")',
                }}
              >
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Smart Clinic Appointment Manager
                  </h1>
                  <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    MediTrack simplifies clinic visits for patients and doctors,
                    offering seamless appointment scheduling and visit logging.
                  </h2>
                </div>
                <div className="flex-wrap gap-3 flex justify-center">
                  <Link
                    to="/login"
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#4fdf1f] text-[#111b0e] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                  >
                    <span className="truncate">Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#eaf3e8] text-[#111b0e] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                  >
                    <span className="truncate">Register</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
