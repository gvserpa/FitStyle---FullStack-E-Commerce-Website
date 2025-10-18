"use client";

import { memo, useEffect, useState } from "react";
import { getCurrentUserProfile } from "../../lib/actions/profile";
import Image from "next/image";
import defaultAvatar from "../../../public/default-avatar.jpg"

export interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  email: string;
  gender: "male" | "female" | "other";
  birthdate: string;
  bio: string;
  avatar_url: string;
  preferences: UserPreferences;
  location_lat?: number;
  location_lng?: number;
  last_active: string;
  is_verified: boolean;
  is_online: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  age_range: {
    min: number;
    max: number;
  };
  distance: number;
  gender_preference: ("male" | "female" | "other")[];
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const profileData = await getCurrentUserProfile();
        console.log(profileData);
        if (profileData) {
          setProfile(profileData);
        } else {
          setError("Failed to load profile");
        }
      } catch (err) {
        console.error("Error loading profile: ", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    loadProfile()
  }, []);

    if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-200">
        <div className="text-center max-w-md mx-auto p-8 flex flex-col items-center justify-center h-screen">
          <div className="w-44 h-44 bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center rounded-full mb-10">
            <span className="text-6xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Profile not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || "Unable to load your profile. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-3xl cursor-pointer mb-50"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }



  return (
<div className="min-h-screen bg-gray-200">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your profile and preferences
          </p>
        </header>
        <div className="max-w-4xl mx-auto">
          {/* Avatar & Header Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-6">
              <div className="relative">
                <Image
                  src={profile.avatar_url || defaultAvatar}
                  alt={profile.full_name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-4 border-pink-500 shadow-lg"
                />
                {profile.is_verified && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">
                    ✓
                  </div>
                )}
                {profile.is_online && (
                  <div className="absolute top-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {profile.full_name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">@{profile.username}</p>
                {profile.bio && (
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{profile.bio}</p>
                )}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 px-3 py-1 rounded-full text-sm font-medium">
                    {profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)}
                  </span>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    Member since {new Date(profile.created_at).getFullYear()}
                  </span>
                </div>
              </div>
              <button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-md">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">📧</span> Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Email</p>
                  <p className="text-gray-900 dark:text-white font-semibold break-all">{profile.email}</p>
                </div>
                {profile.location_lat && profile.location_lng && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Location</p>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {profile.location_lat.toFixed(4)}, {profile.location_lng.toFixed(4)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">👤</span> Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Birth Date</p>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {new Date(profile.birthdate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-3 h-3 rounded-full ${profile.is_online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {profile.is_online ? 'Online' : `Last active ${new Date(profile.last_active).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-pink-500 text-pink-600 dark:text-pink-400 font-semibold py-3 px-6 rounded-lg transition duration-300">
              View Activity
            </button>
            <button className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-red-500 text-red-600 dark:text-red-400 font-semibold py-3 px-6 rounded-lg transition duration-300">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfilePage);
