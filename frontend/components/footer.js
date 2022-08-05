
import React from "react";

const Footer = () => {
    return (
        <footer className="border-t mt-10 pt-12 pb-32 px-4 lg:px-0">
            <div className="px-4 pt-3 pb-4 border-b -mx-4 border-gray-100">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-xl text-left inline-block font-semibold text-gray-800">Subscribe to Our Newsletter</h2>
                    <div className="text-gray-700 text-xs pl-px">
                        Latest news, articles and monthly updates delivered to your inbox.
                    </div>
                    <form action="#" className="mt-2">
                        <div className="flex justify-between">
                            <input type="email" className="w-full py-4 mr-2  bg-gray-100 shadow-inner rounded-md border border-gray-400 focus:outline-none" required />
                            <button className="self-center bg-blue-600 text-gray-200 text-md font-bold py-2 px-4 rounded">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;