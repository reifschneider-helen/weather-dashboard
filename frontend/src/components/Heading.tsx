export default function Heading({ title }: { title: string }) {
  return (
    <h1 className="text-7xl text-center w-full max-xs:text-6xl">{title}</h1>
  );
}
