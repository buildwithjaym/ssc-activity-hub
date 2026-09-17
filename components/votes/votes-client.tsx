"use client";

import { motion } from "framer-motion";

import { Vote, Users, Layers, Clock } from "lucide-react";

interface Props {
  dashboard: any;

  settings: any;

  results: any[];

  recentVotes: any[];
}

export default function VotesClient({
  dashboard,

  settings,

  results,

  recentVotes,
}: Props) {
  return (
    <div>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <p
          className="
text-xs
uppercase
tracking-[0.3em]
font-semibold
text-[#D4AF37]
"
        >
          Parageyan 2026
        </p>

        <h1
          className="
mt-3
text-3xl
font-bold
text-[#0A2A1F]
"
        >
          Voting Monitoring
        </h1>

        <p
          className="
mt-2
text-slate-600
"
        >
          Monitor People's Choice Award voting results and activity.
        </p>
      </motion.div>

      <div
        className="
mt-8
grid
gap-5
md:grid-cols-3
"
      >
        <Card title="Total Votes" value={dashboard.totalVotes} icon={Vote} />

        <Card title="Total Voters" value={dashboard.totalVoters} icon={Users} />

        <Card
          title="Categories"
          value={dashboard.totalCategories}
          icon={Layers}
        />
      </div>

      <div
        className="
mt-8
rounded-3xl
border
bg-white
p-6
"
      >
        <div
          className="
flex
justify-between
items-center
"
        >
          <div>
            <h2
              className="
text-xl
font-bold
text-[#0A2A1F]
"
            >
              Voting Status
            </h2>

            <p
              className="
text-sm
text-slate-500
"
            >
              Manage voting availability
            </p>
          </div>

          <span
            className={`
rounded-full
px-4
py-2
text-sm
font-semibold
${settings?.is_open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}

`}
          >
            {settings?.is_open ? "OPEN" : "CLOSED"}
          </span>
        </div>

        <div
          className="
mt-5
grid
md:grid-cols-2
gap-5
"
        >
          <div>
            <p className="text-sm text-slate-500">Start Time</p>

            <p className="font-semibold">
              {settings?.start_time
                ? new Date(settings.start_time).toLocaleString()
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">End Time</p>

            <p className="font-semibold">
              {settings?.end_time
                ? new Date(settings.end_time).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div
        className="
mt-8
rounded-3xl
border
bg-white
overflow-hidden
"
      >
        <div
          className="
px-6
py-5
border-b
"
        >
          <h2
            className="
text-xl
font-bold
text-[#0A2A1F]
"
          >
            Current Results
          </h2>
        </div>

        <table
          className="
w-full
"
        >
          <thead
            className="
bg-[#0A2A1F]
text-white
"
          >
            <tr>
              <th className="px-6 py-4 text-left">Candidate</th>

              <th className="px-6 py-4 text-left">Category</th>

              <th className="px-6 py-4 text-left">Votes</th>
            </tr>
          </thead>

          <tbody>
            {results.map((item, index) => (
              <tr
                key={item.candidate.id}
                className="
border-b
"
              >
                <td
                  className="
px-6
py-4
font-semibold
"
                >
                  #{item.candidate.candidate_number} {item.candidate.full_name}
                </td>

                <td className="px-6 py-4">{item.category.name}</td>

                <td className="px-6 py-4 font-bold">{item.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({
  title,

  value,

  icon: Icon,
}: any) {
  return (
    <div
      className="
rounded-3xl
border
bg-white
p-5
shadow-sm
"
    >
      <div
        className="
rounded-2xl
bg-[#0A2A1F]
w-fit
p-3
"
      >
        <Icon
          size={20}
          className="
text-[#D4AF37]
"
        />
      </div>

      <p
        className="
mt-4
text-sm
text-slate-500
"
      >
        {title}
      </p>

      <h2
        className="
text-3xl
font-bold
text-[#0A2A1F]
"
      >
        {value}
      </h2>
    </div>
  );
}
