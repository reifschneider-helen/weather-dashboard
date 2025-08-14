export default function Heading(props: { title: string }) {
  return (
    <h1 className="text-7xl text-center w-full max-xs:text-6xl">
      {props.title}
    </h1>
  );
}
