"use client";

import React, { useState } from "react";
import Checkbox from "@/components/checkbox";
import User from "../svgs/User";
import Plus from "../svgs/Plus";
import Image from "next/image";
import Table from "../table";
import Briefcase from "../svgs/Briefcase";
import Chevron from "../svgs/Chevron";

interface Candidate {
  id: number;
  name: string;
  title: string;
  pfp: string;
  experience: string;
  skills: string[];
}

const candidates: Candidate[] = [
  {
    id: 1,
    title: "UX/UI Designer",
    skills: ["Figma", "Adobe XD", "Sketch", "InVision"],
    pfp: "/avatar.png",
    name: "Ahmad Abuyahya",
    experience: "1 - 2 years",
  },
  {
    id: 2,
    title: "Frontend Developer",
    skills: ["React", "Vue", "Angular", "Svelte"],
    pfp: "/avatar.png",
    name: "Ahmad Abuyahya",
    experience: "2 - 3 years",
  },
];

export default function TalentPool() {
  const [selectedCandidates, setSelectedCandidates] = useState(
    new Set<number>()
  );

  const handleSelectAll = (checked: boolean): void => {
    if (checked) {
      setSelectedCandidates(
        new Set(candidates.map((candidate) => candidate.id))
      );
    } else {
      setSelectedCandidates(new Set());
    }
  };

  const handleSelectCandidate = (
    candidateId: number,
    checked: boolean
  ): void => {
    const newSelectedCandidates = new Set(selectedCandidates);
    if (checked) {
      newSelectedCandidates.add(candidateId);
    } else {
      newSelectedCandidates.delete(candidateId);
    }
    setSelectedCandidates(newSelectedCandidates);
  };

  const columns = [
    {
      header: (
        <div>
          <Checkbox
            checked={selectedCandidates.size === candidates.length}
            onCheckedChange={handleSelectAll}
          />
          <span className="ml-2">Profile</span>
        </div>
      ),
      accessor: (candidate: Candidate) => (
        <div>
          <div className="flex items-center mb-1">
            <Checkbox
              checked={selectedCandidates.has(candidate.id)}
              onCheckedChange={(checked) =>
                handleSelectCandidate(candidate.id, checked)
              }
            />
            <Image
              src={candidate.pfp}
              width={40}
              height={40}
              className="rounded-full ml-2"
              alt={candidate.name}
            />
            <div className="ml-2">
              <span className="">{candidate.name}</span>
              <div className="flex gap-4 text-xs text-[#9a9cae] ">
                <span>{candidate.title}</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "experience",
      accessor: (candidate: Candidate) => (
        <div className="flex gap-1">
          <Briefcase />
          {candidate.experience}
        </div>
      ),
    },
    {
      header: "Skills",
      accessor: (candidate: Candidate) => (
        <ul className="flex flex-wrap gap-2">
          {candidate.skills.map((skill) => (
            <li
              key={skill}
              className="text-xs border border-[#42325d] p-2 rounded flex items-center gap-2"
            >
              {skill}
            </li>
          ))}
        </ul>
      ),
    },
    {
      header: "Options",
      accessor: (candidate: Candidate) => (
        <div className="flex gap-2">
          <button
            className="bg-[#212d4e] rounded p-2 px-4 flex items-center gap-1"
            onClick={() => alert("Edit Candidate")}
          >
            <span className="">View</span>


            <Chevron/>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#130035] mt-4 rounded-lg overflow-hidden">
      <div className="text-white flex gap-2 items-center border-b border-[#42325d] p-4">
        <div className="text-lg font-bold">Talent Pool</div>
        <div className="bg-[#393255] rounded p-2 min-w-6 h-6 flex justify-center items-center">
          {candidates.length}
        </div>
        <button
          className="bg-[#560df5] rounded p-2 px-4 flex items-center gap-1 ml-auto"
          onClick={() => alert("Add Candidate")}
        >
          <Plus />
          <span className="">Add Candidate</span>
        </button>
      </div>
      <Table columns={columns} data={candidates} />
    </div>
  );
}
