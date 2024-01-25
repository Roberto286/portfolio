const MobileMenuButton = () => (
  <div className="mobile-menu block md:hidden ml-auto">
    <button className="flex items-center px-3 py-2 border rounded border-[#02010a] text-[#02010a] hover:border-black hover:text-black dark:border-slate-200 dark:text-slate-200 dark:hover:text-white dark:hover:border-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
);

export default MobileMenuButton;
