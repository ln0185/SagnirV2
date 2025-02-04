import headerImg from "../../public/resources/Logo.svg";
import Image from "next/image";

export const StoriesHeader = () => {
  return (
    <header className="w-full p-5 bg-sagnir-100 sticky top-0 z-30">
      <div className="flex flex-col md:flex md:flex-row md:justify-center">
        <div className="w-auto h-12 mb-7">
          <Image
            src={headerImg}
            layout="intrinsic"
            width={42}
            height={42}
            quality={100}
            alt="Logo"
            className="w-full h-auto max-w-xs mx-auto object-contain"
          />
        </div>
      </div>

      <h1 className="font-glare text-4xl text-sagnir-200 mb-5 md:text-5xl md:text-center">
        SÖGUR
      </h1>
      <p className="font-glare text-sagnir-200 text-md md:text-2xl md:text-center">
        Sökkvum okkur ofan í íslenskar þjóðsögur
      </p>
    </header>
  );
};
