import React, { Component } from "react";

export default function HoverableComponent(WrappedComponent, additionalData) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        debugText: "",
        isHovered: false
      };
    }

    onMouseover(e) {
      this.setState({ debugText: "hovered!", isHovered: true });
    }

    onMouseout(e) {
      this.setState({ debugText: "", isHovered: false });
    }

    render() {
      //const { onHoverData } = this.props;
      return (
        <div
          onMouseEnter={this.onMouseover.bind(this)}
          onMouseLeave={this.onMouseout.bind(this)}
        >
          <WrappedComponent isHovered={this.state.isHovered} {...this.props} />
        </div>
      );
    }
  };
}
