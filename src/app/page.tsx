import GalleryPage from '@/components/ui/Gallery'

const Explore: React.FC = (() => {
  return (
    <div>
      <main className="flex flex-col w-full h-auto">
        <section className="flex flex-col justify-center items-center w-svh w-full my-12 md:my-28 text-center">
          <h1 className="font-bold text-[min(15vw,280px)] text-gradient leading-none">
            Free for all!
          </h1>
          <h2 className="font-medium text-[min(5vw,55px)] text-gradient m-auto max-w-screen-xl">
            Download you favorite image with not Copyright.
          </h2>
        </section>
        <GalleryPage />
      </main>
    </div>
  );
})

export default Explore;