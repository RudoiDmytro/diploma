import JobFilter from "@/components/job/JobFilterSidebar";
import JobListItem from "@/components/job/JobListItem";

export default async function Jobs() {
  const jobs = await fetch(`http://localhost:3000/api/job`, {
    method: "GET",
  }).then((response) => response.json());
  return (
    <main className="px-3  py-3 space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Jobs
        </h1>
        <p className="text-muted-foreground"> Find your dream job</p>
      </div>
      <section className="flex flex-col lg:flex-row gap-3">
        <JobFilter />
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} />
          ))}
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  );
}
