"use client";

import * as React from "react";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CandidateRanking {
  candidateId: string;

  candidateName: string;

  candidateNumber: number;

  categoryId: string;

  categoryName: string;

  votes: number;

  imageUrl?: string | null;

  rank: number;
}
interface Props {

  rankings: CandidateRanking[];

  categories:any[];

  selectedCategory:string;

  setSelectedCategory:(value:string)=>void;

}

const PODIUM = {
  1: {
    height: "h-36",
    color: "#D4AF37",
    label: "Champion",
  },

  2: {
    height: "h-28",
    color: "#CBD5E1",
    label: "Second",
  },

  3: {
    height: "h-24",
    color: "#FDBA74",
    label: "Third",
  },
};

export function LeaderboardPodium({

 rankings,

 categories,

 selectedCategory,

 setSelectedCategory

}:Props){
  const top3 = rankings.sort((a, b) => a.rank - b.rank).slice(0, 3);

  if (top3.length === 0) {
    return (
      <div
        className="
text-center
py-12
text-slate-500
"
      >
        No votes yet
      </div>
    );
  }

  const order = [
    top3.find((x) => x.rank === 2),

    top3.find((x) => x.rank === 1),

    top3.find((x) => x.rank === 3),
  ].filter(Boolean) as CandidateRanking[];

  return (
    <div
      className="
flex
items-end
justify-center
gap-8
py-10
"
    >
      {order.map((candidate) => {
        const config = PODIUM[candidate.rank as 1 | 2 | 3];

        return (
          <div
            key={candidate.candidateId}
            className="
flex
flex-col
items-center
"
          >
            <div
              className="
relative
"
            >
              <img
                src={candidate.imageUrl ?? "/placeholder.png"}
                alt={candidate.candidateName}
                className="
h-24
w-24
rounded-full
object-cover
border-4
border-white
shadow-xl
"
              />

              <div
                className="
absolute
-bottom-1
-right-1
rounded-full
bg-white
p-1
shadow
"
              >
                <Crown
                  size={20}
                  style={{
                    color: config.color,
                  }}
                />
              </div>
            </div>

            <p
              className="
mt-3
font-bold
text-center
max-w-[150px]
truncate
text-[#0A2A1F]
"
            >
              #{candidate.candidateNumber} {candidate.candidateName}
            </p>

            <p
              className="
text-xs
text-slate-500
"
            >
              {candidate.categoryName}
            </p>

            <p
              className="
mt-1
font-bold
text-[#0A2A1F]
"
            >
              {candidate.votes.toLocaleString()}
              votes
            </p>

            <div
              className={cn(
                "mt-4 w-36 rounded-t-2xl flex items-center justify-center font-bold text-white",

                config.height,
              )}
              style={{
                backgroundColor: config.color,
              }}
            >
              #{candidate.rank}
            </div>
          </div>
        );
      })}
    </div>
  );
}
