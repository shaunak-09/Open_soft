// import ContinueToWatchMovieCard from '../HeorSectionComponents/ContinueToWatchMovieCard';

const ContinueToWatchMovieSkelton = () => {
  let loading = ["1", "2", "3", "4", "5", "6", "7"];
  return (
    <>
      <div className="flex w-full justify-between">
        {loading.map(() => {
          return (
            <div className="bg-zinc-300 w-[12rem] h-28 blinker rounded-lg"></div>
          );
        })}
      </div>
    </>
  );
};

export default ContinueToWatchMovieSkelton;
