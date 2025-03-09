"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDaysIcon,
  MapPinIcon,
  UserGroupIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { WhatsappIcon } from "@/components/SocialIcons";
import EventManagers from "@/components/EventManagers";
import { supabase } from "@/lib/supabase";
import ImageSlider from "@/components/ImageSlider";
import PromoBanner from "@/components/PromoBanner";

const managers = [
  {
    name: "Arafat Shahwar Raiyan",
    image: "/images/raiyan.png",
  },
  {
    name: "Kamrul Hasan",
    image: "/images/kallol.png",
  },
  {
    name: "Samiul Islam",
    image: "/images/shoaib.png",
  },
  {
    name: "Rakib Hasan",
    image: "/images/nayem.png",
  },
];

export default function Home() {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkRegistration();
  }, []);

  const checkRegistration = async () => {
    try {
      // Get stored phone number from localStorage
      const storedPhone = localStorage.getItem("registeredPhone");

      if (storedPhone) {
        const { data } = await supabase
          .from("registrations")
          .select("id")
          .eq("phone", storedPhone)
          .eq("status", "pending")
          .single();

        setHasRegistered(!!data);
      }
    } catch (error) {
      console.error("Error checking registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Main Content */}
      <main className="px-4 py-6">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Banner Image Card */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <ImageSlider />
          </div>

          {/* Event Card */}
          <div className="bg-gray-800 rounded-xl">
            {/* Status Badge */}
            <div className="relative px-4 pt-6">
              <div className="absolute -top-3 left-4">
                <span className="bg-white text-black text-sm font-bold px-3 py-1 rounded-full">
                  Upcoming Event
                </span>
              </div>
            </div>

            {/* Event Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                  <Image
                    src="/icons/sm.png"
                    alt="Organizer"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white text-lg mb-1">
                    🌙 Iftar & Nostalgia – Batch 2017 & 2019 Reunion 🕌
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Let's reunite, relive memories, and share a special Iftar
                    together! 🏫❤️ Join us for an evening of good food, great
                    company, and nostalgia.
                  </p>
                  <p className="text-blue-400 font-medium text-sm">
                    Meet old friends
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Button - Updated Color */}
            <div className="p-4 border-b border-gray-700">
              <Link
                href={hasRegistered ? "#" : "/register"}
                className={`group flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg text-center font-medium transition-all duration-200 ${
                  hasRegistered
                    ? "bg-gray-600 cursor-not-allowed opacity-50"
                    : "bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90"
                }`}
                onClick={(e) => hasRegistered && e.preventDefault()}
              >
                {hasRegistered ? "Already Registered" : "Accept Invite"}
                <ArrowRightIcon
                  className={`w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1 ${
                    hasRegistered ? "text-gray-400" : "text-white"
                  }`}
                />
              </Link>
            </div>

            {/* Event Managers with Dark Theme */}
            <div className="p-4 border-b border-gray-700 bg-gray-800/50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-300">
                  Who's Joining?
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {managers.map((manager, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 ring-2 ring-gray-800"
                    >
                      <Image
                        src={manager.image}
                        alt={manager.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-300 ml-2">
                  <span className="text-blue-400 font-bold text-md">12+</span>{" "}
                  Friends are joining
                </span>
              </div>

              {/* Organizer Info */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
                      <Image
                        src={managers[0].image}
                        alt={managers[0].name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-300">
                        {managers[0].name}
                      </span>
                      <span className="text-xs text-gray-400">
                        Event Organizer
                      </span>
                    </div>
                  </div>
                  <Link
                    href="https://wa.me/8801791934192"
                    target="_blank"
                    className="text-gray-400 hover:text-green-500 transition-colors"
                  >
                    <WhatsappIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-4 space-y-3 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <CalendarDaysIcon className="w-6 h-6 text-gray-400" />
                <span className="text-md font-medium text-gray-300">
                  March 28, 2025
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="w-6 h-6 text-gray-400" />
                <span className="text-md font-medium text-gray-300">
                  4:00 PM
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-6 h-6 text-gray-400" />
                <span className="text-md font-medium text-gray-300">
                  Shahid Smrity College field
                </span>
              </div>
              <div className="flex items-center gap-3">
                <UserGroupIcon className="w-6 h-6 text-gray-400" />
                <span className="text-md font-medium text-gray-300">
                  21 friends registered
                </span>
              </div>
            </div>
           
          </div>
           {/* Promo Banner */}
           <PromoBanner />
        </div>
      </main>
    </div>
  );
}
