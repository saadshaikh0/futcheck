import React from "react";

const ChallengeCard = () => {
  return (
    <div
      class="
        bg-dark-gray rounded grid grid-rows-[auto_1fr] items-center !grid-rows-[auto_1fr_40px]     "
    >
      <div class="bg-darker-gray rounded-t py-2 px-4 relative text-white grid grid-cols-[1fr_auto] gap-2">
        <h2 class="text-xl font-bold">89 Rated Squad</h2>
        <div class="self-end text-right flex gap-2">
          <div class="bg-gray rounded font-bold text-sm px-2 py-1 flex items-center">
            <span class="price-coin price-coin--size-xs mr-2"></span>
            111,250
          </div>
        </div>
      </div>
      <div class="grid grid-cols-[1fr_2fr] items-center p-2 gap-2">
        <div class="mx-auto w-full max-lg:max-w-[142px] max-w-[180px]">
          <a href="/24/squad-builder/5bedfe18-5eec-452f-a645-9d48b236fe1e/">
            {" "}
            <img
              src="https://game-assets.fut.gg/2024/sbcs/challenges/2101.png?quality=90&amp;width=400"
              alt="89 Rated Squad"
              loading="lazy"
            />
          </a>{" "}
        </div>
        <div>
          <p class="text-sm mb-3 font-medium">Exchange an 89 Rated Squad.</p>
          <div class="bg-darker-gray rounded px-2 py-1  ">
            <div class="flex justify-between items-center gap-2">
              <div class="grid grid-cols-[17px_1fr] gap-2 items-center">
                <div class="w-[15px]">
                  <img
                    src="https://assets.fut.gg/files/site/pack.19b841469cbf42050e7d.webp"
                    class="w-full h-full object-contain"
                    alt="Pack"
                    width="20"
                  />
                </div>
                <p class="text-xs text-white"> 1x Premium Gold Players Pack</p>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <p class="text-sm">Min. Team Rating: 89</p>
          </div>
        </div>
      </div>
      <a
        href="/24/squad-builder/5bedfe18-5eec-452f-a645-9d48b236fe1e/"
        class="uppercase bg-darker-gray rounded font-bold text-white py-2 text-center block hover:bg-orange hover:text-white text-sm h-[40px]"
      >
        View Solution
      </a>
    </div>
  );
};

export default ChallengeCard;
