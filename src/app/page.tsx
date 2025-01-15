import GalleryPage from '@/components/ui/Gallery'

const Explore: React.FC = (() => {
  return (
    <div>
      <main className="flex flex-col w-full h-auto">
        <section className="flex flex-col justify-center items-center w-svh w-full h-[30rem] text-center">
          <h1 className="font-bold text-9xl text-gradient leading-none">
            Print your Favorite!
          </h1>
        </section>

        <GalleryPage />
      </main>
    </div>
  );
})

export default Explore;