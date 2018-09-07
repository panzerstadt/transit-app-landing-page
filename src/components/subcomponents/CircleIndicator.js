import React, { PureComponent } from "react";

const style = {
  circle: {
    width: 45,
    paddingRight: 20,
    text: {
      position: "absolute",
      margin: "0 auto",
      paddingTop: 12,
      paddingLeft: 18,
      color: "white",
      fontWeight: 400,
      fontFamily: "Roboto, sans-serif"
    }
  }
};

export default class CircleIndicator extends PureComponent {
  render() {
    const { text, color } = this.props;

    const CircleComponent = (text, clr, style) => {
      let circ = (
        <div style={style.circle}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.663 36">
            <ellipse
              id="Ellipse_3"
              data-name="Ellipse 3"
              fill={clr}
              cx="18.831"
              cy="18"
              rx="18.831"
              ry="18"
            />
          </svg>
        </div>
      );

      return (
        <div>
          <p style={style.circle.text}>{text}</p>
          {circ}
        </div>
      );
    };

    return CircleComponent(text, color, style);
  }
}
