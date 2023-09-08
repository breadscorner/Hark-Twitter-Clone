export default function Post({ params }: {params: {id: string}}) {
  const someJSX = [1, 2, 3, 4, 5].map(value => <div>some JSX {value}</div>);
  
  return (
    <div className="text-center">
      <h1 className="text-lg">Post</h1>
      <p className="text-xs">{params.id}</p>
      <div className="grid grid-cols-3 gap-4 p-4 sm:grid-cols-1"></div>
    </div>
  );
}