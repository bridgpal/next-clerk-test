"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AdditionalInfo() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [birthDate, setBirthDate] = useState("");
  const [cityState, setCityState] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-up");
    } else if (isLoaded && isSignedIn && user) {
      setBirthDate(user.unsafeMetadata.birthDate || "");
      setCityState(user.unsafeMetadata.cityState || "");
      setIsLoading(false);
    }
  }, [isLoaded, isSignedIn, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await user.update({
        unsafeMetadata: {
          birthDate,
          cityState,
        },
      });

      console.log("Metadata updated successfully");
      router.push("/organization");
    } catch (error) {
      console.error("Error updating user metadata:", error);
      setError(`Failed to update information: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-100 flex flex-col justify-center p-10 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Additional Information
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="birthDate"
                className="block text-sm font-medium text-gray-700"
              >
                Birth Date
              </label>
              <div className="mt-1">
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cityState"
                className="block text-sm font-medium text-gray-700"
              >
                City, State
              </label>
              <div className="mt-1">
                <input
                  id="cityState"
                  name="cityState"
                  type="text"
                  required
                  value={cityState}
                  onChange={(e) => setCityState(e.target.value)}
                  placeholder="e.g., New York, NY"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Updating..." : "Update Information"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
