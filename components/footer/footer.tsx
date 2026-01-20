import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-gray-600 flex items-center justify-between py-[60px] px-[200px] border-t border-gray-200 font-medium text-[13px] tracking-[-0.025em]">
      <div>
        <span>©codeit - 2026</span>
      </div>
      <div className="flex space-x-4">
        <Link href="/">
          <span>Privacy Policy</span>
        </Link>
        <Link href="/">
          <span>FAQ</span>
        </Link>
      </div>
      <div className="flex space-x-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/icon_facebook.svg"
            alt="Facebook"
            width={24}
            height={24}
          />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/icon_instagram.svg"
            alt="Instagram"
            width={24}
            height={24}
          />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <Image src="/icon_youtube.svg" alt="YouTube" width={24} height={24} />
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <Image src="/icon_X.svg" alt="X" width={24} height={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
