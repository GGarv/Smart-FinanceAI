import React, { useContext } from "react";

import { authContext } from "@/lib/store/auth-context";

import { FcGoogle } from "react-icons/fc";

function SignIn() {
  const { googleLoginHandler } = useContext(authContext);

  return (
    <main className="container max-w-2xl px-6 mx-auto">
        <h1 className='head_text mb-3 text-center'>
          Your Personal Finance Manager
        <br className='max-md:hidden' />
        <span className='orange_gradient text-7xl text-center'> Smart FinanceAI</span>
        </h1>
      <div className="flex flex-col mt-5 overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-2xl"> 
      
        <div className="h-52">
          <img
            className="object-cover w-full h-full"
            src="https://th.bing.com/th/id/OIP.kmF87XHsN9W1W0MmyhPFAwHaEK?w=560&h=315&rs=1&pid=ImgDetMain"
          />
        </div>

        <div className="px-4 py-4">
          <h3 className="text-2xl text-center">Please sign in to continue</h3>

          <button
            onClick={googleLoginHandler}
            className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg"
          >
            <FcGoogle className="text-2xl" /> Google
          </button>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
