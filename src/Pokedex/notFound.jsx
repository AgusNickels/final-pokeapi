// notFound.jsx
const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Error 404</h2>
      <img src="/Error404.gif" alt="GIF de Error 404" />
      <Link className="button-center primary" to="/">Volver al Inicio</Link>
    </div>
  );
};

export default NotFound;
