import React from 'react';

import { FiArrowUpCircle } from "react-icons/fi";
import './ButtonTop.css';

class ButtonTop extends React.Component {
    state = {
        is_visible: false
    };

    componentDidMount (e) {
        var scrollComponent = this;
        document.addEventListener("scroll", function(e) {
            scrollComponent.toggleVisibility();})
    };

    toggleVisibility = () => {
        if (window.pageYOffset > 200) {
          this.setState({
            is_visible: true
          });
        } else {
          this.setState({
            is_visible: false
          });
        }
      }

    scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    }
    
    render () {
        const { is_visible } = this.state;
        return (
            <>
                {is_visible && (
                    <div className="ButtonTop" onClick={this.scrollToTop}>
                        <FiArrowUpCircle className="Up" />
                    </div>
                )}
            </>
        );
    }  
}

export default ButtonTop;