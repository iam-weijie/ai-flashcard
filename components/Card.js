import { animated, to } from "@react-spring/web";

const Card = ({ i, x, y, rot, scale, trans, bind, data }) => {
  const { front, back } = data[i];

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
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Card;
