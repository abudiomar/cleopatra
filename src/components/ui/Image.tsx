import Image from "next/image";

export type LogoName = "cleobatra Logo1";

export function Logo({
  name,
  className = "h-12 w-auto",
}: {
  name: LogoName;
  className?: string;
}) {
  return (
    <Image
      src={`/image/${name}.png`}
      alt=""
      width={60}
      height={60}
      className={className}
      priority
    />
  );
}

