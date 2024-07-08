"use client";

import { useState, useEffect } from "react";
import {
  useUser,
  useOrganization,
  useOrganizationList,
  OrganizationSwitcher,
  OrganizationProfile,
  CreateOrganization,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function OrganizationPage() {
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();
  const { organization, isLoaded: isOrgLoaded } = useOrganization();
  const { setActive, isLoaded: isOrgListLoaded } = useOrganizationList();
  const router = useRouter();

  const [showCreateOrg, setShowCreateOrg] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isUserLoaded && !isSignedIn) {
      router.push("/sign-up");
    }
  }, [isUserLoaded, isSignedIn, router]);

  if (!isUserLoaded || !isOrgLoaded || !isOrgListLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null; // We're redirecting in useEffect, so just render nothing here
  }

  return (
    <div className=" bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" p-10 mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Organization Management
        </h1>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Switch or Create Organization
          </h2>
          <OrganizationSwitcher
            afterCreateOrganizationUrl="/organization/:id"
            afterLeaveOrganizationUrl="/organization"
            afterSelectOrganizationUrl="/organization/:id"
            createOrganizationMode="modal"
            appearance={{
              elements: {
                rootBox: "w-full",
                organizationSwitcherTrigger:
                  "w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              },
            }}
          />{" "}
        </div>

        {organization ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Current Organization: {organization.name}
            </h2>

            <OrganizationProfile />
            <a
              href="/organization/members"
              className="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
            >
              View Members
            </a>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Create Your First Organization
            </h2>
            <button
              onClick={() => setShowCreateOrg(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Organization
            </button>
            {showCreateOrg && (
              <CreateOrganization
                afterCreateOrganizationUrl="/organization/:id"
                onClose={() => setShowCreateOrg(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
