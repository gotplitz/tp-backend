import React, { useContext, useRef, useEffect } from "react";
import SliderContext from "../../context/slider/sliderContext";

const SliderFilter = () => {
  const sliderContext = useContext(SliderContext);
  const { filterSliders, clearFilter, filtered } = sliderContext;
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterSliders(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <div className="row filter-on-top">
        <div className="col-md-12">
          <div className="intro-banner-search-form">
            <div className="intro-search-field with-label">
              <label
                htmlFor="intro-keywords"
                className="field-title ripple-effect"
              >
                Find Slider...
              </label>
              <input
                id="intro-keywords"
                ref={text}
                type="text"
                placeholder="Filter by title or location"
                onChange={onChange}
              />
            </div>

            <div className="intro-search-button">
              <button
                onClick={() => clearFilter()}
                className="button gray ripple-effect"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SliderFilter;
