'use client';

import React, { useState } from "react";
import Checkbox from "@/components/checkbox";
import User from "../svgs/User";
import Plus from "../svgs/Plus";
import Image from "next/image";
import Table from "../table";

interface Job {
  id: number;
  title: string;
  countries: {
    name: string;
    code: string;
  }[];
  candidates: number;
  hours: string;
  location: string;
  experience: string;
  active: boolean;
  posted: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "UX/UI Designer",
    countries: [
      {
        name: "Jordan",
        code: "JO",
      },
      {
        name: "Egypt",
        code: "EG",
      },
    ],
    candidates: 6,
    hours: "Full-time",
    location: "Remote",
    experience: "1 - 2 years",
    active: true,
    posted: "30 days ago",
  },
  {
    id: 2,
    title: "Frontend Developer",
    countries: [
      {
        name: "Saudi Arabia",
        code: "SA",
      },
    ],
    candidates: 8,
    hours: "Part-time",
    location: "Hybrid",
    experience: "2 - 3 years",
    active: true,
    posted: "15 days ago",
  },
  {
    id: 3,
    title: "Backend Engineer",
    countries: [
      {
        name: "Saudi Arabia",
        code: "SA",
      },
      {
        name: "Egypt",
        code: "EG",
      },
    ],
    candidates: 4,
    hours: "Full-time",
    location: "On-site",
    experience: "3 - 5 years",
    active: false,
    posted: "45 days ago",
  },
  {
    id: 4,
    title: "Product Manager",
    countries: [
      {
        name: "Jordan",
        code: "JO",
      },
    ],
    candidates: 3,
    hours: "Full-time",
    location: "Remote",
    experience: "5+ years",
    active: true,
    posted: "7 days ago",
  },
];

export default function JobsListing() {
  const [selectedJobs, setSelectedJobs] = useState(new Set<number>());

  const handleSelectAll = (checked: boolean): void => {
    if (checked) {
      setSelectedJobs(new Set(jobs.map((job) => job.id)));
    } else {
      setSelectedJobs(new Set());
    }
  };

  const handleSelectJob = (jobId: number, checked: boolean): void => {
    const newSelectedJobs = new Set(selectedJobs);
    if (checked) {
      newSelectedJobs.add(jobId);
    } else {
      newSelectedJobs.delete(jobId);
    }
    setSelectedJobs(newSelectedJobs);
  };

  const columns = [
    {
      header: (
        <div>
          <Checkbox
            checked={selectedJobs.size === jobs.length}
            onCheckedChange={handleSelectAll}
          />
          <span className="ml-2">Job</span>
        </div>
      ),
      accessor: (job: Job) => (
        <div>
          <div className="flex items-center mb-1">
            <Checkbox
              checked={selectedJobs.has(job.id)}
              onCheckedChange={(checked) => handleSelectJob(job.id, checked)}
            />
            <span className="ml-2">{job.title}</span>
          </div>
          <div className="flex gap-4 text-xs text-[#9a9cae] ml-6">
            <span>{job.hours}</span>
            <span>{job.location}</span>
            <span>{job.experience}</span>
            <span>{job.posted}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Countries",
      accessor: (job: Job) => (
        <ul className="flex flex-wrap gap-2">
          {job.countries.map((country) => (
            <li
              key={country.code}
              className="text-xs border border-[#42325d] p-2 rounded flex items-center gap-2"
            >
              <div className="w-4 h-4 relative">
                <Image
                  src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                  alt={`${country.name} flag`}
                  className="rounded-full"
                  layout="fill"
                />
              </div>
              {country.name}
            </li>
          ))}
        </ul>
      ),
    },
    {
      header: "Candidates",
      accessor: (job: Job) => (
        <div className="flex gap-1">
          <User />
          {job.candidates}
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (job: Job) => (
        <span
          className={`text-xs p-2 rounded ${
            job.active
              ? "text-[#0fea9a] bg-[#50CD8920]"
              : "text-red-400 bg-[#FF5B5B20]"
          }`}
        >
          {job.active ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-[#130035] mt-4 rounded-lg overflow-hidden">
      <div className="text-white flex gap-2 items-center border-b border-[#42325d] p-4">
        <div className="text-lg font-bold">All Jobs</div>
        <div className="bg-[#393255] rounded p-2 min-w-6 h-6 flex justify-center items-center">
          {jobs.length}
        </div>
        <button
          className="bg-[#560df5] rounded p-2 px-4 flex items-center gap-1 ml-auto"
          onClick={() => alert("Add Job")}
        >
          <Plus />
          <span className="">Add Job</span>
        </button>
      </div>
      <Table columns={columns} data={jobs} />
    </div>
  );
}
