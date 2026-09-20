"use client";

import { useState, useCallback } from "react";

interface UserVote {
  voted: boolean;

  voteId?: string;

  candidateId?: string;
}

interface UserVotes {
  [categoryId: string]: UserVote;
}

export function useUserVotes(initialVotes: UserVotes = {}) {
  const [userVotes, setUserVotes] = useState<UserVotes>(initialVotes);

  const hasVoted = useCallback(
    (categoryId: string) => {
      return Boolean(userVotes[categoryId]?.voted);
    },
    [userVotes],
  );

  const addVote = useCallback((categoryId: string, candidateId: string) => {
    setUserVotes((prev) => ({
      ...prev,

      [categoryId]: {
        voted: true,

        candidateId,
      },
    }));
  }, []);

  return {
    userVotes,

    hasVoted,

    addVote,
  };
}
