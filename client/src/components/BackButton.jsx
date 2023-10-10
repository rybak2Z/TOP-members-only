import { Link } from "react-router-dom";

function BackButton({ to }) {
  return (
    <Link to={to ?? "/"} class="back-button button-secondary">
      Back
    </Link>
  );
}

export default BackButton;
