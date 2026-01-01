import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="text-black flex items-center justify-between py-[10px] px-[200px]">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image src="/Logo.jpg" alt="GlobalNomad Logo" width={134} height={16} />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/login">
          <span className="text-black font-medium text-[14px] tracking-[-0.025em]">
            로그인
          </span>
        </Link>
        <Link href="/signup">
          <span className="text-black font-medium text-[14px] tracking-[-0.025em]">
            회원가입
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
