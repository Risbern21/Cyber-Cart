import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-20 py-10">
      <div className="text">
        <span className="text-[#4D4D4D]">Home / </span>404 Error
      </div>
      <div className="flex items-center my-30 flex-col gap-5">
        <h1 className="text-7xl font-semibold">404 Not Found</h1>
        <h2 className="text-sm">
          Your requested page was not found.Go back to the home page
        </h2>
        <Link href={"/"}>
          <button className="bg-[#DB4444] pointer text-white px-4 py-2 rounded text-sm mt-5">
            Back To Home Page
          </button>
        </Link>
      </div>
    </div>
  );
}
