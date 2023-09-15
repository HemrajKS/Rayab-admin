"use client";
import Image from "next/image";

const Login = () => {
  return (
    <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0">
      <div className="flex flex-col sm:rounded-[12px] p-[25px] sm:min-h-[250px] sm:min-w-[250px] sm:max-h-[520px] sm:max-w-[520px] h-full w-full items-center justify-center bg-white min-w-500 sm:rounded-2.5 shadow-md ">
        <Image
          src={require("/src/assets/Images/Rayab.png")}
          alt="Logo"
          loading="lazy"
          placeholder="blur"
          width={200}
          className="mb-[40px]"
        />
        <form className="min-w-[180px] max-w-[320px] w-full">
          <div>
            <label className="block">
              <span class="block text-sm font-medium text-slate-700">
                Username
              </span>

              <input
                type="text"
                class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      mb-[20px]
    "
              />
            </label>
          </div>
          <div>
            <label class="block">
              <span class="block text-sm font-medium text-slate-700">
                Password
              </span>
              <input
                type="password"
                class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-{#000}-500 focus:ring-1 focus:ring-{#000}-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      mb-[20px]
    "
              />
            </label>
          </div>
          <div>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[8px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
