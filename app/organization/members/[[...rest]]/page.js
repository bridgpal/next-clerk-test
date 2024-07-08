"use client";

import { useState, useEffect } from "react";
import { useOrganization } from "@clerk/nextjs";
import Link from "next/link";

export default function ViewMembersPage() {
  const { organization, isLoaded } = useOrganization();
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      if (isLoaded && organization) {
        try {
          const memberships = await organization.getMemberships();
          console.log("memberships", memberships.data);
          setMembers(
            Array.isArray(memberships) ? memberships : memberships.data || [],
          );
        } catch (error) {
          console.error("Error fetching members:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchMembers();
  }, [isLoaded, organization]);

  if (!isLoaded || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold text-gray-600">
          No organization selected
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold ">Team Members</h1>
        </div>
        <div className="p-6">
          <Link
            href="/organization"
            className="inline-block mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300"
          >
            ← Back to Organization
          </Link>
          {members.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No members found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Birthdate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      City
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {members.map((membership) => {
                    const userData = membership.publicUserData || {};
                    const unsafeMetadata = membership.unsafe_metadata || {};

                    return (
                      <tr key={membership.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={
                                  userData.profile_image_url ||
                                  "https://www.gravatar.com/avatar?d=mp"
                                }
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {userData.first_name ||
                                  userData.firstName ||
                                  ""}{" "}
                                {userData.last_name || userData.lastName || ""}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {userData.identifier || "No identifier"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {membership.role || "No role"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {unsafeMetadata["birthDate"] || "Not provided"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {unsafeMetadata.cityState
                            ? unsafeMetadata.cityState.split(",")[0].trim()
                            : "Not provided"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
