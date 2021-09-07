function Card(props: any) {
  return (
    <main
      className={
        "card flex flex-col justify-center min-w-5 items-center bg-white border-2 rounded-lg shadow-lg pt-10 pb-10 "
      }
    >
      {props.children}
    </main>
  );
}

export default Card;
