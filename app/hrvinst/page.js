import Image from 'next/image';

const HRVINST = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image src="/hrvimg.jpeg" alt="Your Image" width={500} height={500} />
    </div>
  );
};

export default HRVINST;