import GalleryPage from '@/components/ui/Gallery'
// git add .; git commit -m '  '; git push origin 

const Explore: React.FC = (() => {
  return (
    <div>
      <main className="flex flex-col w-auto h-screen">
        {/* <section className="flex flex-col justify-center items-center w-svh w-full h-[30rem] py-10 text-center">
          <h1 className="font-bold text-[min(15vw,280px)] text-gradient leading-none">
            Free painting!
          </h1>
          <h2 className="font-medium lg:text-[min(5vw,55px)] text-gradient m-auto max-w-screen-xl">
            Print your favorite Paint and hang it on your wall!
          </h2>
        </section> */}

        <GalleryPage />
      </main>
    </div>
  );
})

export default Explore;