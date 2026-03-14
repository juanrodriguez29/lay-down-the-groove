import { artists } from "../data";
import ArtistsCard from "./ArtistsCard";

export function Artists() {
  return (
    <section className="py-16 px-6 bg-zinc-100">
      <h2 className="text-3xl font-bold uppercase tracking-widest text-center mb-12">Artists</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto ">
        {[...artists].sort((a, b) => a.name.localeCompare(b.name)).map((artist) => (
          <ArtistsCard key={artist.id} artist={artist} />
        ))}
      </div>
    </section>
)
}