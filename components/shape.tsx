import Image from "next/image";

const crops = {
  sphere: { left: "-5.18%", top: "-5.77%" },
  pyramid: { left: "-103.02%", top: "-5.77%" },
  cube: { left: "-199.81%", top: "-5.56%" },
  cylinder: { left: "-4.63%", top: "-105.59%" },
  torus: { left: "-199.81%", top: "-105.52%" },
} as const;

type ShapeProps = {
  crop: keyof typeof crops;
  className?: string;
  priority?: boolean;
};

export function Shape({ crop, className = "", priority = false }: ShapeProps) {
  const position = crops[crop];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute overflow-hidden ${className}`}
    >
      <Image
        src="/images/shape.png"
        alt=""
        width={1536}
        height={1024}
        priority={priority}
        className="absolute max-w-none"
        style={{
          left: position.left,
          top: position.top,
          width: "305.98%",
          height: "211.13%",
        }}
      />
    </div>
  );
}
