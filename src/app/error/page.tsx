import Error from '../_components/Error';

const ErrorPage = () => {
  return (
    <div className="mx-auto mt-20 flex w-fit flex-col justify-center text-xl font-bold">
      <Error toHome={true} />
    </div>
  );
};

export default ErrorPage;
