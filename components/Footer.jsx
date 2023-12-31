import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Footer = ({ openModal }) => {
  // useRouter hook to detect an active link and add styling
  const router = useRouter();

  // set state for Confetti
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  // function to envoke confetti when "join now" button is clicked
  function handleClick() {
    setIsConfettiActive(true);
  }

  // if statement to apply classname to bottom CTA button based on the url

  let className = "";

  if (router.pathname === "/") {
    className = "ctaButton1";
  } else if (router.pathname === "/pix") {
    className = "ctaButton2";
  } else if (router.pathname === "/grupowhatsapp") {
    className = "ctaButton3";
  }

  // storing fetched data to state
  const [data, setData] = useState("");

  // useEffect hook is used to fetch the data from local api endpoint when the component mounts

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/footerInfo");
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="footerContainer">
      <div className="footerContent">
        <p>{data.par}</p>
        <button
          className={className}
          onClick={() => {
            handleClick();
            openModal();
          }}
        >
          {data.button}
        </button>
        <h2>{data.heading}</h2>
        <p>amilton.dev</p>
        {isConfettiActive && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
            gravity={0.5}
            onConfettiComplete={() => setIsConfettiActive(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Footer;
