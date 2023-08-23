import React from "react";
import "./Results.css";
import { useRecoilValue } from "recoil";
import { isCaptured } from "../../states/atoms";
import { mapExpressionToEmoji } from "../../utils/emojis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Results = ({ results, processing }) => {
  const Captured = useRecoilValue(isCaptured);

  if (processing && results) {
    return; //<Spinner />;
  }
  if (!processing && results && results.length > 0) {
    return (
      <div className="results">
        {results.length > 1 ? (
          <div>
            {results.map((result, i) => (
              <div className="results__wrapper" key={i}>
                <div style={{ width: "300px" }}>
                  <p>
                    One of you is looking{" "}
                    {result.expressions.asSortedArray()[0].expression}
                  </p>
                  <FontAwesomeIcon
                    icon={mapExpressionToEmoji(
                      result.expressions.asSortedArray()[0].expression
                    )}
                    size="4x"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="results__wrapper">
            <div>
              <p>
                I think You look{" "}
                {results[0].expressions.asSortedArray()[0].expression}
              </p>
              {Captured ? <p>Do you need Advice ?</p> : null}
            </div>
            <div className="results__emoji">
              <FontAwesomeIcon
                icon={mapExpressionToEmoji(
                  results[0].expressions.asSortedArray()[0].expression
                )}
                size="4x"
              />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <div className="results">{/*<Spinner />*/}</div>;
  }
};

export default Results;
