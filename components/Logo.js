import { Link } from "@mui/material";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo.png"
        alt="gethugothemes admin"
        width="300"
        height="100"
        loading="eager"
        priority
      />
    </Link>
  );
};

export default Logo;
