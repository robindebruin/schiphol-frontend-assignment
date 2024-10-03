import "./Header.css";

export const Header = () => {
  return (
    <>
      <div className="flex p-2 bg-[--grey-scattered]">
        <div className="text-lg font-bold text-[color:--schiphol-blue]">
          Schiphol
        </div>
      </div>
      <section className="h-40  bg-slate-50 pt-6 flex items-center justify-center">
        <h1 className="text-6xl font-bold title pb-4">Find arriving flights</h1>
      </section>
    </>
  );
};
