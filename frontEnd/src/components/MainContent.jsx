import { assets } from "../assets/assets"

const MainContent = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
        {/* mainContent left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
            <div className="flex items-center gap-2">
                <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                <p className="font-medium text-sm md:text-base">BestSellers</p>
            </div>
            <h2 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">Latest Goods</h2>
            <div className="flex items-center gap-2">
                <p className="font-semibold text-sm md:text-base">Shop Now</p>
                <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
            </div>
        </div>
      </div>
      {/* Right side */}
      <img src={assets.hero_img} className="w-full sm:w-1/2" alt="mainContent-img"/>
    </div>
  )
}

export default MainContent
