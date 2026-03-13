import { releases } from "../data";
import ReleaseCard from "./ReleaseCard";

export function Releases() {
  return (
    <section className="py-16 px-6 bg-gray-100">
      <h2 className="border-t-2 border-black pt-6 text-3xl font-bold uppercase tracking-widest text-center mb-12">Releases</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto ">
        {releases.map((release) => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </div>
    </section>
)
}