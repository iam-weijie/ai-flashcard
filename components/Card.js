import { animated, to } from "@react-spring/web";

const Card = ({ i, x, y, rot, scale, trans, bind, data }) => {
  const { front, back } = data[i];
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    front
  )}`;

  return (
    <animated.div
      key={i}
      style={{
        transform: to([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`),
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: to([rot, scale], trans),
        }}
      >
        <div className="card">
          <h2> {front} </h2>
          <h2> {back} </h2>
          <img
            className="generated-image"
            src={imageUrl}
            alt="Swipe2Learn"
          ></img>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Card;
