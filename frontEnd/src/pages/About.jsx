import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="AboutUs"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p></p>
          <p></p>
          <b className="text-gray-800"></b>
          <p></p>
        </div>
      </div>
      <div>
        <Title text1={"Why"} text2={"Choose Us"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>mnnvx</b>
          <p className="text-gray-600">fdjkfjifeyuweiwuewec</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>mnnvx</b>
          <p className="text-gray-600">fdjkfjifeyuweiwuewec</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>mnnvx</b>
          <p className="text-gray-600">fdjkfjifeyuweiwuewec</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
