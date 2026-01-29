import React, { useEffect, useState } from "react";
import { getJobs } from "../services/job.service";
import { Card, CardContent } from "./Card";

export default function JobPostsCard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const data = await getJobs();
      setJobs(data);
    }
    fetchJobs();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
      {jobs.length === 0 && <p>No jobs found</p>}
      {jobs.map((job) => (
        <CardContent key={job.id} className="border-b py-2 px-4 hover:bg-gray-100 rounded">
          <p className="font-semibold text-gray-800">{job.company_name}</p>
          <p className="text-gray-500 text-sm">{job.industry}</p>
          <p className="text-gray-500 text-sm">{job.city}, {job.country}</p>
        </CardContent>
      ))}
    </div>
  );
}
