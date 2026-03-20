import Button from "@/components/shared/Button";

/* ---------------- TYPES ---------------- */

interface MenuItem {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  category: { name: string };
  size: { name: string }[];
}

/* ---------------- COMPONENT ---------------- */

export default async function Menu() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/menu`, {
    next: { revalidate: 60 }, // Optional: cache for 60 seconds
  });
  const json = await response.json();
  const data: MenuItem[] = json?.data?.menus || [];
  console.log(data);

  return (
    <div className="space-y-12 bg-background text-foreground min-h-screen">
      {/* HEADER */}
      <div className="text-center md:text-left">
        <h1 className="text-5xl font-black uppercase tracking-tighter italic">
          The <span className="text-foreground/30">Menu</span>
        </h1>
        <p className="text-sm text-foreground/50 mt-2 font-medium">
          Fresh ingredients, bold flavors, served daily.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col bg-foreground/2 border border-foreground/5 rounded-lg overflow-hidden hover:border-foreground/20 transition-all duration-300"
          >
            {/* IMAGE CONTAINER */}
            <div className="relative aspect-square overflow-hidden bg-foreground/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${process.env.NEXT_PUBLIC_API}${item.images[0]}`}
                alt={item.name}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              {/* CATEGORY TAG */}
              <div className="absolute top-3 left-3">
                <span className="bg-background text-foreground text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow-sm">
                  {item.category?.name}
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-base font-black uppercase leading-tight max-w-[70%]">
                  {item.name}
                </h2>
                <span className="text-base font-black text-yellow-500">
                  ${item.price}
                </span>
              </div>

              {/* ACTION */}
              <Button className="w-full text-sm py-2">Add to Cart</Button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-foreground/10 rounded-3xl">
          <p className="text-foreground/40 font-bold uppercase tracking-widest">
            No menu items available
          </p>
        </div>
      )}
    </div>
  );
}
