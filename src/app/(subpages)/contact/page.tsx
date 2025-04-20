import React from "react";
import ContactForm from "@/components/contact/ContactForm";
import { Phone, Mail } from "lucide-react";

const page = () => {
  return (
    <div className="">
      <div className="text">
        <span className="text-[#4D4D4D]">Home / </span>Contact
      </div>
      <div className="mt-10 flex lg:gap-5 flex-col-reverse gap-10 lg:flex-row">
        <div className="w-full lg:w-1/4 flex flex-col shadow-sm rounded">
          <div className="p-5 text-sm text-center lg:text-start">
            <div className="flex gap-4 items-center justify-center lg:justify-start">
              <span className="bg-[#D33333] p-2 rounded-full flex w-fit">
                <Phone strokeWidth={1.5} stroke="white" />
              </span>
              <span className="text-lg">Call Us</span>
            </div>
            <div className="space-y-4 mt-4">
              <div>We are Available 24/7,7 Days A Week</div>
              <div>Phone:0009998884</div>
            </div>
          </div>
          <hr className="border border-[#7F7F7F]" />
          <div className="p-5 text-sm text-center lg:text-start">
            <div className="flex gap-4 items-center justify-center lg:justify-start">
              <span className="bg-[#D33333] p-2 rounded-full flex w-fit">
                <Mail strokeWidth={1.5} stroke="white" />
              </span>
              <span className="text-lg">Write To Us</span>
            </div>
            <div className="space-y-4 mt-4">
              <div>
                Fill out our form and we will contact you within 24 hours.
              </div>
              <div>Email: customer@CyberCart.com</div>
              <div>Or support@CyberCart.com</div>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default page;
